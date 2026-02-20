import { useState } from "react";

// ─── LIVE DATA — February 20, 2026 ───
const DAYS_TO_M2 = 9;
const DAYS_TO_M3 = 23;

const FOCUS_PICKS = [
  { id: 1, icon: "🔴", action: "Continue M3 profile work: Interpretation template library", source: "THR-198 · In Progress · High", why: "M3 profiles due March 15 — template library is prerequisite for profile generation." },
  { id: 2, icon: "📋", action: "Scope remaining M2 work: Admin UI + property tests", source: "THR-180, THR-182, THR-187, THR-191 · Todo", why: "M2 MVP due March 1 — 9 days. Assess what's left after this week's completions." },
  { id: 3, icon: "📈", action: "Prep for GTM call with Elizabeth & Lori (today 9:30 AM)", source: "Calendar — ThriveIEP GTM", why: "Recurring GTM meeting. Update on M2 progress, student survey status." },
];

const ISSUES = {
  inProgress: [
    { id: "THR-198", title: "Interpretation template library (clinical content)", priority: "High", project: "C2A", milestone: "M3", assignee: "Eric" },
    { id: "THR-196", title: "Profile data model and schema extension", priority: "High", project: "C2A", milestone: "M3", assignee: "Eric" },
    { id: "THR-93", title: "Iterate on UX mockups for student assessment flow", priority: "High", project: "C2A", milestone: "M1", assignee: "Elizabeth" },
    { id: "THR-22", title: "Build: Profile Generation Engine", project: "C2A", milestone: "M3", due: "Mar 15", assignee: "Eric" },
    { id: "THR-21", title: "Build: Assessment Platform MVP", project: "C2A", milestone: "M2", due: "Mar 1", assignee: "Eric" },
  ],
  todo: [
    { id: "THR-86", title: "Create kickoff deck for NLU", priority: "Urgent", project: "C2A", assignee: "Elizabeth" },
    { id: "THR-90", title: "Design student onboarding experience", priority: "High", project: "C2A", milestone: "M2", assignee: "Elizabeth" },
    { id: "THR-205", title: "Research: Gather published norms for 7 instruments", priority: "High", project: "C2A", milestone: "M3", assignee: "Eric" },
    { id: "THR-180", title: "Implement admin UI (timepoint mgmt)", priority: "Medium", project: "C2A", milestone: "M2" },
    { id: "THR-182", title: "Property tests — Registry and admin", priority: "Medium", project: "C2A", milestone: "M2" },
    { id: "THR-187", title: "Property tests — Student API", priority: "Medium", project: "C2A", milestone: "M2" },
    { id: "THR-191", title: "Property tests — Scoring and RBAC", priority: "Medium", project: "C2A", milestone: "M2" },
    { id: "THR-62", title: "Deploy dev enhancements to production", priority: "High", project: "AE", assignee: "Soham" },
    { id: "THR-14", title: "Fix sample report link drop-off", priority: "High", project: "AE", assignee: "Eric" },
    { id: "THR-118", title: "Migrate to HIPAA-compliant GPU infra", priority: "Low", project: "PI", assignee: "Soham" },
  ],
  done: [
    { id: "THR-207", title: "Student survey UX + DB scoring check", at: "Feb 18", who: "Soham" },
    { id: "THR-176", title: "Student frontend (layout, onboarding)", at: "Feb 18" },
    { id: "THR-179", title: "Survey engine (frontend)", at: "Feb 18" },
    { id: "THR-172", title: "Scoring service, RBAC, coach routes", at: "Feb 18" },
    { id: "THR-29", title: "Student + advisor auth (MVP)", at: "Feb 18" },
    { id: "THR-30", title: "Survey delivery UI component", at: "Feb 18" },
    { id: "THR-154", title: "Rename 'advisor' → 'coach' in RBAC", at: "Feb 18", who: "Soham" },
    { id: "THR-131", title: "Construct mapping definitions", at: "Feb 12" },
  ],
};

const CALENDAR = [
  { time: "9:30–10:15a", title: "ThriveIEP GTM", type: "gtm", detail: "Elizabeth, Lori, Craig", day: "Fri 2/20" },
  { time: "7:30–8:30a", title: "Team Meeting", type: "team", detail: "Elizabeth, Craig", day: "Sun 2/22" },
  { time: "3:15–4:15p", title: "George", type: "tutoring", day: "Mon 2/23" },
  { time: "6:00–7:00p", title: "Vera", type: "tutoring", day: "Mon 2/23" },
  { time: "9:30a–2:00p", title: "In-Person Work Block", type: "work", detail: "CiC Kendall · Elizabeth", day: "Tue 2/24" },
  { time: "4:30–5:00p", title: "Jack", type: "tutoring", day: "Tue 2/24" },
  { time: "6:00–7:00p", title: "Vera", type: "tutoring", day: "Wed 2/25" },
  { time: "9:30a–2:30p", title: "In-Person Work Block", type: "work", detail: "CiC Kendall · Elizabeth", day: "Thu 2/26" },
  { time: "4:30–5:00p", title: "Jack", type: "tutoring", day: "Thu 2/26" },
  { time: "7:00a–1:00p", title: "Abby real estate exam", type: "personal", day: "Fri 2/27" },
  { time: "9:30–10:15a", title: "ThriveIEP GTM", type: "gtm", detail: "Elizabeth, Lori, Craig", day: "Fri 2/27" },
  { time: "2:30–3:30p", title: "Nehmet", type: "tutoring", day: "Fri 2/27" },
];

const GMAIL = [
  { from: "Hannah (TriTogether)", subject: "Re: Report attached", note: "FYI — acknowledged delivery", date: "Feb 19" },
  { from: "ThriveIEP (test)", subject: "C2A Coach invite email", note: "Verify coach signup flow", date: "Feb 18" },
];

const WEEKLY = [
  { text: "M2 backend: Scoring, RBAC, coach routes (THR-172)", done: true },
  { text: "M2 frontend: Layout/onboarding (THR-176), Survey engine (THR-179)", done: true },
  { text: "Scope and decompose M3 profile work (THR-22)", done: false },
  { text: "Project scaffolding (THR-27)", done: false },
  { text: "DB credentials from Soham (THR-181)", done: false },
  { text: "Coach journey mapping w/ Elizabeth", done: false },
  { text: "MVP vs post-MVP decision list", done: false },
  { text: "Soham audit todo for FERPA UI", done: false },
];

// WCAG AA palette — all ≥ 4.5:1 on their backgrounds
const C = {
  bg: "#0f1117",
  card: "#171a23",
  border: "#2a2f3c",
  div: "#22262f",
  text: "#e2dfd8",
  mid: "#b0ada6",
  muted: "#918e87",
  accent: "#e8a63a",
  warm: "#e8a63a",
  warmBg: "#251e0e",
  ok: "#6fcf7c",
  okBg: "#0f2016",
  blue: "#7db4fc",
  purple: "#c4b3e6",
  pink: "#dba8c8",
};

const TS = {
  gtm: { c: C.warm, l: "GTM" },
  team: { c: C.blue, l: "TEAM" },
  client: { c: C.purple, l: "CLIENT" },
  tutoring: { c: C.muted, l: "TUTOR" },
  work: { c: C.ok, l: "WORK" },
  personal: { c: C.pink, l: "PERS" },
};

const PC = { Urgent: C.warm, High: C.warm, Medium: C.mid, Low: C.muted };
const PB = { C2A: { c: C.warm, b: C.warmBg }, AE: { c: C.warm, b: C.warmBg }, PI: { c: C.ok, b: C.okBg } };

export default function Dashboard() {
  const [open, setOpen] = useState({ focus: true, sched: true, gmail: true });
  const [ck, setCk] = useState({});
  const [copied, setCopied] = useState(false);

  const tog = s => setOpen(p => ({ ...p, [s]: !p[s] }));
  const chk = k => setCk(p => ({ ...p, [k]: !p[k] }));
  const copyFP = () => {
    navigator.clipboard.writeText(FOCUS_PICKS.map((f, i) => `${i + 1}. ${f.action}\n   ${f.source}\n   ${f.why}`).join("\n\n"));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const todayEv = CALENDAR.filter(e => e.day === "Fri 2/20");
  const futureDays = ["Sun 2/22", "Mon 2/23", "Tue 2/24", "Wed 2/25", "Thu 2/26", "Fri 2/27"];
  const mono = "'JetBrains Mono',monospace";

  return (
    <div style={{ fontFamily: "'DM Sans','Helvetica Neue',sans-serif", background: C.bg, minHeight: "100vh", color: C.text, padding: "12px 16px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg,#1a1d2e,#141824)", borderRadius: 14, padding: "18px 22px", marginBottom: 10, border: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, color: C.accent, textTransform: "uppercase", fontFamily: mono }}>ThriveIEP PM Dashboard</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: C.text, letterSpacing: -0.5, marginTop: 3 }}>Friday, February 20</div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <MCh label="M2 MVP" days={DAYS_TO_M2} hot />
            <MCh label="M3" days={DAYS_TO_M3} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 20, marginTop: 14, flexWrap: "wrap" }}>
          <St label="In Progress" v={ISSUES.inProgress.length} color={C.blue} />
          <St label="Todo" v={ISSUES.todo.length} color={C.warm} />
          <St label="Done 48h" v={ISSUES.done.length} color={C.ok} />
          <St label="Today" v={todayEv.length} color={C.purple} />
        </div>
      </div>

      {/* TWO-COLUMN LAYOUT */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, alignItems: "start" }}>

        {/* LEFT COLUMN */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Acc title="Focus Picks" icon="🎯" open={open.focus} tog={() => tog("focus")} badge="3"
            right={<SmBtn onClick={copyFP} label={copied ? "✓ Copied" : "Copy"} active={copied} />}>
            {FOCUS_PICKS.map(fp => (
              <CkRow key={fp.id} ck={ck[`f${fp.id}`]} onCk={() => chk(`f${fp.id}`)}>
                <div style={{ fontSize: 15, fontWeight: 600, color: ck[`f${fp.id}`] ? C.muted : C.text, textDecoration: ck[`f${fp.id}`] ? "line-through" : "none", lineHeight: 1.4 }}>{fp.icon} {fp.action}</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 4, fontFamily: mono }}>{fp.source}</div>
                <div style={{ fontSize: 13, color: C.mid, marginTop: 3, lineHeight: 1.4 }}>{fp.why}</div>
              </CkRow>
            ))}
          </Acc>

          <Acc title="In Progress" icon="🔵" open={open.ip} tog={() => tog("ip")} badge={String(ISSUES.inProgress.length)}>
            {ISSUES.inProgress.map((iss, i) => <IRow key={i} iss={iss} ck={ck[`i${i}`]} onCk={() => chk(`i${i}`)} />)}
          </Acc>

          <Acc title="Todo" icon="🟡" open={open.td} tog={() => tog("td")} badge={String(ISSUES.todo.length)}>
            {ISSUES.todo.map((iss, i) => <IRow key={i} iss={iss} ck={ck[`t${i}`]} onCk={() => chk(`t${i}`)} />)}
          </Acc>

          <Acc title="Completed (48h)" icon="✅" open={open.done} tog={() => tog("done")} badge={String(ISSUES.done.length)}>
            <div style={{ padding: "10px 14px", display: "flex", gap: 6, flexWrap: "wrap" }}>
              {ISSUES.done.map(d => (
                <span key={d.id} style={{ fontSize: 11, fontFamily: mono, background: C.okBg, color: C.ok, padding: "3px 7px", borderRadius: 4, border: "1px solid #1e3d28" }}>{d.id}</span>
              ))}
            </div>
            {ISSUES.done.map((d, i) => (
              <div key={i} style={{ padding: "6px 14px", borderTop: `1px solid ${C.div}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ color: C.ok, fontSize: 13 }}>✓</span>
                  <span style={{ fontSize: 12, fontFamily: mono, color: C.muted }}>{d.id}</span>
                  <span style={{ fontSize: 13, color: C.mid }}>{d.title}</span>
                </div>
                <span style={{ fontSize: 12, color: C.muted }}>{d.at}</span>
              </div>
            ))}
          </Acc>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Acc title="Today's Schedule" icon="📅" open={open.sched} tog={() => tog("sched")} badge={String(todayEv.length)}>
            {todayEv.length ? todayEv.map((e, i) => <EvRow key={i} ev={e} />) : <Empty text="No events today" />}
          </Acc>

          <Acc title="Gmail" icon="📬" open={open.gmail} tog={() => tog("gmail")} badge={String(GMAIL.length)}>
            {GMAIL.map((m, i) => (
              <CkRow key={i} ck={ck[`g${i}`]} onCk={() => chk(`g${i}`)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{m.from}</span>
                  <span style={{ fontSize: 12, color: C.muted }}>{m.date}</span>
                </div>
                <div style={{ fontSize: 13, color: C.mid, marginTop: 2 }}>{m.subject}</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{m.note}</div>
              </CkRow>
            ))}
          </Acc>

          <Acc title="Week Ahead" icon="📅" open={open.week} tog={() => tog("week")}>
            {futureDays.map(day => {
              const evs = CALENDAR.filter(e => e.day === day);
              if (!evs.length) return null;
              return (
                <div key={day}>
                  <div style={{ padding: "6px 14px", fontSize: 12, fontWeight: 600, color: C.accent, letterSpacing: 0.5, background: "#13151d", borderTop: `1px solid ${C.div}` }}>{day}</div>
                  {evs.map((e, i) => <EvRow key={i} ev={e} />)}
                </div>
              );
            })}
          </Acc>

          <Acc title="Weekly Priorities" icon="📋" open={open.pri} tog={() => tog("pri")} badge={`${WEEKLY.filter(w => w.done).length}/${WEEKLY.length}`}>
            {WEEKLY.map((p, i) => (
              <div key={i} style={{ padding: "8px 14px", borderTop: i ? `1px solid ${C.div}` : "none", display: "flex", gap: 10, alignItems: "flex-start", opacity: p.done ? 0.55 : 1 }}>
                <span style={{ fontSize: 15, marginTop: 1 }}>{p.done ? "✅" : "⬜"}</span>
                <span style={{ fontSize: 14, color: p.done ? C.muted : C.text, textDecoration: p.done ? "line-through" : "none", lineHeight: 1.5 }}>{p.text}</span>
              </div>
            ))}
          </Acc>

          <Acc title="Blockers" icon="⚠️" open={open.block} tog={() => tog("block")}>
            <div style={{ padding: "16px 14px", textAlign: "center", color: C.ok, fontSize: 14, fontWeight: 500 }}>✓ No active blockers</div>
          </Acc>
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "14px 0 8px", fontSize: 11, color: C.muted, fontFamily: "'JetBrains Mono',monospace" }}>
        Generated {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} ET · Linear · Calendar · Gmail
      </div>
    </div>
  );
}

// ─── ATOMS ───
function MCh({ label, days, hot }) {
  const col = hot && days <= 10 ? C.warm : C.mid;
  return (
    <div style={{ background: C.warmBg, border: `1px solid ${col}44`, borderRadius: 8, padding: "5px 12px", display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ fontSize: 12, color: C.mid, fontFamily: "'JetBrains Mono',monospace" }}>{label}</span>
      <span style={{ fontSize: 20, fontWeight: 700, color: col, fontFamily: "'JetBrains Mono',monospace" }}>{days}d</span>
    </div>
  );
}

function St({ label, v, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
      <span style={{ fontSize: 13, color: C.muted }}>{label}:</span>
      <span style={{ fontSize: 14, fontWeight: 600, color: C.text, fontFamily: "'JetBrains Mono',monospace" }}>{v}</span>
    </div>
  );
}

function SmBtn({ onClick, label, active }) {
  return <button onClick={onClick} style={{ background: active ? C.okBg : "transparent", color: active ? C.ok : C.muted, border: `1px solid ${C.border}`, borderRadius: 5, padding: "3px 10px", fontSize: 11, cursor: "pointer", fontFamily: "inherit", fontWeight: 500 }}>{label}</button>;
}

function Acc({ title, icon, open, tog, badge, right, children }) {
  return (
    <div style={{ background: C.card, borderRadius: 10, border: `1px solid ${C.border}`, overflow: "hidden" }}>
      <button onClick={tog} aria-expanded={open} style={{ width: "100%", padding: "10px 14px", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, color: C.text, fontFamily: "inherit", textAlign: "left" }}>
        <span style={{ fontSize: 13, transform: open ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.15s", display: "inline-block", color: C.mid }}>▶</span>
        <span style={{ fontSize: 15, fontWeight: 600 }}>{icon} {title}</span>
        {badge && <span style={{ fontSize: 11, fontWeight: 600, background: C.accent + "22", color: C.accent, padding: "2px 7px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace" }}>{badge}</span>}
        <div style={{ flex: 1 }} />
        {right && <span onClick={e => e.stopPropagation()}>{right}</span>}
      </button>
      {open && <div style={{ borderTop: `1px solid ${C.div}` }}>{children}</div>}
    </div>
  );
}

function CkRow({ ck, onCk, children }) {
  return (
    <div style={{ padding: "10px 14px", borderTop: `1px solid ${C.div}`, display: "flex", gap: 10, alignItems: "flex-start", opacity: ck ? 0.45 : 1, transition: "opacity 0.15s" }}>
      <input type="checkbox" checked={!!ck} onChange={onCk} aria-label="Mark complete" style={{ marginTop: 4, accentColor: C.accent, cursor: "pointer", minWidth: 16, width: 16, height: 16 }} />
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
    </div>
  );
}

function EvRow({ ev }) {
  const s = TS[ev.type] || TS.work;
  return (
    <div style={{ padding: "8px 14px", borderTop: `1px solid ${C.div}`, display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: s.c, minWidth: 50, fontFamily: "'JetBrains Mono',monospace", letterSpacing: 0.3 }}>{s.l}</span>
      <span style={{ fontSize: 14, color: C.text, fontWeight: 500, flex: 1 }}>
        {ev.title}{ev.detail && <span style={{ color: C.mid, fontWeight: 400 }}> — {ev.detail}</span>}
      </span>
      <span style={{ fontSize: 12, color: C.mid, fontFamily: "'JetBrains Mono',monospace", whiteSpace: "nowrap" }}>{ev.time}</span>
    </div>
  );
}

function IRow({ iss, ck, onCk }) {
  const pb = PB[iss.project] || PB.C2A;
  const pc = PC[iss.priority];
  return (
    <CkRow ck={ck} onCk={onCk}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 3 }}>
        <span style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: pb.c, background: pb.b, padding: "2px 6px", borderRadius: 3 }}>{iss.id}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: pb.c, letterSpacing: 0.5 }}>{iss.project}</span>
        {iss.milestone && <span style={{ fontSize: 11, color: C.muted, fontFamily: "'JetBrains Mono',monospace" }}>{iss.milestone}</span>}
        {iss.priority && <span style={{ fontSize: 11, fontWeight: 600, color: pc || C.muted }}>{iss.priority}</span>}
      </div>
      <div style={{ fontSize: 14, color: ck ? C.muted : C.text, textDecoration: ck ? "line-through" : "none", lineHeight: 1.45 }}>{iss.title}</div>
      {(iss.assignee || iss.due) && (
        <div style={{ display: "flex", gap: 10, marginTop: 3 }}>
          {iss.assignee && <span style={{ fontSize: 12, color: C.mid }}>→ {iss.assignee}</span>}
          {iss.due && <span style={{ fontSize: 12, color: C.warm, fontFamily: "'JetBrains Mono',monospace" }}>Due {iss.due}</span>}
        </div>
      )}
    </CkRow>
  );
}

function Empty({ text }) {
  return <div style={{ padding: "16px 14px", textAlign: "center", fontSize: 14, color: C.muted }}>{text}</div>;
}
