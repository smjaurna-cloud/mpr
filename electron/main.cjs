// @ts-check
const { app, BrowserWindow, Tray, Menu, nativeImage, shell, dialog } = require("electron");
const path = require("path");
const http = require("http");
const { spawn } = require("child_process");
const net = require("net");

const isDev = process.env.NODE_ENV !== "production";
let mainWindow = null;
let tray = null;
let serverProcess = null;

let autoUpdater = null;
try {
  const updaterModule = require("electron-updater");
  autoUpdater = updaterModule.autoUpdater;
} catch (e) {
  console.warn("electron-updater not loaded:", e.message);
}

// Find an available TCP port starting from defaultPort
function getAvailablePort(defaultPort = 38501) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on("error", (err) => {
      if (/** @type {any} */ (err).code === "EADDRINUSE") {
        resolve(getAvailablePort(defaultPort + 1));
      } else {
        reject(err);
      }
    });
    server.listen(defaultPort, () => {
      const { port } = /** @type {net.AddressInfo} */ (server.address());
      server.close(() => {
        resolve(port);
      });
    });
  });
}

// Poll server until ready
function waitForServer(url, timeoutMs = 30000) {
  const startTime = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      http
        .get(url, (res) => {
          if (res.statusCode && res.statusCode < 500) {
            resolve(true);
          } else {
            retry();
          }
        })
        .on("error", () => {
          retry();
        });
    };

    const retry = () => {
      if (Date.now() - startTime > timeoutMs) {
        reject(new Error("Timeout waiting for local server to start"));
      } else {
        setTimeout(check, 600);
      }
    };

    check();
  });
}

// Start Next.js server if not already running on port
async function startServer(port) {
  // Check if port 3001 is already alive (e.g. during local dev)
  try {
    const isAlive = await new Promise((resolve) => {
      http
        .get("http://localhost:3001", (res) => resolve(res.statusCode === 200))
        .on("error", () => resolve(false));
    });
    if (isAlive) {
      console.log("Existing server detected on http://localhost:3001, reusing it.");
      return { port: 3001, url: "http://localhost:3001" };
    }
  } catch {
    // Ignore and proceed with spawning
  }

  const assignedPort = await getAvailablePort(port);
  const rootDir = path.resolve(__dirname, "..");
  const standaloneServer = path.join(rootDir, ".next", "standalone", "server.js");
  const defaultDbPath = path.join(rootDir, "prisma", "dev.db");

  const env = {
    ...process.env,
    PORT: String(assignedPort),
    HOSTNAME: "localhost",
    NODE_ENV: "production",
    DATABASE_URL: process.env.DATABASE_URL || `file:${defaultDbPath.replace(/\\/g, "/")}`,
  };

  if (require("fs").existsSync(standaloneServer)) {
    console.log(`Starting standalone server on port ${assignedPort}...`);
    serverProcess = spawn(process.execPath, [standaloneServer], {
      cwd: path.join(rootDir, ".next", "standalone"),
      env,
      stdio: "inherit",
    });
  } else {
    console.log(`Starting development next dev on port ${assignedPort}...`);
    const npxCmd = process.platform === "win32" ? "npx.cmd" : "npx";
    serverProcess = spawn(npxCmd, ["next", "start", "-p", String(assignedPort)], {
      cwd: rootDir,
      env,
      stdio: "inherit",
    });
  }

  const url = `http://localhost:${assignedPort}`;
  await waitForServer(url);
  return { port: assignedPort, url };
}

// Setup Auto Updater
function setupAutoUpdater() {
  if (!autoUpdater) return;

  autoUpdater.autoDownload = !isDev;

  autoUpdater.on("checking-for-update", () => {
    console.log("Checking for updates via GitHub Releases...");
  });

  autoUpdater.on("update-available", (info) => {
    console.log("Update available:", info.version);
    if (mainWindow) {
      dialog.showMessageBox(mainWindow, {
        type: "info",
        title: "พบการอัปเดตเวอร์ชันใหม่",
        message: `มีเวอร์ชันใหม่ (v${info.version}) สำหรับระบบ ERP วิทยาลัยสงฆ์`,
        detail: "ระบบกำลังดาวน์โหลดการอัปเดตในพื้นหลัง...",
        buttons: ["ตกลง"],
      });
    }
  });

  autoUpdater.on("update-not-available", () => {
    console.log("Current version is up to date.");
  });

  autoUpdater.on("error", (err) => {
    console.error("AutoUpdater error:", err ? err.message : err);
  });

  autoUpdater.on("update-downloaded", (info) => {
    dialog
      .showMessageBox(mainWindow || undefined, {
        type: "question",
        title: "พร้อมติดตั้งการอัปเดต",
        message: `ดาวน์โหลดเวอร์ชัน v${info.version} สำเร็จแล้ว`,
        detail: "ต้องการเริ่มการติดตั้งและรีสตาร์ทโปรแกรมทันทีหรือไม่?",
        buttons: ["ติดตั้งและรีสตาร์ททันที", "ไว้ภายหลัง"],
        defaultId: 0,
      })
      .then((result) => {
        if (result.response === 0) {
          autoUpdater.quitAndInstall();
        }
      });
  });

  // Check on startup if in production
  if (!isDev) {
    setTimeout(() => {
      autoUpdater.checkForUpdatesAndNotify().catch((err) => {
        console.warn("Initial update check failed:", err.message);
      });
    }, 5000);
  }
}

// Manual Check for Updates
function checkForUpdatesManual() {
  if (!autoUpdater) {
    dialog.showMessageBox(mainWindow || undefined, {
      type: "info",
      title: "ระบบอัปเดตอัตโนมัติ",
      message: `เวอร์ชันปัจจุบัน: v${app.getVersion()}`,
      detail: "กำลังทำงานในโหมดพัฒนา",
      buttons: ["ตกลง"],
    });
    return;
  }

  dialog.showMessageBox(mainWindow || undefined, {
    type: "info",
    title: "กำลังตรวจสอบเวอร์ชัน",
    message: `กำลังตรวจสอบอัปเดตจาก GitHub Releases... (เวอร์ชันปัจจุบัน: v${app.getVersion()})`,
    buttons: ["ตกลง"],
  });

  autoUpdater
    .checkForUpdates()
    .then((result) => {
      if (!result || !result.updateInfo || result.updateInfo.version === app.getVersion()) {
        dialog.showMessageBox(mainWindow || undefined, {
          type: "info",
          title: "ระบบเป็นเวอร์ชันล่าสุด",
          message: `วิทยาลัยสงฆ์บาลีเถรวาท ERP เป็นเวอร์ชันล่าสุดแล้ว (v${app.getVersion()})`,
          buttons: ["ตกลง"],
        });
      }
    })
    .catch((err) => {
      dialog.showMessageBox(mainWindow || undefined, {
        type: "warning",
        title: "การตรวจสอบเวอร์ชัน",
        message: `ไม่สามารถตรวจสอบการอัปเดตได้ในขณะนี้`,
        detail: err.message,
        buttons: ["ตกลง"],
      });
    });
}

// Create Main Application Window
function createMainWindow(targetUrl) {
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 860,
    minWidth: 1024,
    minHeight: 700,
    title: "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร) - ระบบ ERP วิทยาลัยสงฆ์",
    backgroundColor: "#fffbeb",
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  });

  // Load URL
  mainWindow.loadURL(targetUrl);

  mainWindow.once("ready-to-show", () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  // Open external links in default OS browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("http:") || url.startsWith("https:")) {
      shell.openExternal(url);
      return { action: "deny" };
    }
    return { action: "allow" };
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// Setup System Tray
function setupTray(targetUrl) {
  try {
    const icon = nativeImage.createFromPath(path.join(__dirname, "..", "public", "favicon.ico"));
    tray = new Tray(icon.isEmpty() ? nativeImage.createEmpty() : icon);
    const contextMenu = Menu.buildFromTemplate([
      {
        label: "เปิดหน้าต่างระบบ (Open ERP)",
        click: () => {
          if (mainWindow) {
            mainWindow.show();
            mainWindow.focus();
          } else {
            createMainWindow(targetUrl);
          }
        },
      },
      {
        label: "เปิดบนเว็บเบราว์เซอร์ (Open in Browser)",
        click: () => shell.openExternal(targetUrl),
      },
      { type: "separator" },
      {
        label: `เวอร์ชันระบบ: v${app.getVersion()}`,
        enabled: false,
      },
      {
        label: "ตรวจสอบการอัปเดต (Check for Updates)",
        click: () => checkForUpdatesManual(),
      },
      { type: "separator" },
      {
        label: "ออกจากระบบ (Quit)",
        click: () => {
          app.quit();
        },
      },
    ]);

    tray.setToolTip("มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)");
    tray.setContextMenu(contextMenu);
    tray.on("double-click", () => {
      if (mainWindow) {
        mainWindow.show();
        mainWindow.focus();
      }
    });
  } catch (err) {
    console.warn("Tray setup error:", err);
  }
}

// Application Lifecycle
app.whenReady().then(async () => {
  try {
    const { url } = await startServer(38501);
    createMainWindow(url);
    setupTray(url);
    setupAutoUpdater();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow(url);
      }
    });
  } catch (err) {
    dialog.showErrorBox(
      "เกิดข้อผิดพลาดในการเริ่มระบบ",
      `ไม่สามารถเปิดระบบได้: ${err instanceof Error ? err.message : String(err)}`
    );
    app.quit();
  }
});

// Quit when all windows are closed, except on macOS
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Clean up server process on exit
app.on("before-quit", () => {
  if (serverProcess) {
    try {
      if (process.platform === "win32") {
        spawn("taskkill", ["/pid", String(serverProcess.pid), "/f", "/t"]);
      } else {
        serverProcess.kill("SIGTERM");
      }
    } catch {
      // Ignore
    }
  }
});
