import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ─── DATA (LIVE - February 22, 2026) ───
const ISSUES_INITIAL = [
  { id: "THR-21", title: "Build: Assessment Platform MVP", status: "In Progress", priority: "Normal", due: "2026-03-01", project: "C2A Pilot", labels: [] },
  { id: "THR-198", title: "Interpretation template library (clinical content)", status: "In Progress", priority: "High", due: null, project: "C2A Pilot", labels: [] },
  { id: "THR-196", title: "Profile data model and schema extension", status: "In Progress", priority: "High", due: null, project: "C2A Pilot", labels: [] },
  { id: "THR-22", title: "Build: Profile Generation Engine", status: "In Progress", priority: "Normal", due: "2026-03-15", project: "C2A Pilot", labels: [] },
  { id: "THR-93", title: "Iterate on UX mockups for C2A (Elizabeth)", status: "In Progress", priority: "High", due: null, project: "C2A Pilot", labels: ["Feature"] },
  { id: "THR-86", title: "Create kickoff deck for NLU virtual meeting", status: "Todo", priority: "Urgent", due: null, project: "C2A Pilot", labels: ["Feature"] },
  { id: "THR-205", title: "Norms research: means/SDs for 7 instruments", status: "Todo", priority: "High", due: null, project: "C2A Pilot", labels: ["research"] },
  { id: "THR-180", title: "Admin UI: Timepoint management", status: "Todo", priority: "Medium", due: null, project: "C2A Pilot", labels: [] },
  { id: "THR-182", title: "Property tests — Registry & admin", status: "Todo", priority: "Medium", due: null, project: "C2A Pilot", labels: [] },
  { id: "THR-187", title: "Property tests — Student API", status: "Todo", priority: "Medium", due: null, project: "C2A Pilot", labels: [] },
  { id: "THR-191", title: "Property tests — Scoring & RBAC", status: "Todo", priority: "Medium", due: null, project: "C2A Pilot", labels: [] },
  { id: "THR-90", title: "Design student onboarding/orientation experience", status: "Todo", priority: "High", due: null, project: "C2A Pilot", labels: ["Feature"] },
  { id: "THR-62", title: "Deploy dev enhancements to production", status: "Todo", priority: "High", due: null, project: "Accom. Engine", labels: [] },
];
const COMPLETED_INITIAL = [
  { id: "THR-52", title: "FERPA/HIPAA compliant system architecture", completedAt: "Feb 13" },
  { id: "DR-009", title: "Response Format Architecture decision record", completedAt: "Feb 21" },
  { id: "—", title: "C2A Response Format Reference doc (5 formats, Soham UI spec)", completedAt: "Feb 21" },
];
const EVENTS = [
  { day: 0, time: "9:00a", end: "10:00a", name: "Eric (personal)", type: "tutoring" },
  { day: 1, time: "3:15p", end: "4:15p", name: "George", type: "tutoring" },
  { day: 1, time: "6:00p", end: "7:00p", name: "Vera", type: "tutoring" },
  { day: 2, time: "9:30a", end: "2:00p", name: "In Person Work Block", type: "work", loc: "CiC Kendall" },
  { day: 2, time: "4:30p", end: "5:00p", name: "Jack", type: "tutoring" },
  { day: 3, time: "6:00p", end: "7:00p", name: "Vera", type: "tutoring" },
  { day: 4, time: "9:30a", end: "2:30p", name: "In Person Work Block", type: "work", loc: "CiC Kendall" },
  { day: 4, time: "4:30p", end: "5:00p", name: "Jack", type: "tutoring" },
  { day: 5, time: "7:00a", end: "8:00a", name: "Abby real estate exam", type: "tutoring" },
  { day: 5, time: "9:30a", end: "10:15a", name: "ThriveIEP GTM", type: "gtm" },
  { day: 5, time: "2:30p", end: "3:30p", name: "Nehmet", type: "tutoring", loc: "Brookline Library" },
  { day: 6, time: "9:00a", end: "10:00a", name: "Eric (personal)", type: "tutoring" },
];
const NOTION_TODOS = [
  { title: "Continue C2A M2 backend: Scoring, RBAC, coach routes (THR-172)", status: "Done", assign: "thriveiep", due: null, url: "#" },
  { title: "C2A M2 frontend: Student layout/onboarding (THR-176), Survey (THR-179)", status: "Done", assign: "thriveiep", due: null, url: "#" },
  { title: "Scope and decompose M3 profile work (THR-22)", status: "Next Up", assign: "thriveiep", due: null, url: "#" },
  { title: "Project scaffolding (THR-27, due Feb 18)", status: "Next Up", assign: "thriveiep", due: "2026-02-18", url: "#" },
  { title: "Get DB credentials from Soham (THR-181)", status: "Next Up", assign: "thriveiep", due: null, url: "#" },
  { title: "Coach journey mapping session with Elizabeth", status: "Next Up", assign: "thriveiep", due: null, url: "#" },
  { title: "Build Soham audit todo list for new FERPA UI", status: "Next Up", assign: "thriveiep", due: null, url: "#" },
  { title: "Share Response Format Reference with Soham", status: "Next Up", assign: "thriveiep", due: null, url: "#" },
  { title: "Install project-instructions-v2 + session-handoff skill zip", status: "Next Up", assign: "thriveiep", due: null, url: "#" },
];
const FOCUS_PICKS = [
  { id: "THR-21", title: "M2 Implementation Sprint — Backend + Frontend (8 days left)", reason: "M2 due March 1. THR-172 (scoring/RBAC), THR-179 (survey engine), THR-176 (student frontend) plus 3 property test suites (THR-182/187/191) and admin UI (THR-180) still open.", project: "C2A Pilot", tag: "Milestone", due: "2026-03-01" },
  { id: "SOHAM", title: "Share Response Format Reference with Soham + prep Tue work block", reason: "Soham needs the 5-format UI spec from Session 29 to build survey components. Tuesday in-person at CiC is the next collaboration window.", project: "C2A Pilot", tag: "Handoff", due: "2026-02-24" },
  { id: "PM-TOOLS", title: "Install PM tooling: project-instructions-v2 + session-handoff skill + DR links", reason: "Accumulated from 2 sessions. Quick wins that compound: better skill triggering, streamlined project instructions, decision records linked to Linear.", project: "Team/Admin", tag: "Tooling", due: null },
];
const DAYS = ["Sun 22", "Mon 23", "Tue 24", "Wed 25", "Thu 26", "Fri 27", "Sat 28"];
const TODAY = new Date("2026-02-22T12:00:00");
// ─── END DATA ───

const TYPE_COLORS = { team: "#5ba8c8", client: "#e8a33a", tutoring: "#b48ead", work: "#6aa84f", gtm: "#d08770", personal: "#888" };
const TIER_CFG = {
  overdue: { label: "Overdue & Urgent", icon: "🔴", color: "#f88", bg: "#2a1515", border: "#d44" },
  thisWeek: { label: "This Week", icon: "🟡", color: "#e8a33a", bg: "#2a2215", border: "#a87a2a" },
  upcoming: { label: "Coming Up", icon: "🔵", color: "#88bbdd", bg: "#152230", border: "#3a6a9a" },
  backlog: { label: "Backlog & Later", icon: "⚪", color: "#999", bg: "#1a1a1a", border: "#444" },
};
function daysUntil(d) { if (!d) return null; return Math.ceil((new Date(d+"T00:00:00")-TODAY)/86400000); }
function isOverdue(d) { return d ? new Date(d+"T23:59:59") < TODAY : false; }
function tierOf(t) {
  const d = daysUntil(t.due);
  if (isOverdue(t.due) || t.priority === "Urgent") return "overdue";
  if (t.status === "Backlog") return "backlog";
  if (d !== null && d <= 7) return "thisWeek";
  if (d !== null && d > 7) return "upcoming";
  if (t.priority === "High") return "thisWeek";
  if (t.priority === "Low" || t.priority === "Normal") return "backlog";
  return "upcoming";
}
const PR = { Urgent: 0, High: 1, Medium: 2, Normal: 3, Low: 4 };
const sortIssues = (a, b) => {
  const o = (isOverdue(a.due)?0:1)-(isOverdue(b.due)?0:1); if (o) return o;
  const p = (PR[a.priority]??5)-(PR[b.priority]??5); if (p) return p;
  const da = daysUntil(a.due), db = daysUntil(b.due);
  if (da !== null && db !== null) return da-db;
  return da !== null ? -1 : db !== null ? 1 : 0;
};

// ─── SMALL COMPONENTS ───
function PriorityBadge({ priority }) {
  const m = { Urgent:{bg:"#3d1f1f",c:"#faa",b:"#d44"}, High:{bg:"#3d2e1a",c:"#fcd89d",b:"#e8a33a"}, Normal:{bg:"#1d2d1d",c:"#b6d7a8",b:"#6aa84f"}, Low:{bg:"#252530",c:"#bbb",b:"#888"} }[priority] || {bg:"#222",c:"#aaa",b:"#666"};
  return <span style={{fontSize:11,fontWeight:700,padding:"2px 9px",borderRadius:5,background:m.bg,color:m.c,border:`1px solid ${m.b}55`}}>{priority}</span>;
}
function DueBadge({ due }) {
  if (!due) return null;
  const d = daysUntil(due), ov = isOverdue(due);
  return <span style={{fontSize:12,fontWeight:ov?700:500,color:ov?"#f88":d<=7?"#e8a33a":"#777",whiteSpace:"nowrap"}}>{ov?`⚠ OVERDUE (${due.slice(5)})`:`${d}d — ${due.slice(5)}`}</span>;
}
function IssueRow({ issue, onComplete }) {
  const ov = isOverdue(issue.due);
  return (
    <div style={{display:"flex",alignItems:"flex-start",gap:12,padding:"12px 14px",background:"#0f1117",borderRadius:10,marginBottom:5,borderLeft:`4px solid ${ov?"#d44":issue.status==="In Progress"?"#6aa84f":"#333"}`}}
      onMouseEnter={e=>e.currentTarget.style.background="#161a24"} onMouseLeave={e=>e.currentTarget.style.background="#0f1117"}>
      <button onClick={()=>onComplete(issue.id)} title="Mark done — queues for Linear sync"
        style={{width:22,height:22,borderRadius:6,border:"2px solid #555",background:"transparent",cursor:"pointer",flexShrink:0,marginTop:2,display:"flex",alignItems:"center",justifyContent:"center",color:"#666",fontSize:12,outline:"none"}}
        onMouseEnter={e=>{e.target.style.borderColor="#6aa84f";e.target.style.color="#6aa84f"}}
        onMouseLeave={e=>{e.target.style.borderColor="#555";e.target.style.color="#666"}}>✓</button>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontWeight:500,fontSize:14,lineHeight:1.5}}>{issue.title}</div>
        <div style={{display:"flex",gap:8,marginTop:5,flexWrap:"wrap",alignItems:"center"}}>
          <PriorityBadge priority={issue.priority} />
          <span style={{fontSize:11,color:"#5ba8c8",fontFamily:"monospace"}}>{issue.id}</span>
          <span style={{fontSize:11,color:"#777"}}>{issue.project}</span>
          {issue.status==="In Progress"&&<span style={{fontSize:10,padding:"2px 7px",borderRadius:4,background:"#1a2a1a",color:"#8c8"}}>▶ In Progress</span>}
          {issue.labels.map(l=><span key={l} style={{fontSize:10,color:"#777",padding:"1px 6px",background:"#1a1e28",borderRadius:3}}>{l}</span>)}
        </div>
      </div>
      <DueBadge due={issue.due} />
    </div>
  );
}
function Acc({ icon, label, count, color, bg, border, open: initOpen, children }) {
  const [open, setOpen] = useState(initOpen);
  const ref = useRef(null);
  const [h, setH] = useState(initOpen?"auto":"0px");
  useEffect(()=>{
    if(open){const s=ref.current?.scrollHeight;setH(s?s+"px":"auto");const t=setTimeout(()=>setH("auto"),300);return()=>clearTimeout(t)}
    else{const s=ref.current?.scrollHeight;setH(s+"px");requestAnimationFrame(()=>requestAnimationFrame(()=>setH("0px")))}
  },[open,count]);
  return (
    <div style={{marginBottom:8,borderRadius:14,overflow:"hidden",border:`1px solid ${open?(border||color)+"55":"#252a36"}`}}>
      <button onClick={()=>setOpen(!open)} style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"14px 18px",background:open?(bg||"#14171e"):"#14171e",border:"none",cursor:"pointer",color:"#e4e2dd",textAlign:"left",outline:"none"}}>
        <span style={{fontSize:16,width:24,textAlign:"center"}}>{icon}</span>
        <span style={{fontWeight:600,fontSize:15,flex:1,color}}>{label}</span>
        <span style={{fontSize:12,fontWeight:700,padding:"3px 10px",borderRadius:20,background:color+"22",color}}>{count}</span>
        <span style={{fontSize:14,color:"#666",transform:open?"rotate(180deg)":"rotate(0)",display:"inline-block",transition:"transform 0.25s"}}>▼</span>
      </button>
      <div ref={ref} style={{overflow:"hidden",height:h,transition:"height 0.3s ease"}}>{children}</div>
    </div>
  );
}

// ─── MAIN ───
export default function Dashboard() {
  const [issues, setIssues] = useState(ISSUES_INITIAL);
  const [done, setDone] = useState(COMPLETED_INITIAL);
  const [pendingSync, setPendingSync] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsgs, setChatMsgs] = useState([]);
  const [chatIn, setChatIn] = useState("");
  const [chatLoad, setChatLoad] = useState(false);
  const [newIssue, setNewIssue] = useState({ title: "", priority: "High", project: "C2A Pilot", due: "" });
  const chatEnd = useRef(null);
  const chatRef = useRef(null);
  const syncTextRef = useRef(null);
  const [showSyncText, setShowSyncText] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get("pending-sync");
        if (r?.value) {
          const saved = JSON.parse(r.value);
          setPendingSync(saved);
          const ids = new Set(saved.map(s => s.id));
          setIssues(p => p.filter(t => !ids.has(t.id)));
          setDone(p => {
            const ex = new Set(p.map(d => d.id));
            return [...saved.filter(s => !ex.has(s.id)).map(s => ({ id: s.id, title: s.title, completedAt: "Pending sync" })), ...p];
          });
        }
      } catch {}
    })();
  }, []);

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMsgs]);

  const tiers = useMemo(() => {
    const g = { overdue: [], thisWeek: [], upcoming: [], backlog: [] };
    issues.forEach(t => g[tierOf(t)].push(t));
    Object.values(g).forEach(a => a.sort(sortIssues));
    return g;
  }, [issues]);

  const completeIssue = useCallback((id) => {
    const issue = issues.find(t => t.id === id);
    if (!issue) return;
    const si = { id: issue.id, title: issue.title, markedAt: new Date().toISOString() };
    setIssues(p => p.filter(t => t.id !== id));
    setDone(p => [{ id: issue.id, title: issue.title, completedAt: "Pending sync" }, ...p]);
    setPendingSync(p => {
      const next = [...p, si];
      (async () => { try { await window.storage.set("pending-sync", JSON.stringify(next)); } catch {} })();
      return next;
    });
  }, [issues]);

  const dismissSync = useCallback((id) => {
    setPendingSync(p => {
      const next = p.filter(s => s.id !== id);
      (async () => { try { if (next.length) await window.storage.set("pending-sync", JSON.stringify(next)); else await window.storage.delete("pending-sync"); } catch {} })();
      return next;
    });
  }, []);

  const addIssue = useCallback(() => {
    if (!newIssue.title.trim()) return;
    setIssues(p => [...p, { ...newIssue, id: "THR-" + (200 + Math.floor(Math.random() * 100)), status: "Todo", labels: [] }]);
    setNewIssue({ title: "", priority: "High", project: "C2A Pilot", due: "" });
    setShowAdd(false);
  }, [newIssue]);

  const sendChat = useCallback(async () => {
    if (!chatIn.trim()) return;
    const msg = chatIn.trim(); setChatIn("");
    setChatMsgs(p => [...p, { role: "user", text: msg }]);
    setChatLoad(true);
    const ctx = `You are Eric's PM copilot. Today: Feb 22, 2026.\nISSUES:\n${issues.map(t => `${t.id}: ${t.title} [${t.priority}]${t.due ? " due " + t.due : ""}`).join("\n")}\nPENDING SYNC: ${pendingSync.map(s=>s.id).join(", ")||"None"}\nMilestones: M2 Mar 1 ($40K NLU), M3 Mar 15. Be direct.`;
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: ctx,
          messages: [...chatMsgs.map(m => ({ role: m.role === "user" ? "user" : "assistant", content: m.text })), { role: "user", content: msg }] }) });
      const d = await r.json();
      setChatMsgs(p => [...p, { role: "assistant", text: d.content?.map(c => c.text || "").join("") || "Error." }]);
    } catch { setChatMsgs(p => [...p, { role: "assistant", text: "Connection error." }]); }
    setChatLoad(false);
  }, [chatIn, chatMsgs, issues, pendingSync]);

  const progress = Math.round((done.length / (issues.length + done.length)) * 100);
  const dayEvts = selectedDay !== null ? EVENTS.filter(e => e.day === selectedDay) : null;
  const tagCol = { "Milestone": "#d44", "Blocker": "#d44", "Handoff": "#5ba8c8", "Tooling": "#6aa84f", "Architecture": "#b48ead", "Meeting Prep": "#e8a33a" };
  const statusCol = { "In Progress": { bg: "#1a2a1a", c: "#8c8" }, "Next Up": { bg: "#2a2215", c: "#e8a33a" }, "Done": { bg: "#1a2a1a", c: "#6aa84f" } };
  const assignCol = { thriveiep: "#5ba8c8", tutoring: "#b48ead", personal: "#e8a33a" };

  return (
    <div style={{ minHeight: "100vh", background: "#0b0d12", color: "#e4e2dd", fontFamily: "'Segoe UI', system-ui, sans-serif", fontSize: 15, lineHeight: 1.6 }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 24px" }}>
        {/* HEADER */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 24, paddingBottom: 20, borderBottom: "2px solid #252a36" }}>
          <div>
            <h1 style={{ fontSize: 30, fontWeight: 700, margin: 0 }}>ThriveIEP</h1>
            <p style={{ color: "#888", fontSize: 14, marginTop: 2 }}>Week of Feb 22 – 28, 2026</p>
          </div>
          <button onClick={() => setChatOpen(!chatOpen)}
            style={{ background: chatOpen ? "#e8a33a" : "#1a1e28", color: chatOpen ? "#000" : "#e8a33a", border: "2px solid #e8a33a", borderRadius: 10, padding: "7px 16px", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>
            💬 Ask Claude
          </button>
        </header>

        {/* PENDING SYNC BANNER */}
        {pendingSync.length > 0 && (
          <div style={{ background: "linear-gradient(135deg, #1a2a15, #14171e)", border: "2px solid #6aa84f55", borderRadius: 12, padding: "14px 20px", marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#8c8" }}>✅ Resolved Issues — Pending Linear Sync ({pendingSync.length})</span>
              <span style={{ fontSize: 11, color: "#777" }}>Copy and paste to Claude to sync</span>
              <button onClick={() => { setShowSyncText(p => !p); setTimeout(() => syncTextRef.current?.select(), 50); }} style={{ fontSize: 11, color: "#5ba8c8", background: "#152230", border: "1px solid #3a6a9a55", borderRadius: 6, padding: "3px 10px", cursor: "pointer", fontWeight: 600 }}>📋 Copy list</button>
              <button onClick={() => { setPendingSync([]); (async()=>{try{await window.storage.delete("pending-sync")}catch{}})(); }} style={{ fontSize: 11, color: "#faa", background: "#2a1515", border: "1px solid #d4444455", borderRadius: 6, padding: "3px 10px", cursor: "pointer", fontWeight: 600 }}>Clear all</button>
            </div>
            {showSyncText && (
              <textarea ref={syncTextRef} readOnly
                style={{ width: "100%", background: "#0b0d12", color: "#e4e2dd", border: "1px solid #3a6a9a55", borderRadius: 8, padding: "10px 14px", fontSize: 13, fontFamily: "monospace", lineHeight: 1.6, resize: "none", marginBottom: 8, outline: "none", boxSizing: "border-box" }}
                rows={pendingSync.length + 1}
                value={"Mark these issues as Done in Linear:\n" + pendingSync.map(s => `${s.id}: ${s.title}`).join("\n")}
                onFocus={e => e.target.select()} />
            )}
            {pendingSync.map(s => (
              <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderTop: "1px solid #1e2c1e" }}>
                <span style={{ fontSize: 12, color: "#5ba8c8", fontFamily: "monospace", fontWeight: 700 }}>{s.id}</span>
                <span style={{ fontSize: 13, color: "#ccc", flex: 1 }}>{s.title}</span>
                <button onClick={() => dismissSync(s.id)}
                  style={{ fontSize: 11, color: "#777", background: "#1a1e28", border: "1px solid #333", borderRadius: 6, padding: "3px 10px", cursor: "pointer" }}
                  onMouseEnter={e => e.target.style.color = "#faa"} onMouseLeave={e => e.target.style.color = "#777"}>dismiss</button>
              </div>
            ))}
          </div>
        )}

        {/* MILESTONE COUNTDOWN */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, padding: "14px 20px", background: "linear-gradient(135deg,#1f1519,#1a1e28)", border: "1px solid #3a2020", borderRadius: 12, marginBottom: 24, fontSize: 13 }}>
          <div><span style={{ color: "#777", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>M2: MVP</span><div style={{ color: "#faa", fontWeight: 700 }}>8 days → Mar 1</div></div>
          <div style={{ width: 1, background: "#333", alignSelf: "stretch" }} />
          <div><span style={{ color: "#777", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>M3: Profiles</span><div style={{ color: "#e8a33a", fontWeight: 700 }}>22 days → Mar 15</div></div>
          <div style={{ width: 1, background: "#333", alignSelf: "stretch" }} />
          <div><span style={{ color: "#777", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>NLU Contract</span><div style={{ color: "#a8d0f0", fontWeight: 700 }}>$40K</div></div>
          <div style={{ width: 1, background: "#333", alignSelf: "stretch" }} />
          <div><span style={{ color: "#777", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Issues</span><div style={{ color: "#a8d0f0", fontWeight: 700 }}>{issues.length} active · {done.length} done</div></div>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 160 }}>
            <div style={{ flex: 1, height: 7, background: "#1a1e28", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg,#e8a33a,#d08770)", borderRadius: 4 }} />
            </div>
            <span style={{ color: "#777", fontSize: 11 }}>{progress}%</span>
          </div>
        </div>

        {/* GRID */}
        <div style={{ display: "grid", gridTemplateColumns: chatOpen ? "1fr 360px" : "1fr", gap: 24 }}>
          <div>
            {/* FOCUS NOW */}
            <section>
              <h2 style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 2, color: "#666", fontWeight: 600, marginBottom: 12 }}>🎯 Focus Now</h2>
              <div style={{ background: "linear-gradient(135deg, #1a1510 0%, #14171e 100%)", border: "2px solid #e8a33a33", borderRadius: 16, padding: 20, marginBottom: 28 }}>
                <p style={{ fontSize: 13, color: "#888", marginBottom: 14 }}>Strategic priorities — what matters most this week:</p>
                {FOCUS_PICKS.map((pick, i) => {
                  const tc = tagCol[pick.tag] || "#e8a33a";
                  return (
                    <div key={pick.id} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "16px 18px", background: "#0b0d12", borderRadius: 12, marginBottom: i < FOCUS_PICKS.length - 1 ? 8 : 0, borderLeft: `5px solid ${tc}` }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: tc + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: tc, flexShrink: 0 }}>{i + 1}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{pick.title}</div>
                        <div style={{ fontSize: 12, color: "#999", lineHeight: 1.5, marginBottom: 8 }}>{pick.reason}</div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 10, padding: "2px 9px", borderRadius: 5, background: tc + "22", color: tc, fontWeight: 700 }}>{pick.tag}</span>
                          <span style={{ fontSize: 11, color: "#5ba8c8", fontFamily: "monospace" }}>{pick.id}</span>
                          <span style={{ fontSize: 11, color: "#777" }}>{pick.project}</span>
                        </div>
                      </div>
                      {pick.due && <DueBadge due={pick.due} />}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* CALENDAR */}
            <section>
              <h2 style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 2, color: "#666", fontWeight: 600, marginBottom: 12 }}>📅 Calendar</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 5, marginBottom: 6 }}>
                {DAYS.map((day, i) => {
                  const evts = EVENTS.filter(e => e.day === i);
                  return (
                    <button key={i} onClick={() => setSelectedDay(selectedDay === i ? null : i)}
                      style={{ background: selectedDay === i ? "#1e2a3a" : "#14171e", border: `2px solid ${i === 0 ? "#e8a33a" : selectedDay === i ? "#5ba8c8" : "#252a36"}`, borderRadius: 10, padding: "10px 6px", textAlign: "left", cursor: "pointer", color: "#e4e2dd", minHeight: 120, display: "flex", flexDirection: "column", outline: "none" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 10, color: "#777", textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>{day.split(" ")[0]}</span>
                        <span style={{ fontSize: 20, fontWeight: 700, lineHeight: 1, color: i === 0 ? "#e8a33a" : "#555" }}>{day.split(" ")[1]}</span>
                      </div>
                      {evts.slice(0, 2).map((ev, j) => (
                        <div key={j} style={{ fontSize: 10, lineHeight: 1.3, padding: "3px 5px", marginBottom: 2, borderLeft: `3px solid ${TYPE_COLORS[ev.type]}`, background: "rgba(255,255,255,0.03)", borderRadius: "0 3px 3px 0" }}>
                          <div style={{ color: "#666", fontSize: 9 }}>{ev.time}</div>
                          <div style={{ color: "#bbb", fontWeight: 500 }}>{ev.name}</div>
                        </div>
                      ))}
                      {evts.length > 2 && <div style={{ fontSize: 9, color: "#777", paddingLeft: 5 }}>+{evts.length - 2} more</div>}
                    </button>
                  );
                })}
              </div>
              {dayEvts && (
                <div style={{ background: "#14171e", border: "1px solid #252a36", borderRadius: 12, padding: 18, marginBottom: 8 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>{DAYS[selectedDay]} — {dayEvts.length} event{dayEvts.length !== 1 ? "s" : ""}</h3>
                  {dayEvts.map((ev, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0", borderBottom: i < dayEvts.length - 1 ? "1px solid #1e222c" : "none" }}>
                      <div style={{ width: 4, height: 36, borderRadius: 2, flexShrink: 0, marginTop: 2, background: TYPE_COLORS[ev.type] }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{ev.name}</div>
                        <div style={{ color: "#777", fontSize: 12 }}>{ev.time} – {ev.end}{ev.loc && <span style={{ marginLeft: 8, color: "#6aa84f" }}>📍 {ev.loc}</span>}</div>
                      </div>
                      <span style={{ fontSize: 10, padding: "3px 9px", borderRadius: 20, background: TYPE_COLORS[ev.type] + "22", color: TYPE_COLORS[ev.type], fontWeight: 600, textTransform: "capitalize" }}>{ev.type}</span>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
                {Object.entries(TYPE_COLORS).map(([t, c]) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 12, height: 4, borderRadius: 2, background: c }} /><span style={{ fontSize: 11, color: "#777", textTransform: "capitalize" }}>{t}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* NOTION TODOS — ACCORDION */}
            <section style={{ marginBottom: 12 }}>
              <Acc icon="🎒" label="Notion To-Dos" count={NOTION_TODOS.length} color="#5ba8c8" bg="#151a25" border="#5ba8c8" open={false}>
                <div style={{ padding: "4px 0" }}>
                  {NOTION_TODOS.map((todo, i) => {
                    const sc = statusCol[todo.status] || statusCol["Next Up"];
                    const ac = assignCol[todo.assign] || "#777";
                    const ov = todo.due ? new Date(todo.due + "T23:59:59") < TODAY : false;
                    return (
                      <div key={i}
                        style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 16px", borderBottom: i < NOTION_TODOS.length - 1 ? "1px solid #1e222c" : "none", textDecoration: "none", color: "#e4e2dd", borderLeft: `4px solid ${todo.status === "In Progress" ? "#6aa84f" : todo.status === "Done" ? "#6aa84f" : "#333"}` }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 500, fontSize: 14, lineHeight: 1.5, textDecoration: todo.status === "Done" ? "line-through" : "none", opacity: todo.status === "Done" ? 0.5 : 1 }}>{todo.title}</div>
                          <div style={{ display: "flex", gap: 8, marginTop: 5, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: sc.bg, color: sc.c, fontWeight: 600 }}>{todo.status}</span>
                            <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: ac + "15", color: ac, fontWeight: 600, textTransform: "capitalize" }}>{todo.assign}</span>
                          </div>
                        </div>
                        {todo.due && <div style={{ fontSize: 12, color: ov ? "#f88" : "#777", fontWeight: ov ? 700 : 400, whiteSpace: "nowrap" }}>{ov ? `⚠ ${todo.due.slice(5)}` : todo.due.slice(5)}</div>}
                      </div>
                    );
                  })}
                </div>
              </Acc>
            </section>

            {/* LINEAR ISSUES */}
            <section>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                <h2 style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 2, color: "#666", fontWeight: 600, margin: 0 }}>📋 Linear Issues</h2>
                <button onClick={() => setShowAdd(!showAdd)} style={{ background: "#1a3a1a", border: "1px solid #3a6a3a", borderRadius: 8, padding: "6px 14px", cursor: "pointer", color: "#8c8", fontSize: 12, fontWeight: 700 }}>+ Add Issue</button>
              </div>
              {showAdd && (
                <div style={{ background: "#14171e", border: "1px solid #3a6a3a", borderRadius: 12, padding: 18, marginBottom: 12, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-end" }}>
                  <div style={{ flex: "2 1 240px" }}>
                    <label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 3, fontWeight: 600 }}>Issue title *</label>
                    <input value={newIssue.title} onChange={e => setNewIssue(p => ({ ...p, title: e.target.value }))} onKeyDown={e => e.key === "Enter" && addIssue()} placeholder="What needs to be done?" autoFocus
                      style={{ width: "100%", padding: "9px 12px", background: "#0b0d12", border: "1px solid #333", borderRadius: 8, color: "#e4e2dd", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div style={{ flex: "1 1 100px" }}>
                    <label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 3, fontWeight: 600 }}>Priority</label>
                    <select value={newIssue.priority} onChange={e => setNewIssue(p => ({ ...p, priority: e.target.value }))} style={{ width: "100%", padding: "9px 12px", background: "#0b0d12", border: "1px solid #333", borderRadius: 8, color: "#e4e2dd", fontSize: 13, boxSizing: "border-box" }}>
                      {["Urgent", "High", "Normal", "Low"].map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div style={{ flex: "1 1 100px" }}>
                    <label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 3, fontWeight: 600 }}>Project</label>
                    <select value={newIssue.project} onChange={e => setNewIssue(p => ({ ...p, project: e.target.value }))} style={{ width: "100%", padding: "9px 12px", background: "#0b0d12", border: "1px solid #333", borderRadius: 8, color: "#e4e2dd", fontSize: 13, boxSizing: "border-box" }}>
                      {["C2A Pilot", "Accom. Engine", "Bloom Report", "Team/Admin"].map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div style={{ flex: "1 1 110px" }}>
                    <label style={{ fontSize: 11, color: "#888", display: "block", marginBottom: 3, fontWeight: 600 }}>Due date</label>
                    <input type="date" value={newIssue.due} onChange={e => setNewIssue(p => ({ ...p, due: e.target.value }))} style={{ width: "100%", padding: "9px 12px", background: "#0b0d12", border: "1px solid #333", borderRadius: 8, color: "#e4e2dd", fontSize: 13, boxSizing: "border-box" }} />
                  </div>
                  <button onClick={addIssue} style={{ background: "#e8a33a", color: "#000", border: "none", borderRadius: 8, padding: "9px 20px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Add</button>
                </div>
              )}
              {Object.entries(tiers).map(([tier, list]) => list.length > 0 && (
                <Acc key={tier} icon={TIER_CFG[tier].icon} label={TIER_CFG[tier].label} count={list.length} color={TIER_CFG[tier].color} bg={TIER_CFG[tier].bg} border={TIER_CFG[tier].border} open={tier === "overdue"}>
                  <div style={{ padding: "8px 12px 12px" }}>
                    {list.map(t => <IssueRow key={t.id} issue={t} onComplete={completeIssue} />)}
                  </div>
                </Acc>
              ))}
              <details style={{ marginTop: 16 }}>
                <summary style={{ cursor: "pointer", fontSize: 13, color: "#6aa84f", fontWeight: 600, padding: "8px 0" }}>✅ Recently completed ({done.length})</summary>
                <div style={{ paddingTop: 6 }}>
                  {done.map(t => (
                    <div key={t.id} style={{ padding: "7px 14px", fontSize: 12, color: "#555", borderBottom: "1px solid #1a1e28", display: "flex", justifyContent: "space-between" }}>
                      <span>{t.id} <s>{t.title}</s></span>
                      <span style={{ color: t.completedAt === "Pending sync" ? "#e8a33a" : "#555" }}>{t.completedAt}</span>
                    </div>
                  ))}
                </div>
              </details>
            </section>
          </div>

          {/* CHAT */}
          {chatOpen && (
            <aside style={{ background: "#14171e", border: "1px solid #252a36", borderRadius: 14, display: "flex", flexDirection: "column", height: "calc(100vh - 80px)", position: "sticky", top: 24, overflow: "hidden" }}>
              <div style={{ padding: "14px 18px", borderBottom: "1px solid #252a36", display: "flex", justifyContent: "space-between" }}>
                <h2 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>💬 Claude</h2>
                <button onClick={() => setChatOpen(false)} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: 18 }}>✕</button>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: 14 }}>
                {chatMsgs.length === 0 && (
                  <div style={{ textAlign: "center", padding: "32px 14px", color: "#555" }}>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>🤖</div>
                    <p style={{ fontSize: 13, marginBottom: 14 }}>Ask about issues, calendar, or priorities.</p>
                    {["What should I focus on?", "Which issues are overdue?", "Summarize my week"].map(q => (
                      <button key={q} onClick={() => { setChatIn(q); setTimeout(() => chatRef.current?.focus(), 50); }}
                        style={{ display: "block", width: "100%", background: "#1a1e28", border: "1px solid #333", borderRadius: 8, padding: "9px 12px", color: "#aaa", cursor: "pointer", fontSize: 12, textAlign: "left", marginBottom: 5 }}>{q}</button>
                    ))}
                  </div>
                )}
                {chatMsgs.map((m, i) => (
                  <div key={i} style={{ marginBottom: 10, display: "flex", flexDirection: "column", alignItems: m.role === "user" ? "flex-end" : "flex-start" }}>
                    <div style={{ maxWidth: "90%", padding: "9px 13px", borderRadius: 12, background: m.role === "user" ? "#2a3a4a" : "#1a1e28", border: `1px solid ${m.role === "user" ? "#3a5a7a" : "#252a36"}`, fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{m.text}</div>
                  </div>
                ))}
                {chatLoad && <div style={{ padding: "6px 12px", color: "#777", fontSize: 12 }}>Thinking...</div>}
                <div ref={chatEnd} />
              </div>
              <div style={{ padding: "10px 14px", borderTop: "1px solid #252a36", display: "flex", gap: 6 }}>
                <input ref={chatRef} value={chatIn} onChange={e => setChatIn(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendChat()} placeholder="Ask about your issues..."
                  style={{ flex: 1, padding: "9px 12px", background: "#0b0d12", border: "1px solid #333", borderRadius: 10, color: "#e4e2dd", fontSize: 13, outline: "none" }} />
                <button onClick={sendChat} disabled={chatLoad || !chatIn.trim()}
                  style={{ background: chatIn.trim() ? "#e8a33a" : "#333", color: chatIn.trim() ? "#000" : "#666", border: "none", borderRadius: 10, padding: "9px 14px", fontWeight: 700, cursor: chatIn.trim() ? "pointer" : "default", fontSize: 14 }}>↑</button>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
