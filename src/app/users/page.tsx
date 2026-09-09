"use client";

import React, { useState } from "react";
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  KeyRound, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Scroll, 
  Building2, 
  Phone, 
  Mail, 
  Smartphone,
  Edit,
  Trash2,
  Lock,
  UserCheck,
  UserX,
  UserMinus,
  ChevronLeft,
  ChevronRight,
  Download,
  AlertCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { mockSystemUsers, SystemUser, SystemRole, MonasticStatus } from "@/data/mockData";

export default function UserManagementPage() {
  const [users, setUsers] = useState<SystemUser[]>(mockSystemUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("ALL");
  const [selectedMonasticStatus, setSelectedMonasticStatus] = useState<string>("ALL");
  const [activeTab, setActiveTab] = useState<"directory" | "rbac-matrix" | "disrobe-log">("directory");

  // Pagination
  const [userPage, setUserPage] = useState(1);
  const userPageSize = 9;

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDisrobeModal, setShowDisrobeModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showConfirmToggleModal, setShowConfirmToggleModal] = useState(false);
  const [userToConfirmToggle, setUserToConfirmToggle] = useState<SystemUser | null>(null);
  const [selectedUserForAction, setSelectedUserForAction] = useState<SystemUser | null>(null);
  const [revealedPasswords, setRevealedPasswords] = useState<Record<string, boolean>>({});

  const togglePasswordVisibility = (userId: string) => {
    setRevealedPasswords((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };

  // New User Form State
  const [newFullName, setNewFullName] = useState("");
  const [newTitle, setNewTitle] = useState("พระมหา");
  const [newPaliName, setNewPaliName] = useState("");
  const [newSanghaRank, setNewSanghaRank] = useState("");
  const [newVassa, setNewVassa] = useState("");
  const [newTemple, setNewTemple] = useState("วัดสระเกศ ราชวรมหาวิหาร");
  const [newDept, setNewDept] = useState("สำนักวิชาการ");
  const [newRole, setNewRole] = useState<SystemRole>("PALI_TEACHER");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  // Disrobe Form State
  const [disrobeReason, setDisrobeReason] = useState("สำเร็จการศึกษาและมีความจำเป็นต้องประกอบสัมมาอาชีพทางโลก");
  const [disrobeNewTitle, setDisrobeNewTitle] = useState("นาย");

  const showNotification = (msg: string) => {
    setNoticeMessage(msg);
    setTimeout(() => setNoticeMessage(null), 5000);
  };

  // Add User Handler
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const isMonk = newTitle.includes("พระ");
    const isSamanera = newTitle.includes("สามเณร");
    const monasticStatus: MonasticStatus = isMonk ? "ACTIVE_MONK" : isSamanera ? "ACTIVE_SAMANERA" : "LAYPERSON";

    const newUser: SystemUser = {
      id: `usr-${Date.now()}`,
      username: newEmail.split("@")[0] || `user.${Date.now()}`,
      fullName: `${newTitle} ${newFullName}`,
      title: newTitle,
      paliName: newPaliName || undefined,
      sanghaRank: newSanghaRank || undefined,
      vassa: newVassa ? parseInt(newVassa) : undefined,
      originTemple: newTemple,
      department: newDept,
      role: newRole,
      monasticStatus,
      accountStatus: "ACTIVE",
      email: newEmail || "user@mvu.mcu.ac.th",
      phone: newPhone || "081-000-0000",
      lineConnected: false,
      lastLogin: "ยังไม่เคยเข้าสู่ระบบ",
      permissions: {
        monasticLife: newRole === "SUPER_ADMIN" || newRole === "DISCIPLINE_MONK" ? "FULL" : "READ",
        almsPatron: newRole === "SUPER_ADMIN" || newRole === "PATRON_USER" ? "FULL" : "READ",
        mukhopatha: newRole === "SUPER_ADMIN" || newRole === "PALI_TEACHER" ? "FULL" : "READ",
        eApproval: newRole === "SUPER_ADMIN" ? "FULL" : newRole === "PALI_TEACHER" ? "APPROVE" : "NONE",
        mcuBridge: newRole === "SUPER_ADMIN" || newRole === "REGISTRAR_STAFF" ? "FULL" : "READ",
        userManagement: newRole === "SUPER_ADMIN" ? "FULL" : "NONE",
      }
    };

    setUsers([newUser, ...users]);
    setShowAddModal(false);
    showNotification(`เพิ่มผู้ใช้งาน "${newUser.fullName}" เข้าสู่ระบบเรียบร้อยแล้ว`);
  };

  // Handle Disrobe (ลาสิกขา) Action
  const handleConfirmDisrobe = () => {
    if (!selectedUserForAction) return;

    setUsers(prev => prev.map(u => {
      if (u.id === selectedUserForAction.id) {
        // Strip monastic title, change to layman title
        const cleanName = u.fullName.replace(/พระมหา|พระครู|พระธรรมวชิราจารย์|พระอาจารย์|สามเณร|พระ/g, "").trim();
        return {
          ...u,
          title: disrobeNewTitle,
          fullName: `${disrobeNewTitle} ${cleanName}`,
          monasticStatus: "DISROBED",
          role: u.role === "SAMANERA" ? "PATRON_USER" : u.role,
          department: `${u.department} (บันทึกประวัติลาสิกขา)`,
          permissions: {
            ...u.permissions,
            eApproval: "NONE",
            userManagement: "NONE"
          }
        };
      }
      return u;
    }));

    showNotification(`บันทึกการลาสิกขาของ "${selectedUserForAction.fullName}" เรียบร้อย ปรับสถานะเป็นคฤหัสถ์แล้ว`);
    setShowDisrobeModal(false);
    setSelectedUserForAction(null);
  };

  // Request confirmation to toggle account status
  const requestToggleAccountStatus = (user: SystemUser) => {
    setUserToConfirmToggle(user);
    setShowConfirmToggleModal(true);
  };

  const confirmToggleAccountStatus = () => {
    if (!userToConfirmToggle) return;
    const target = userToConfirmToggle;
    setUsers(prev => prev.map(u => {
      if (u.id === target.id) {
        const nextStatus = u.accountStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
        return { ...u, accountStatus: nextStatus };
      }
      return u;
    }));
    showNotification(`ปรับปรุงสถานะบัญชี "${target.fullName}" เป็น ${target.accountStatus === "ACTIVE" ? "ระงับการใช้งาน" : "เปิดใช้งานปกติ"} เรียบร้อยแล้ว`);
    setShowConfirmToggleModal(false);
    setUserToConfirmToggle(null);
  };

  // Export Users CSV
  const handleExportUsersCsv = () => {
    const headers = "รหัส,ชื่อ-นามสกุล,บทบาท,สถานภาพสงฆ์,สถานะบัญชี,สังกัด,อีเมล,เบอร์โทรศัพท์\n";
    const rows = users.map(u => 
      `"${u.id}","${u.fullName}","${u.role}","${u.monasticStatus}","${u.accountStatus}","${u.department}","${u.email}","${u.phone || '-'}"`
    ).join("\n");
    const blob = new Blob(["\uFEFF" + headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `รายชื่อผู้ใช้งานระบบ_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Filtered Users
  const filteredUsers = users.filter(u => {
    const matchQuery = u.fullName.includes(searchQuery) ||
                       (u.paliName && u.paliName.includes(searchQuery)) ||
                       u.email.includes(searchQuery) ||
                       u.originTemple?.includes(searchQuery) ||
                       u.department.includes(searchQuery);

    const matchRole = selectedRole === "ALL" || u.role === selectedRole;
    const matchMonastic = selectedMonasticStatus === "ALL" || u.monasticStatus === selectedMonasticStatus;

    return matchQuery && matchRole && matchMonastic;
  });

  const totalUserPages = Math.max(1, Math.ceil(filteredUsers.length / userPageSize));
  const validUserPage = Math.min(userPage, totalUserPages);
  const paginatedUsers = filteredUsers.slice((validUserPage - 1) * userPageSize, validUserPage * userPageSize);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-amber-200/90 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full w-fit">
            <Users className="w-4 h-4 text-amber-600" />
            <span>MOD-06: ศูนย์บริหารจัดการผู้ใช้งาน & สิทธิ์ตามฐานานุรูป (RBAC)</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 mt-2">
            ระบบบริหารบัญชีผู้ใช้งาน & สถานภาพสงฆ์
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            จัดการบัญชีผู้บริหาร พระคัมภีราจารย์ พระพี่เลี้ยง เจ้าหน้าที่ ศากยบุตรสามเณร และโยมอุปถัมภ์ พร้อมระบบจัดการการลาสิกขา
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleExportUsersCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-700 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            <span>ส่งออก CSV</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-700/20 transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>เพิ่มผู้ใช้งานใหม่</span>
          </button>
        </div>
      </div>

      {noticeMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{noticeMessage}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 font-medium">ผู้ใช้งานทั้งหมด</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">{users.length} บัญชี</p>
          <span className="text-[10px] text-emerald-600">● ใช้งานปกติ {users.filter(u => u.accountStatus === "ACTIVE").length}</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 font-medium">พระภิกษุ (อาจารย์/ผู้บริหาร)</span>
          <p className="text-2xl font-bold text-amber-800 mt-1">
            {users.filter(u => u.monasticStatus === "ACTIVE_MONK").length} รูป
          </p>
          <span className="text-[10px] text-amber-700">พระเถระ & คัมภีราจารย์</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 font-medium">ศากยบุตรสามเณร</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">
            {users.filter(u => u.monasticStatus === "ACTIVE_SAMANERA").length} รูป
          </p>
          <span className="text-[10px] text-slate-500">ผู้เรียนในโครงการ</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 font-medium">คฤหัสถ์ / โยมอุปถัมภ์</span>
          <p className="text-2xl font-bold text-slate-700 mt-1">
            {users.filter(u => u.monasticStatus === "LAYPERSON" || u.monasticStatus === "DISROBED").length} ท่าน
          </p>
          <span className="text-[10px] text-slate-400">เจ้าหน้าที่ & สาธุชน</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab("directory")}
          className={`pb-3 px-3 transition-all border-b-2 ${
            activeTab === "directory"
              ? "border-amber-600 text-amber-800 font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          ทำเนียบผู้ใช้งาน (User Directory)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("rbac-matrix")}
          className={`pb-3 px-3 transition-all border-b-2 ${
            activeTab === "rbac-matrix"
              ? "border-amber-600 text-amber-800 font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          ตารางกำหนดสิทธิ์รายโมดูล (RBAC Matrix)
        </button>
      </div>

      {/* TAB 1: User Directory */}
      {activeTab === "directory" && (
        <div className="space-y-4">
          {/* Search & Filter Toolbars */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="ค้นหาชื่อ, ฉายาบาลี, อีเมล, วัดสังกัด..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="p-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700"
              >
                <option value="ALL">ทุกลำดับสิทธิ์ (All Roles)</option>
                <option value="SUPER_ADMIN">ผู้อำนวยการราชวิทยาลัย (Super Admin)</option>
                <option value="PALI_TEACHER">พระคัมภีราจารย์ (Pali Teacher)</option>
                <option value="DISCIPLINE_MONK">พระพี่เลี้ยง/ฝ่ายปกครอง (Discipline)</option>
                <option value="REGISTRAR_STAFF">เจ้าหน้าที่/นายทะเบียน (Registrar)</option>
                <option value="SAMANERA">ศากยบุตรสามเณร (Samanera)</option>
                <option value="PATRON_USER">โยมอุปถัมภ์ (Patron)</option>
              </select>

              <select
                value={selectedMonasticStatus}
                onChange={(e) => setSelectedMonasticStatus(e.target.value)}
                className="p-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700"
              >
                <option value="ALL">ทุกสถานภาพสงฆ์</option>
                <option value="ACTIVE_MONK">พระภิกษุ</option>
                <option value="ACTIVE_SAMANERA">สามเณร</option>
                <option value="LAYPERSON">คฤหัสถ์/ฆราวาส</option>
                <option value="DISROBED">ลาสิกขาแล้ว</option>
              </select>
            </div>
          </div>

          {/* User Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedUsers.map((user) => (
              <div
                key={user.id}
                className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-amber-300 shadow-sm transition-all flex flex-col justify-between space-y-3 text-xs"
              >
                <div className="space-y-2">
                  {/* Top Role & Status Pills */}
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      user.role === "SUPER_ADMIN" ? "bg-purple-100 text-purple-900 border border-purple-200" :
                      user.role === "PALI_TEACHER" ? "bg-amber-100 text-amber-900 border border-amber-200" :
                      user.role === "DISCIPLINE_MONK" ? "bg-orange-100 text-orange-900 border border-orange-200" :
                      user.role === "SAMANERA" ? "bg-yellow-100 text-yellow-900 border border-yellow-200" :
                      "bg-slate-100 text-slate-800"
                    }`}>
                      {user.role}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {user.monasticStatus === "DISROBED" ? (
                        <span className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-md font-semibold">
                          ลาสิกขาแล้ว
                        </span>
                      ) : user.accountStatus === "ACTIVE" ? (
                        <span className="w-2 h-2 rounded-full bg-emerald-500" title="Active" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-300" title="Suspended" />
                      )}
                    </div>
                  </div>

                  {/* Name and Monastic Identity */}
                  <div>
                    <h2 className="font-bold text-slate-900 text-sm">{user.fullName}</h2>
                    {user.paliName && (
                      <p className="text-[11px] text-amber-800 font-serif font-semibold mt-0.5">
                        ฉายา "{user.paliName}" {user.vassa ? `(พรรษา ${user.vassa})` : ""}
                      </p>
                    )}
                    {user.sanghaRank && (
                      <p className="text-[10px] text-slate-500">สมณศักดิ์: {user.sanghaRank}</p>
                    )}
                  </div>

                  {/* Department and Temple */}
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-[11px] text-slate-600">
                    <p className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{user.department}</span>
                    </p>
                    {user.originTemple && (
                      <p className="flex items-center gap-1">
                        <Scroll className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="truncate">{user.originTemple}</span>
                      </p>
                    )}
                    <p className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{user.email}</span>
                    </p>
                  </div>

                  {user.password && (
                    <div className="flex items-center justify-between text-[11px] bg-slate-50 p-2 rounded-xl border border-slate-200">
                      <span className="text-slate-700 font-medium flex items-center gap-1.5">
                        <Lock className="w-3 h-3 text-slate-500" />
                        รหัสผ่านเริ่มต้น:
                      </span>
                      <div className="flex items-center gap-1.5">
                        <code className="font-mono text-xs font-semibold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-300">
                          {revealedPasswords[user.id] ? user.password : "••••••••"}
                        </code>
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility(user.id)}
                          className="p-1 rounded text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
                          aria-label={revealedPasswords[user.id] ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
                          title={revealedPasswords[user.id] ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
                        >
                          {revealedPasswords[user.id] ? (
                            <EyeOff className="w-3.5 h-3.5 text-slate-600" />
                          ) : (
                            <Eye className="w-3.5 h-3.5 text-slate-500" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <button
                    type="button"
                    onClick={() => requestToggleAccountStatus(user)}
                    className={`font-semibold ${
                      user.accountStatus === "ACTIVE" ? "text-slate-500 hover:text-rose-600" : "text-emerald-700 hover:text-emerald-900"
                    }`}
                  >
                    {user.accountStatus === "ACTIVE" ? "ระงับการใช้" : "เปิดใช้งาน"}
                  </button>

                  <div className="flex items-center gap-2">
                    {/* Disrobe button only for active monks/novices */}
                    {(user.monasticStatus === "ACTIVE_MONK" || user.monasticStatus === "ACTIVE_SAMANERA") && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedUserForAction(user);
                          setShowDisrobeModal(true);
                        }}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200"
                        title="บันทึกการลาสิกขา (ศึก)"
                      >
                        <UserMinus className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedUserForAction(user);
                        setShowPermissionModal(true);
                      }}
                      className="p-1.5 rounded-lg text-amber-700 hover:bg-amber-50 border border-amber-200"
                      title="ดูและแก้ไขสิทธิ์"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* User Pagination Bar */}
          {totalUserPages > 1 && (
            <div className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-500">
                แสดงบัญชีที่ {(validUserPage - 1) * userPageSize + 1} - {Math.min(validUserPage * userPageSize, filteredUsers.length)} จากทั้งหมด {filteredUsers.length} บัญชี
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={validUserPage === 1}
                  onClick={() => setUserPage(validUserPage - 1)}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalUserPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setUserPage(p)}
                    className={`w-8 h-8 rounded-lg font-semibold text-xs transition-all ${
                      validUserPage === p
                        ? "bg-amber-600 text-white shadow-xs"
                        : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={validUserPage === totalUserPages}
                  onClick={() => setUserPage(validUserPage + 1)}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: RBAC Matrix View */}
      {activeTab === "rbac-matrix" && (
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
          <div>
            <h2 className="font-bold text-slate-900 text-sm">ผังกำหนดสิทธิ์การเข้าถึงแยกตามบทบาท (RBAC Matrix)</h2>
            <p className="text-slate-500">
              ควบคุมการมองเห็นและการแก้ไขข้อมูลของแต่ละบทบาทในทั้ง 5 โมดูล เพื่อความปลอดภัยตามมาตรฐานสถาบันสงฆ์
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-y text-slate-600 font-bold">
                  <th className="py-3 px-4">บทบาท (Role)</th>
                  <th className="py-3 px-3 text-center">MOD-01: กิจวัตร</th>
                  <th className="py-3 px-3 text-center">MOD-02: ภัตตาหาร</th>
                  <th className="py-3 px-3 text-center">MOD-03: มุขปาฐะ</th>
                  <th className="py-3 px-3 text-center">MOD-04: สารบรรณ</th>
                  <th className="py-3 px-3 text-center">MOD-05: MCU REG</th>
                  <th className="py-3 px-3 text-center">MOD-06: จัดการ User</th>
                </tr>
              </thead>
              <tbody className="divide-y text-slate-700">
                <tr className="hover:bg-slate-50/60">
                  <td className="py-3 px-4 font-bold text-purple-900">ผู้อำนวยการ (Super Admin)</td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">FULL</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">FULL</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">FULL</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-purple-100 text-purple-900 rounded font-bold">APPROVE</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">FULL</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">FULL</span></td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="py-3 px-4 font-bold text-amber-900">พระคัมภีราจารย์ (Pali Teacher)</td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded">READ</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded">READ</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">FULL</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-semibold">SUBMIT</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-semibold">WRITE</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-slate-100 text-slate-400 rounded">NONE</span></td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="py-3 px-4 font-bold text-orange-900">พระพี่เลี้ยง / ฝ่ายปกครอง</td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">FULL</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-semibold">WRITE</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded">READ</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded">READ</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded">READ</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-slate-100 text-slate-400 rounded">NONE</span></td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="py-3 px-4 font-bold text-slate-800">เจ้าหน้าที่ / นายทะเบียน</td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded">READ</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded">READ</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded">READ</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-semibold">WRITE</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">FULL</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-semibold">WRITE</span></td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="py-3 px-4 font-bold text-yellow-900">ศากยบุตรสามเณร</td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded">READ (ตนเอง)</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-slate-100 text-slate-400 rounded">NONE</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded">READ (ตนเอง)</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-slate-100 text-slate-400 rounded">NONE</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded">READ (ตนเอง)</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-slate-100 text-slate-400 rounded">NONE</span></td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="py-3 px-4 font-bold text-teal-900">โยมอุปถัมภ์ / สาธุชน</td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-slate-100 text-slate-400 rounded">NONE</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">จองเพล</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded">สมุดพก (LINE)</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-slate-100 text-slate-400 rounded">NONE</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-slate-100 text-slate-400 rounded">NONE</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-slate-100 text-slate-400 rounded">NONE</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: Add New User */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="font-bold text-slate-900 text-base">เพิ่มผู้ใช้งานใหม่เข้าสู่ระบบ</h2>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">คำนำหน้า *</label>
                  <select
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  >
                    <option value="พระธรรมวชิราจารย์">พระธรรมวชิราจารย์</option>
                    <option value="พระมหา">พระมหา</option>
                    <option value="พระครู">พระครู</option>
                    <option value="พระ">พระ</option>
                    <option value="สามเณร">สามเณร</option>
                    <option value="นาย">นาย</option>
                    <option value="นาง">นาง</option>
                    <option value="นางสาว">นางสาว</option>
                    <option value="ดร.">ดร.</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">ชื่อ - นามสกุล *</label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น สุทัศน์ หรือ สมชาย ใจดี"
                    value={newFullName}
                    onChange={(e) => setNewFullName(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  >
                  </input>
                </div>
              </div>

              {/* Monastic Details (Only if monk/novice) */}
              {(newTitle.includes("พระ") || newTitle.includes("สามเณร")) && (
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-3">
                  <p className="font-bold text-amber-900 text-[11px]">ข้อมูลเอกลักษณ์สงฆ์ (Monastic Identity):</p>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="block font-semibold text-amber-900 mb-1">ฉายาบาลี</label>
                      <input
                        type="text"
                        placeholder="เช่น ปิยสีโล, สิริวฑฺฒโน"
                        value={newPaliName}
                        onChange={(e) => setNewPaliName(e.target.value)}
                        className="w-full p-2 border border-amber-200 bg-white rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-amber-900 mb-1">พรรษา (ถ้ามี)</label>
                      <input
                        type="number"
                        placeholder="เช่น ๑๕"
                        value={newVassa}
                        onChange={(e) => setNewVassa(e.target.value)}
                        className="w-full p-2 border border-amber-200 bg-white rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-amber-900 mb-1">วัดต้นสังกัด</label>
                    <input
                      type="text"
                      value={newTemple}
                      onChange={(e) => setNewTemple(e.target.value)}
                      className="w-full p-2 border border-amber-200 bg-white rounded-lg"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">บทบาทในระบบ (Role) *</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as SystemRole)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  >
                    <option value="SUPER_ADMIN">ผู้อำนวยการ (Super Admin)</option>
                    <option value="PALI_TEACHER">พระคัมภีราจารย์ (Pali Teacher)</option>
                    <option value="DISCIPLINE_MONK">พระพี่เลี้ยง / ฝ่ายปกครอง</option>
                    <option value="REGISTRAR_STAFF">เจ้าหน้าที่ / นายทะเบียน</option>
                    <option value="SAMANERA">ศากยบุตรสามเณร</option>
                    <option value="PATRON_USER">โยมอุปถัมภ์ / สาธุชน</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">หน่วยงานสังกัด *</label>
                  <input
                    type="text"
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">อีเมลติดต่อ</label>
                  <input
                    type="email"
                    placeholder="user@mvu.mcu.ac.th"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">เบอร์โทรศัพท์</label>
                  <input
                    type="tel"
                    placeholder="081-xxx-xxxx"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-xl hover:bg-slate-50 font-semibold"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow"
                >
                  บันทึกผู้ใช้งาน
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Disrobe Confirmation (การบันทึกการลาสิกขา) */}
      {showDisrobeModal && selectedUserForAction && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center gap-2.5 text-rose-700 border-b pb-3">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h2 className="font-bold text-slate-900 text-base">บันทึกการลาสิกขา (ศึก)</h2>
            </div>

            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
              <p className="font-bold text-rose-900">{selectedUserForAction.fullName}</p>
              {selectedUserForAction.paliName && (
                <p className="text-rose-800">ฉายา: {selectedUserForAction.paliName}</p>
              )}
              <p className="text-[11px] text-rose-700">
                ⚠️ การลาสิกขาจะเปลี่ยนสถานะเป็นคฤหัสถ์ ปรับสิทธิ์การอนุมัติเอกสารสงฆ์ และบันทึกประวัติการศึกษาเดิมไว้โดยไม่สูญหาย
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">คำนำหน้าใหม่หลังลาสิกขา</label>
                <select
                  value={disrobeNewTitle}
                  onChange={(e) => setDisrobeNewTitle(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                >
                  <option value="นาย">นาย</option>
                  <option value="ทิด (นาย)">ทิด (นาย)</option>
                  <option value="ดร.">ดร.</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">เหตุผลและบันทึกข้อความ</label>
                <textarea
                  rows={2}
                  value={disrobeReason}
                  onChange={(e) => setDisrobeReason(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="pt-3 border-t flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowDisrobeModal(false)}
                className="px-4 py-2 border rounded-xl hover:bg-slate-50 font-semibold"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleConfirmDisrobe}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow"
              >
                ยืนยันบันทึกการลาสิกขา
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: View/Edit User Permissions */}
      {showPermissionModal && selectedUserForAction && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h2 className="font-bold text-slate-900 text-base">สิทธิ์การเข้าถึงระบบ (Permissions)</h2>
                <p className="text-slate-500 text-[11px]">{selectedUserForAction.fullName} ({selectedUserForAction.role})</p>
              </div>
              <button
                type="button"
                onClick={() => setShowPermissionModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              {Object.entries(selectedUserForAction.permissions).map(([moduleKey, level]) => (
                <div key={moduleKey} className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between">
                  <span className="font-semibold text-slate-800">
                    {moduleKey === "monasticLife" ? "MOD-01: วิถีชีวิต ๒๔ ชม." :
                     moduleKey === "almsPatron" ? "MOD-02: ภัตตาหาร & โยม" :
                     moduleKey === "mukhopatha" ? "MOD-03: มุขปาฐะบาลี" :
                     moduleKey === "eApproval" ? "MOD-04: สารบรรณ & อนุมัติ" :
                     moduleKey === "mcuBridge" ? "MOD-05: ทะเบียน & มจร" : "MOD-06: จัดการผู้ใช้"}
                  </span>
                  <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                    level === "FULL" ? "bg-emerald-100 text-emerald-800" :
                    level === "WRITE" ? "bg-amber-100 text-amber-800" :
                    level === "READ" ? "bg-blue-100 text-blue-800" :
                    level === "APPROVE" ? "bg-purple-100 text-purple-900" :
                    "bg-slate-200 text-slate-500"
                  }`}>
                    {level}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t flex justify-end">
              <button
                type="button"
                onClick={() => setShowPermissionModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Confirmation Dialog for Account Status Toggle */}
      {showConfirmToggleModal && userToConfirmToggle && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-xs animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full ${
                userToConfirmToggle.accountStatus === "ACTIVE"
                  ? "bg-rose-100 text-rose-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}>
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-base">
                  {userToConfirmToggle.accountStatus === "ACTIVE"
                    ? "ยืนยันการระงับการใช้งานบัญชี"
                    : "ยืนยันการเปิดใช้งานบัญชี"}
                </h2>
                <p className="text-slate-500 text-[11px]">การดำเนินการนี้มีผลต่อสิทธิ์การเข้าสู่ระบบทันที</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl space-y-2 border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">ชื่อผู้ใช้งาน:</span>
                <span className="font-bold text-slate-900">{userToConfirmToggle.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">บทบาท:</span>
                <span className="font-semibold text-amber-900">{userToConfirmToggle.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">สถานะปัจจุบัน:</span>
                <span className={`font-semibold ${userToConfirmToggle.accountStatus === "ACTIVE" ? "text-emerald-700" : "text-rose-700"}`}>
                  {userToConfirmToggle.accountStatus === "ACTIVE" ? "ใช้งานปกติ" : "ระงับการใช้งาน"}
                </span>
              </div>
            </div>

            <p className="text-slate-600 text-xs leading-relaxed">
              {userToConfirmToggle.accountStatus === "ACTIVE"
                ? "หากระงับการใช้งาน ผู้ใช้นี้จะไม่สามารถเข้าถึงระบบหรือทำการบันทึกข้อมูลใดๆ ในราชวิทยาลัยได้ จนกว่าจะได้รับคำสั่งปลดระงับจากผู้ดูแลระบบสูงสุด"
                : "ผู้ใช้นี้จะได้รับสิทธิ์เข้าถึงระบบตามบทบาทและระดับสิทธิ์เดิมที่ได้รับมอบหมาย"}
            </p>

            <div className="pt-3 border-t flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowConfirmToggleModal(false);
                  setUserToConfirmToggle(null);
                }}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 font-semibold rounded-xl"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={confirmToggleAccountStatus}
                className={`px-4 py-2 text-white font-bold rounded-xl shadow transition-colors ${
                  userToConfirmToggle.accountStatus === "ACTIVE"
                    ? "bg-rose-600 hover:bg-rose-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {userToConfirmToggle.accountStatus === "ACTIVE" ? "ยืนยันระงับการใช้งาน" : "ยืนยันเปิดใช้งาน"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
