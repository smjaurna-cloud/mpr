"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import {
  MessageSquareText,
  Search,
  PlusCircle,
  Pin,
  Lock,
  MessageCircle,
  Eye,
  Heart,
  Send,
  Users,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Filter,
  Sparkles,
  Bot,
  UserCheck,
  Building,
  Calendar,
  PhoneCall,
  Clock
} from "lucide-react";
import {
  mockBoardThreads,
  mockLiveChatMessages,
  mockOnlineUsers,
  getSmartBotReply,
  bannedWordsList,
  BoardThread,
  ThreadReply,
  LiveChatMessage,
  BoardCategory
} from "@/data/chatBoardData";

export default function ChatBoardPage() {
  const [activeTab, setActiveTab] = useState<"THREADS" | "LIVE_CHAT" | "MODERATION">("THREADS");

  // Threads State
  const [threads, setThreads] = useState<BoardThread[]>(mockBoardThreads);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedThreadForDetail, setSelectedThreadForDetail] = useState<BoardThread | null>(null);

  // New Thread Form State
  const [showNewThreadModal, setShowNewThreadModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<BoardCategory>("DHAMMA_PALI");
  const [newContent, setNewContent] = useState("");
  const [newAuthorName, setNewAuthorName] = useState("สมบูรณ์ (แอดมินระบบ)");
  const [newAuthorRole, setNewAuthorRole] = useState<BoardThread["authorRole"]>("SUPER_ADMIN");
  const [newTags, setNewTags] = useState("บาลี, ราชวิทยาลัย");

  // New Reply State in Thread Detail Modal
  const [replyText, setReplyText] = useState("");
  const [replyAuthorName, setReplyAuthorName] = useState("สมบูรณ์ (แอดมินระบบ)");

  // Live Chat State
  const [chatMessages, setChatMessages] = useState<LiveChatMessage[]>(mockLiveChatMessages);
  const [chatInput, setChatInput] = useState("");
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom on new chat message
  useEffect(() => {
    if (activeTab === "LIVE_CHAT") {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, activeTab]);

  // Filtered Threads
  const filteredThreads = useMemo(() => {
    return threads.filter((th) => {
      const matchSearch =
        searchQuery.trim() === "" ||
        th.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        th.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        th.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        th.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCategory =
        selectedCategory === "ALL" || th.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [threads, searchQuery, selectedCategory]);

  // Handle Sadhu Reaction on a Thread
  const handleSadhuThread = (threadId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setThreads((prev) =>
      prev.map((t) => (t.id === threadId ? { ...t, sadhuCount: t.sadhuCount + 1 } : t))
    );
    if (selectedThreadForDetail && selectedThreadForDetail.id === threadId) {
      setSelectedThreadForDetail((prev) => (prev ? { ...prev, sadhuCount: prev.sadhuCount + 1 } : null));
    }
  };

  // Handle Sadhu Reaction on a Reply
  const handleSadhuReply = (replyId: string) => {
    if (!selectedThreadForDetail) return;
    const updatedReplies = selectedThreadForDetail.replies.map((r) =>
      r.id === replyId ? { ...r, sadhuCount: r.sadhuCount + 1 } : r
    );
    const updatedThread = { ...selectedThreadForDetail, replies: updatedReplies };
    setSelectedThreadForDetail(updatedThread);
    setThreads((prev) => prev.map((t) => (t.id === updatedThread.id ? updatedThread : t)));
  };

  // Handle Submitting New Thread
  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      alert("กรุณากรอกหัวข้อและเนื้อหากระทู้");
      return;
    }

    const categoryMap: Record<BoardCategory, string> = {
      DHAMMA_PALI: "สนทนาธรรมและบาลีศึกษา",
      CAMPUS_LIFE: "ข่าวสารและกิจวัตรวิทยาลัย",
      IT_ERP_SUPPORT: "ศูนย์ช่วยเหลือไอที & ระบบ ERP",
      PATRON_PUBLIC: "มุมศรัทธาสาธุชน & โยมอุปถัมภ์",
    };

    const roleMap: Record<BoardThread["authorRole"], string> = {
      SUPER_ADMIN: "ผู้ดูแลระบบหลัก",
      FACULTY: "คณาจารย์",
      MONK: "พระภิกษุ",
      NOVICE: "สามเณร",
      STAFF: "เจ้าหน้าที่",
      PATRON: "โยมอุปถัมภ์",
    };

    const now = new Date();
    const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
      now.getDate()
    ).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(
      2,
      "0"
    )}`;

    const newThread: BoardThread = {
      id: `th-${Date.now()}`,
      category: newCategory,
      categoryThai: categoryMap[newCategory],
      title: newTitle,
      content: newContent,
      authorName: newAuthorName,
      authorRole: newAuthorRole,
      authorRoleThai: roleMap[newAuthorRole],
      avatarBg: newAuthorRole === "SUPER_ADMIN" ? "bg-slate-800" : "bg-amber-700",
      createdAt: formatted,
      viewsCount: 1,
      repliesCount: 0,
      sadhuCount: 1,
      isPinned: false,
      isLocked: false,
      tags: newTags.split(",").map((t) => t.trim()).filter(Boolean),
      replies: [],
    };

    setThreads([newThread, ...threads]);
    setShowNewThreadModal(false);
    setNewTitle("");
    setNewContent("");
  };

  // Handle Adding Reply
  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedThreadForDetail) return;

    const now = new Date();
    const formatted = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newRep: ThreadReply = {
      id: `rep-${Date.now()}`,
      authorName: replyAuthorName,
      authorRole: "SUPER_ADMIN",
      authorRoleThai: "ผู้ดูแลระบบหลัก",
      avatarBg: "bg-slate-800",
      content: replyText,
      createdAt: `วันนี้ ${formatted}`,
      sadhuCount: 1,
    };

    const updatedThread: BoardThread = {
      ...selectedThreadForDetail,
      repliesCount: selectedThreadForDetail.repliesCount + 1,
      replies: [...selectedThreadForDetail.replies, newRep],
    };

    setSelectedThreadForDetail(updatedThread);
    setThreads((prev) => prev.map((t) => (t.id === updatedThread.id ? updatedThread : t)));
    setReplyText("");
  };

  // Handle Sending Live Chat Message
  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const messageText = chatInput;
    const now = new Date();
    const timeString = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const userMessage: LiveChatMessage = {
      id: `msg-${Date.now()}`,
      senderName: "สมบูรณ์ (Super Admin)",
      senderRole: "SUPER_ADMIN",
      senderRoleThai: "ผู้ดูแลระบบหลัก",
      avatarBg: "bg-slate-800",
      text: messageText,
      timestamp: timeString,
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    // Simulate Smart Bot Response if triggered
    setTimeout(() => {
      const botReplyText = getSmartBotReply(messageText);
      const botMessage: LiveChatMessage = {
        id: `bot-${Date.now()}`,
        senderName: "ระบบอัตโนมัติ MCU Pali Bot",
        senderRole: "BOT",
        senderRoleThai: "ผู้ช่วยอัจฉริยะ วส. มจร",
        avatarBg: "bg-amber-600",
        text: botReplyText,
        timestamp: timeString,
        isBot: true,
      };
      setChatMessages((prev) => [...prev, botMessage]);
    }, 600);
  };

  // Handle Toggle Pin in Moderation
  const handleTogglePin = (threadId: string) => {
    setThreads((prev) =>
      prev.map((t) => (t.id === threadId ? { ...t, isPinned: !t.isPinned } : t))
    );
  };

  // Handle Delete Thread in Moderation
  const handleDeleteThread = (threadId: string) => {
    if (confirm("ยืนยันการลบกระทู้นี้ออกจากระบบ?")) {
      setThreads((prev) => prev.filter((t) => t.id !== threadId));
      if (selectedThreadForDetail?.id === threadId) {
        setSelectedThreadForDetail(null);
      }
    }
  };

  const totalReplies = threads.reduce((acc, t) => acc + t.repliesCount, 0);
  const totalSadhus = threads.reduce((acc, t) => acc + t.sadhuCount, 0);

  return (
    <div className="min-h-screen bg-slate-50/70 p-4 md:p-8 space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* Header Banner: Sacred Royal Heritage & Community Presence     */}
      {/* ------------------------------------------------------------- */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white p-6 md:p-8 shadow-xl border border-amber-500/30">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MOD-19: ระบบแชตบอร์ด & ชุมชนสงฆ์ศากยบุตรออนไลน์</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              <MessageSquareText className="w-8 h-8 text-amber-400" />
              แชตบอร์ด & กระดานสนทนาธรรมออนไลน์
            </h1>
            <p className="text-sm md:text-base text-slate-300 max-w-3xl">
              MCU Pali Community Chat Board & Monastic Discussion Forum • มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย
              พื้นที่แลกเปลี่ยนธรรมะ บาลีศึกษา ข่าวสารกิจวัตร และศูนย์ช่วยเหลือประสานงานภายใต้กรอบพระธรรมวินัย
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                ออนไลน์ขณะนี้: {mockOnlineUsers.length} รูป/คน
              </span>
              <span>•</span>
              <span>กระทู้ทั้งหมด: {threads.length} หัวข้อ</span>
              <span>•</span>
              <span>อนุโมทนาสะสม: {totalSadhus} สาธุ 🙏</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
            <button
              onClick={() => setShowNewThreadModal(true)}
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>ตั้งกระทู้สนทนาใหม่</span>
            </button>
            <button
              onClick={() => setActiveTab("LIVE_CHAT")}
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs border border-slate-700 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-amber-400" />
              <span>เปิดห้องแชตสด (Live Chat)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4 Summary Counters                                            */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
            <MessageSquareText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">กระทู้ทั้งหมด</p>
            <p className="text-xl font-bold text-slate-900">{threads.length} <span className="text-xs font-normal text-slate-500">หัวข้อ</span></p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">ข้อความตอบกลับ</p>
            <p className="text-xl font-bold text-blue-700">{totalReplies} <span className="text-xs font-normal text-slate-500">ข้อความ</span></p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">ยอดอนุโมทนาสาธุ</p>
            <p className="text-xl font-bold text-emerald-700">{totalSadhus} <span className="text-xs font-normal text-slate-500">ครั้ง 🙏</span></p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">ระบบกรองคำพระวินัย</p>
            <p className="text-xl font-bold text-purple-700">เปิดใช้งาน <span className="text-xs font-normal text-slate-500">(100%)</span></p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Tab Navigation Controls                                       */}
      {/* ------------------------------------------------------------- */}
      <div className="flex border-b border-slate-200 overflow-x-auto gap-2 text-sm font-medium">
        <button
          onClick={() => setActiveTab("THREADS")}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
            activeTab === "THREADS"
              ? "border-amber-600 text-amber-800 bg-amber-50/50 rounded-t-lg"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <MessageSquareText className="w-4 h-4" />
          <span>๑. กระดานสนทนาธรรม & ปัญหาบาลี (Discussion Board)</span>
          <span className="px-1.5 py-0.5 text-[10px] bg-amber-100 text-amber-800 rounded-full font-mono">
            {threads.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("LIVE_CHAT")}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
            activeTab === "LIVE_CHAT"
              ? "border-amber-600 text-amber-800 bg-amber-50/50 rounded-t-lg"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <Bot className="w-4 h-4 text-emerald-600" />
          <span>๒. ห้องแชตสด & ผู้ช่วยอัจฉริยะ (Live Chat & AI Bot)</span>
          <span className="px-1.5 py-0.5 text-[10px] bg-emerald-100 text-emerald-800 rounded-full font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            สด
          </span>
        </button>

        <button
          onClick={() => setActiveTab("MODERATION")}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
            activeTab === "MODERATION"
              ? "border-amber-600 text-amber-800 bg-amber-50/50 rounded-t-lg"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>๓. ศูนย์บริหารจัดการบอร์ด (Moderation Panel)</span>
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: DISCUSSION BOARD THREADS                               */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "THREADS" && (
        <div className="space-y-6">
          {/* Filter Bar & Search */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5 text-xs">
                {[
                  { label: "ทุกหมวดหมู่", val: "ALL" },
                  { label: "สนทนาธรรม & บาลีศึกษา", val: "DHAMMA_PALI" },
                  { label: "ข่าวสาร & กิจวัตรวิทยาลัย", val: "CAMPUS_LIFE" },
                  { label: "ศูนย์ช่วยเหลือไอที & ERP", val: "IT_ERP_SUPPORT" },
                  { label: "มุมศรัทธาสาธุชน & โยมอุปถัมภ์", val: "PATRON_PUBLIC" },
                ].map((pill) => (
                  <button
                    key={pill.val}
                    onClick={() => setSelectedCategory(pill.val)}
                    type="button"
                    className={`px-3 py-1.5 rounded-full font-medium transition-colors ${
                      selectedCategory === pill.val
                        ? "bg-amber-700 text-white font-semibold shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowNewThreadModal(true)}
                type="button"
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow transition-colors shrink-0"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>ตั้งกระทู้ใหม่</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ค้นหากระทู้, คำถาม, แท็ก หรือชื่อผู้เขียน..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
              />
            </div>
          </div>

          {/* Threads List */}
          <div className="space-y-3">
            {filteredThreads.map((thread) => (
              <div
                key={thread.id}
                onClick={() => setSelectedThreadForDetail(thread)}
                className={`bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition-all cursor-pointer ${
                  thread.isPinned
                    ? "border-2 border-amber-400 bg-amber-50/20"
                    : "border-slate-200 hover:border-amber-300"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    {/* Header line: Category, Pinned, Date */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      {thread.isPinned && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-300">
                          <Pin className="w-3 h-3 text-amber-700" />
                          ปักหมุด
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium border border-slate-200">
                        {thread.categoryThai}
                      </span>
                      {thread.isLocked && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-medium border border-rose-200">
                          <Lock className="w-3 h-3" /> ล็อก
                        </span>
                      )}
                      <span className="text-slate-400 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {thread.createdAt}
                      </span>
                    </div>

                    {/* Thread Title */}
                    <h3 className="text-base font-bold text-slate-900 hover:text-amber-800 transition-colors">
                      {thread.title}
                    </h3>

                    {/* Content Excerpt */}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {thread.content}
                    </p>

                    {/* Tags */}
                    {thread.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {thread.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Author Avatar & Role */}
                  <div className="flex flex-col items-end shrink-0">
                    <div className="flex items-center gap-2">
                      <div className="text-right hidden sm:block text-xs">
                        <p className="font-semibold text-slate-800">{thread.authorName}</p>
                        <p className="text-[10px] text-slate-400">{thread.authorRoleThai}</p>
                      </div>
                      <div
                        className={`w-9 h-9 rounded-full ${thread.avatarBg} text-white font-bold text-xs flex items-center justify-center shadow-sm`}
                      >
                        {thread.authorName.slice(0, 2)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Bar: Metrics & Reactions */}
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {thread.viewsCount} เปิดดู
                    </span>
                    <span className="flex items-center gap-1 text-blue-600 font-medium">
                      <MessageCircle className="w-3.5 h-3.5" />
                      {thread.repliesCount} ตอบกลับ
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleSadhuThread(thread.id, e)}
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition-colors font-medium text-xs"
                    title="กดอนุโมทนา สาธุ"
                  >
                    <span>🙏 อนุโมทนา</span>
                    <span className="font-mono font-bold text-amber-800">
                      {thread.sadhuCount}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: LIVE CHAT ROOM & AI ASSISTANT                          */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "LIVE_CHAT" && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Online Users List Sidebar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-600" />
                <span>สมาชิกออนไลน์ ({mockOnlineUsers.length})</span>
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>

            <div className="space-y-3 text-xs">
              {mockOnlineUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="relative">
                    <div className={`w-8 h-8 rounded-full ${user.avatarBg} text-white font-bold text-xs flex items-center justify-center shadow-xs`}>
                      {user.name.slice(0, 2)}
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{user.statusText}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-[11px] text-amber-900">
              💡 <strong>ผู้ช่วยอัตโนมัติ:</strong> สามารถพิมพ์ถามคำว่า &quot;ตารางเพล&quot;, &quot;เบอร์โทร&quot;, &quot;สมัครเรียน&quot;, &quot;จองรถ&quot; หรือ &quot;ร้องเรียน&quot; เพื่อรับคำตอบได้ทันที
            </div>
          </div>

          {/* Chat Stream & Input Area */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[650px] overflow-hidden">
            {/* Top Bar */}
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-amber-600" />
                <div>
                  <h3 className="font-bold text-sm text-slate-900">ห้องสนทนาสดราชวิทยาลัย (Live Monastic Chat)</h3>
                  <p className="text-[11px] text-slate-500">สนทนาแบบเรียลไทม์ พร้อมระบบผู้ช่วยอัจฉริยะตอบคำถามอัตโนมัติ</p>
                </div>
              </div>
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                เชื่อมต่อเซิร์ฟเวอร์สำเร็จ
              </span>
            </div>

            {/* Chat Messages Stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/30">
              {chatMessages.map((msg) => {
                const isCurrentUser = msg.senderRole === "SUPER_ADMIN";
                const isBot = msg.isBot;

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isCurrentUser ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full ${msg.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}
                    >
                      {isBot ? <Bot className="w-4 h-4" /> : msg.senderName.slice(0, 2)}
                    </div>

                    <div className={`max-w-md ${isCurrentUser ? "text-right" : "text-left"}`}>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-0.5">
                        <span className="font-bold text-slate-800">{msg.senderName}</span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded">
                          {msg.senderRoleThai}
                        </span>
                        <span className="font-mono text-[10px]">{msg.timestamp}</span>
                      </div>

                      <div
                        className={`p-3 rounded-2xl text-xs leading-relaxed inline-block whitespace-pre-line shadow-2xs ${
                          isBot
                            ? "bg-amber-50 border border-amber-300 text-amber-950 font-medium"
                            : isCurrentUser
                            ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-tr-none"
                            : "bg-white border border-slate-200 text-slate-800 rounded-tl-none"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick Monastic Phrases */}
            <div className="px-4 py-2 bg-slate-100/70 border-t border-slate-200 flex flex-wrap gap-1.5 text-xs">
              <span className="text-[11px] text-slate-500 font-medium self-center mr-1">ข้อความด่วน:</span>
              {[
                "นมัสการพระคุณเจ้า 🙏",
                "ขออนุโมทนาสาธุ 🙏",
                "สอบถามตารางภัตตาหารเพล",
                "ขอทราบเบอร์โทรสำนักงาน",
                "สอบถามหลักสูตร มคอ.๒",
                "ระบบจองรถส่วนกลาง",
              ].map((phrase) => (
                <button
                  key={phrase}
                  onClick={() => setChatInput(phrase)}
                  type="button"
                  className="px-2 py-1 bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-900 border border-slate-200 rounded text-[11px] transition-colors"
                >
                  {phrase}
                </button>
              ))}
            </div>

            {/* Chat Input Box */}
            <form onSubmit={handleSendChatMessage} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
              <input
                type="text"
                placeholder="พิมพ์ข้อความสนทนา หรือพิมพ์คำถามเกี่ยวกับวิทยาลัย..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 p-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>ส่งข้อความ</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: MODERATION PANEL                                       */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "MODERATION" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-600" />
                  ศูนย์ควบคุมการสนทนา & ตรวจสอบพระวินัย (Moderation Control Center)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  สิทธิเฉพาะผู้ดูแลระบบหลัก (`somboon`) และพระวินยาธิการ / พระพี่เลี้ยงในการควบคุมความสงบเรียบร้อย
                </p>
              </div>

              <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-900 rounded-full border border-amber-300">
                Super Admin Authorized
              </span>
            </div>

            {/* Monitored Words List */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                คำศัพท์ที่อยู่ในระบบเฝ้าระวังอัตโนมัติ (Monastic Decorum Filter)
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {bannedWordsList.map((word) => (
                  <span key={word} className="px-2 py-0.5 rounded bg-white text-rose-700 border border-rose-200 text-[11px]">
                    ⛔ {word}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-slate-500">
                ระบบจะบล็อกข้อความที่มีคำไม่สุภาพ หรือแปลงเป็นเครื่องหมายดอกจัน (***) โดยอัตโนมัติ เพื่อรักษาบรรยากาศสมณสารูป
              </p>
            </div>

            {/* Moderation Threads Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">หัวข้อกระทู้</th>
                    <th className="p-3">หมวดหมู่</th>
                    <th className="p-3">ผู้เขียน</th>
                    <th className="p-3 text-center">ปักหมุด</th>
                    <th className="p-3 text-center">ตอบกลับ</th>
                    <th className="p-3 text-right">การจัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {threads.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-semibold text-slate-900 max-w-sm truncate">
                        {t.isPinned && "📌 "}
                        {t.title}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]">
                          {t.categoryThai}
                        </span>
                      </td>
                      <td className="p-3 text-slate-700">{t.authorName}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleTogglePin(t.id)}
                          type="button"
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold border transition-colors ${
                            t.isPinned
                              ? "bg-amber-100 text-amber-900 border-amber-300"
                              : "bg-slate-100 text-slate-600 border-slate-200"
                          }`}
                        >
                          {t.isPinned ? "ปักหมุดแล้ว" : "ไม่ปักหมุด"}
                        </button>
                      </td>
                      <td className="p-3 text-center font-mono">{t.repliesCount}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDeleteThread(t.id)}
                          type="button"
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded border border-rose-200 text-[11px] transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>ลบ</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* Modal: New Thread Form                                        */}
      {/* ------------------------------------------------------------- */}
      {showNewThreadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-amber-300 my-8">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base">ตั้งกระทู้สนทนาธรรมใหม่</h3>
              </div>
              <button
                onClick={() => setShowNewThreadModal(false)}
                type="button"
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateThread} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  หมวดหมู่กระทู้ <span className="text-rose-500">*</span>
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as BoardCategory)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  required
                >
                  <option value="DHAMMA_PALI">สนทนาธรรมและบาลีศึกษา</option>
                  <option value="CAMPUS_LIFE">ข่าวสารและกิจวัตรวิทยาลัย</option>
                  <option value="IT_ERP_SUPPORT">ศูนย์ช่วยเหลือไอที & ระบบ ERP</option>
                  <option value="PATRON_PUBLIC">มุมศรัทธาสาธุชน & โยมอุปถัมภ์</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  หัวข้อกระทู้ <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="ระบุประเด็นหรือคำถามที่ต้องการสนทนา..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  เนื้อหาและรายละเอียด <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="อธิบายรายละเอียด ข้อสงสัย อ้างอิงพระไตรปิฎกหรือคัมภีร์บาลี..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    ชื่อผู้ตั้งกระทู้
                  </label>
                  <input
                    type="text"
                    value={newAuthorName}
                    onChange={(e) => setNewAuthorName(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    แท็ก (คั่นด้วยจุลภาค)
                  </label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    placeholder="บาลี, ภัตตาหาร, พระวินัย"
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setShowNewThreadModal(false)}
                  type="button"
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow-md transition-colors"
                >
                  โพสต์กระทู้
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* Modal: Thread Detail & Replies Drawer                         */}
      {/* ------------------------------------------------------------- */}
      {selectedThreadForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-amber-300 my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white shrink-0">
              <div className="flex items-center gap-2">
                <MessageSquareText className="w-5 h-5 text-amber-400" />
                <span className="text-xs text-amber-300 font-medium">
                  {selectedThreadForDetail.categoryThai}
                </span>
              </div>
              <button
                onClick={() => setSelectedThreadForDetail(null)}
                type="button"
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs flex-1">
              {/* Thread Author Line */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-full ${selectedThreadForDetail.avatarBg} text-white font-bold text-xs flex items-center justify-center`}>
                    {selectedThreadForDetail.authorName.slice(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{selectedThreadForDetail.authorName}</h4>
                    <p className="text-[11px] text-slate-500">{selectedThreadForDetail.authorRoleThai} • {selectedThreadForDetail.createdAt}</p>
                  </div>
                </div>

                <button
                  onClick={(e) => handleSadhuThread(selectedThreadForDetail.id, e)}
                  type="button"
                  className="flex items-center gap-1 px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-full font-medium"
                >
                  <span>🙏 อนุโมทนา</span>
                  <span className="font-mono font-bold">{selectedThreadForDetail.sadhuCount}</span>
                </button>
              </div>

              {/* Thread Main Content */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {selectedThreadForDetail.title}
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                  {selectedThreadForDetail.content}
                </p>
              </div>

              {/* Replies Section */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-amber-600" />
                  <span>ความคิดเห็น / ข้อสนทนาตอบกลับ ({selectedThreadForDetail.replies.length})</span>
                </h4>

                {selectedThreadForDetail.replies.length === 0 ? (
                  <p className="text-slate-400 italic">ยังไม่มีข้อความตอบกลับ ร่วมเป็นท่านแรกที่แสดงความคิดเห็น</p>
                ) : (
                  selectedThreadForDetail.replies.map((reply) => (
                    <div key={reply.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full ${reply.avatarBg} text-white font-bold text-[10px] flex items-center justify-center`}>
                            {reply.authorName.slice(0, 2)}
                          </div>
                          <span className="font-bold text-slate-900">{reply.authorName}</span>
                          <span className="text-[10px] px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded">
                            {reply.authorRoleThai}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-slate-400">{reply.createdAt}</span>
                      </div>
                      <p className="text-slate-700 text-xs pl-8 leading-relaxed">
                        {reply.content}
                      </p>
                      <div className="flex justify-end pl-8">
                        <button
                          onClick={() => handleSadhuReply(reply.id)}
                          type="button"
                          className="text-[11px] text-amber-800 hover:text-amber-950 flex items-center gap-1"
                        >
                          <span>🙏 สาธุ</span>
                          <span className="font-mono font-bold">({reply.sadhuCount})</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Reply Input Box */}
            <form onSubmit={handleAddReply} className="p-4 border-t border-slate-200 bg-slate-50 shrink-0 flex items-center gap-2">
              <input
                type="text"
                placeholder="พิมพ์ข้อความตอบกลับกระทู้ด้วยความสุภาพ..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 p-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
              />
              <button
                type="submit"
                disabled={!replyText.trim()}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold rounded-lg text-xs transition-colors"
              >
                ส่งข้อความ
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
