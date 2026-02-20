import { useState, useEffect } from "react";

// ─── LIVE DATA (fetched Feb 20, 2026) ────────────────────────────────────────

const META = {
  date: "Friday, February 20, 2026",
  weekLabel: "Week of Feb 17",
  m2Days: 9,
  m3Days: 23,
};

const FOCUS_PICKS = [
  {
    icon: "📋",
    title: "THR-198 — Interpretation Template Library",
    source: "Linear THR-198",
    sourceUrl: "https://linear.app/thriveiep/issue/THR-198",
    why: "Active M3 work, In Progress — clinical content layer that unblocks profile generation. M3 is 23 days out.",
  },
  {
    icon: "🔴",
    title: "THR-205 — Norms Research (means/SDs for 7 instruments)",
    source: "Linear THR-205",
    sourceUrl: "https://linear.app/thriveiep/issue/THR-205",
    why: "Assigned to Eric, Todo. Required for norm-referenced T-score conversion (THR-197), blocking the full profile pipeline.",
  },
  {
    icon: "🧪",
    title: "Close M2 property tests — THR-182, THR-187, THR-191",
    source: "Linear THR-21",
    sourceUrl: "https://linear.app/thriveiep/issue/THR-21",
    why: "M2 due in 9 days. Three test suites (registry, student API, scoring/RBAC) are the last structural gaps before M2 ships.",
  },
];

const CALENDAR_TODAY = [
  {
    time: "9:30 AM",
    title: "ThriveIEP GTM",
    type: "team",
    attendees: ["Elizabeth", "Lori", "Craig"],
    zoom: "https://us06web.zoom.us/j/86021059679?pwd=5stFXbg6MCskxJMJDuc3sUF4gobOfF.1",
    alert: "Lori running a few mins late — on phone with Alexa's financial aid office",
  },
];

const CALENDAR_UPCOMING = [
  { date: "Sun Feb 22", time: "7:30 AM", title: "ThriveIEP Team Meeting", type: "team", attendees: ["Elizabeth", "Craig"] },
  { date: "Sun Feb 22", time: "9:00 AM",  title: "Eric (personal block)", type: "focus", attendees: [] },
];

const ACTIVE_ISSUES = [
  { id: "THR-198", title: "Interpretation template library (clinical content)", priority: "High",   milestone: "M3", assignee: "Eric",      url: "https://linear.app/thriveiep/issue/THR-198" },
  { id: "THR-196", title: "Profile data model and schema extension",            priority: "High",   milestone: "M3", assignee: "Eric",      url: "https://linear.app/thriveiep/issue/THR-196" },
  { id: "THR-22",  title: "Build: Profile Generation Engine",                  priority: "Normal", milestone: "M3", assignee: "Eric",      url: "https://linear.app/thriveiep/issue/THR-22",  due: "Mar 15" },
  { id: "THR-21",  title: "Build: Assessment Platform MVP",                    priority: "Normal", milestone: "M2", assignee: "Eric",      url: "https://linear.app/thriveiep/issue/THR-21",  due: "Mar 1" },
  { id: "THR-93",  title: "UX mockups iteration (C2A student flow)",           priority: "High",   milestone: "M1", assignee: "Elizabeth", url: "https://linear.app/thriveiep/issue/THR-93" },
];

const TODO_ISSUES = [
  { id: "THR-86",  title: "NLU kickoff deck",                               priority: "Urgent",  milestone: "M2", assignee: "Elizabeth", url: "https://linear.app/thriveiep/issue/THR-86" },
  { id: "THR-205", title: "Norms research: means/SDs for 7 instruments",   priority: "High",    milestone: "M3", assignee: "Eric",      url: "https://linear.app/thriveiep/issue/THR-205" },
  { id: "THR-182", title: "Property tests — Registry & admin",             priority: "Medium",  milestone: "M2", assignee: "Eric",      url: "https://linear.app/thriveiep/issue/THR-182" },
  { id: "THR-187", title: "Property tests — Student API",                  priority: "Medium",  milestone: "M2", assignee: "Eric",      url: "https://linear.app/thriveiep/issue/THR-187" },
  { id: "THR-191", title: "Property tests — Scoring & RBAC",               priority: "Medium",  milestone: "M2", assignee: "Eric",      url: "https://linear.app/thriveiep/issue/THR-191" },
  { id: "THR-180", title: "Admin UI: Timepoint management",                priority: "Medium",  milestone: "M2", assignee: "Eric",      url: "https://linear.app/thriveiep/issue/THR-180" },
  { id: "THR-90",  title: "Design student onboarding/orientation exp.",    priority: "High",    milestone: "M2", assignee: "Elizabeth", url: "https://linear.app/thriveiep/issue/THR-90" },
];

const COMPLETED = [
  { id: "THR-207", title: "Student survey UX & database scoring check (Soham)", when: "Feb 19" },
  { id: "THR-29",  title: "Student & advisor authentication (MVP)",              when: "Feb 18" },
  { id: "THR-30",  title: "Survey delivery UI component",                        when: "Feb 18" },
  { id: "THR-172", title: "Scoring service, RBAC, coach routes",                 when: "Feb 18" },
  { id: "THR-176", title: "Student frontend layout / onboarding",                when: "Feb 18" },
  { id: "THR-179", title: "Survey engine (frontend)",                            when: "Feb 18" },
];

const GMAIL = [
  { from: "Lori Scanlon",          subject: "ThriveIEP GTM",                          preview: "Running a few mins late — on the phone w Alexa's financial aid office.",                             tag: "FYI",    action: false },
  { from: "Hannah Sieber (TriTogether)", subject: "Re: Report attached",              preview: "Thanks! — reply to your report send. TriTogether migration working smoothly.",                       tag: "FYI",    action: false },
  { from: "ThriveIEP System",      subject: "You've been invited to join C2A as a Coach", preview: "Coach invite sent to eric+c2atestcoach — testing end-to-end coach onboarding flow.", tag: "Test",   action: false },
];

const NOTION_FOCUS = [
  { text: "Continue C2A M2 backend: Scoring, RBAC, coach routes (THR-172)",         done: true  },
  { text: "C2A M2 frontend: Student layout/onboarding (THR-176), Survey (THR-179)", done: true  },
  { text: "Scope and decompose M3 profile work (THR-22)",                            done: false },
  { text: "Project scaffolding (THR-27, due Feb 18)",                                done: false },
  { text: "Get DB credentials from Soham (THR-181)",                                 done: false },
  { text: "Coach journey mapping session with Elizabeth (Wed)",                       done: false },
  { text: "Prep MVP vs post-MVP decision list for coach journey session",             done: false },
  { text: "Build Soham audit todo list for new FERPA UI",                            done: false },
];

const STANDUP_TEXT =
`Yesterday: Closed 6 M2 issues — auth (THR-29), survey delivery UI (THR-30), scoring service + RBAC + coach routes (THR-172), student frontend layout/onboarding (THR-176), survey engine (THR-179). Coach invite flow tested end-to-end (THR-207).

Today: THR-198 interpretation template library, THR-205 norms research, M2 property tests (THR-182 / THR-187 / THR-191). GTM at 9:30.

Blockers: None.`;

// ─── STYLE MAPS ───────────────────────────────────────────────────────────────

const P_STYLE = {
  Urgent: "bg-red-100 text-red-800 border-red-200",
  High:   "bg-orange-100 text-orange-700 border-orange-200",
  Medium: "bg-blue-100 text-blue-700 border-blue-200",
  Normal: "bg-gray-100 text-gray-600 border-gray-200",
};
const M_STYLE = {
  M1: "bg-green-100 text-green-800 border-green-200",
  M2: "bg-yellow-100 text-yellow-800 border-yellow-200",
  M3: "bg-purple-100 text-purple-800 border-purple-200",
};
const EV_STYLE = {
  team:  "bg-blue-50 border-blue-200",
  focus: "bg-green-50 border-green-200",
};

const STORAGE_KEY = "dashboard-2026-02-20-v2";

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────

function Badge({ label, cls }) {
  return <span className={`inline-flex px-1.5 py-0.5 rounded text-xs font-medium border ${cls}`}>{label}</span>;
}

function IssueRow({ issue, checked, onToggle }) {
  const done = !!checked[issue.id];
  return (
    <div
      onClick={() => onToggle(issue.id)}
      className={`bg-white border rounded-lg p-3 flex items-start gap-3 cursor-pointer hover:border-blue-300 transition-colors ${done ? "opacity-40" : ""}`}
    >
      <input type="checkbox" checked={done} readOnly className="mt-0.5 h-4 w-4 accent-blue-600 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-medium text-gray-900 leading-snug ${done ? "line-through" : ""}`}>
          <a href={issue.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline mr-1" onClick={e => e.stopPropagation()}>{issue.id}</a>
          {issue.title}
        </div>
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          <Badge label={issue.priority} cls={P_STYLE[issue.priority] || P_STYLE.Normal} />
          <Badge label={issue.milestone} cls={M_STYLE[issue.milestone] || "bg-gray-100 text-gray-500 border-gray-200"} />
          {issue.assignee && <span className="text-xs text-gray-400 self-center">{issue.assignee}</span>}
          {issue.due      && <span className="text-xs text-gray-400 self-center">due {issue.due}</span>}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [tab,     setTab]     = useState("today");
  const [checked, setChecked] = useState({});
  const [toast,   setToast]   = useState(null);
  const [ready,   setReady]   = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const s = await window.storage.get(STORAGE_KEY);
        if (s?.value) setChecked(JSON.parse(s.value));
      } catch {}
      setReady(true);
    })();
  }, []);

  const toggle = async (key) => {
    const next = { ...checked, [key]: !checked[key] };
    setChecked(next);
    try { await window.storage.set(STORAGE_KEY, JSON.stringify(next)); } catch {}
  };

  const flash = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2000); };

  const copy = (text, msg) => navigator.clipboard.writeText(text).then(() => flash(msg));

  const clearAll = async () => {
    setChecked({});
    try { await window.storage.set(STORAGE_KEY, "{}"); } catch {}
    flash("Cleared!");
  };

  const TABS = [
    { id: "today",   label: "Today"       },
    { id: "issues",  label: "Issues"      },
    { id: "focus",   label: "Notion Focus"},
    { id: "gmail",   label: "Gmail"       },
    { id: "standup", label: "Standup"     },
  ];

  if (!ready) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400 text-sm">
      Loading…
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-sm font-sans">

      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-gray-900 text-white text-xs px-4 py-2 rounded-lg shadow-xl">
          {toast}
        </div>
      )}

      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-200 px-5 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🎯</span>
              <h1 className="text-base font-semibold text-gray-900">ThriveIEP Dashboard</h1>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{META.date} · {META.weekLabel}</p>
          </div>
          <div className="flex gap-3">
            <div className="text-center px-3 py-1.5 rounded-lg bg-yellow-50 border border-yellow-200">
              <div className="text-xl font-bold text-yellow-700 leading-none">{META.m2Days}</div>
              <div className="text-xs text-yellow-600 mt-0.5">days · M2</div>
            </div>
            <div className="text-center px-3 py-1.5 rounded-lg bg-purple-50 border border-purple-200">
              <div className="text-xl font-bold text-purple-700 leading-none">{META.m3Days}</div>
              <div className="text-xs text-purple-600 mt-0.5">days · M3</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="bg-white border-b border-gray-200 px-5">
        <div className="max-w-4xl mx-auto flex">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
                tab === t.id ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
              }`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Sticky action bar ── */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-gray-100 px-5 py-2 shadow-sm">
        <div className="max-w-4xl mx-auto flex gap-2 justify-end">
          <button onClick={() => copy(FOCUS_PICKS.map((p,i) => `${i+1}. ${p.icon} ${p.title}\n   Source: ${p.source}\n   Why: ${p.why}`).join("\n\n"), "Focus picks copied!")}
            className="text-xs px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">Copy Focus Picks</button>
          <button onClick={() => copy(Object.keys(checked).filter(k => checked[k]).join(", ") || "(none)", "Copied!")}
            className="text-xs px-3 py-1.5 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">Copy Checked</button>
          <button onClick={clearAll}
            className="text-xs px-3 py-1.5 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 transition-colors">Clear All</button>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-4xl mx-auto px-5 py-6 space-y-6">

        {/* TODAY */}
        {tab === "today" && <>
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">⭐ Focus Picks</h2>
            <div className="space-y-3">
              {FOCUS_PICKS.map((p, i) => {
                const key = `focus-${i}`;
                const done = !!checked[key];
                return (
                  <div key={i} onClick={() => toggle(key)}
                    className={`bg-white border rounded-xl p-4 flex gap-3 cursor-pointer hover:border-blue-300 shadow-sm transition-colors ${done ? "opacity-40" : ""}`}>
                    <input type="checkbox" checked={done} readOnly className="mt-0.5 h-4 w-4 accent-blue-600 shrink-0" />
                    <div className="flex-1">
                      <div className={`font-medium text-gray-900 ${done ? "line-through" : ""}`}>{p.icon} {p.title}</div>
                      <div className="text-xs text-gray-500 mt-1.5 space-y-0.5">
                        <div>
                          <span className="font-medium text-gray-600">Source:</span>{" "}
                          <a href={p.sourceUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline" onClick={e => e.stopPropagation()}>{p.source}</a>
                        </div>
                        <div><span className="font-medium text-gray-600">Why now:</span> {p.why}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">📅 Today's Calendar</h2>
            <div className="space-y-2">
              {CALENDAR_TODAY.map((ev, i) => (
                <div key={i} className={`border rounded-xl p-3 flex gap-3 ${EV_STYLE[ev.type] || "bg-white border-gray-200"}`}>
                  <div className="text-xs font-mono font-medium w-16 shrink-0 pt-0.5 text-gray-500">{ev.time}</div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{ev.title}</div>
                    {ev.attendees?.length > 0 && <div className="text-xs text-gray-500 mt-0.5">{ev.attendees.join(", ")}</div>}
                    {ev.alert && (
                      <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1 mt-1.5">⚠ {ev.alert}</div>
                    )}
                    {ev.zoom && (
                      <a href={ev.zoom} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline mt-1.5 block">Join Zoom →</a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mt-5 mb-3">📅 Upcoming This Week</h2>
            <div className="space-y-2">
              {CALENDAR_UPCOMING.map((ev, i) => (
                <div key={i} className={`border rounded-xl p-3 flex gap-3 ${EV_STYLE[ev.type] || "bg-white border-gray-200"}`}>
                  <div className="text-xs font-mono w-28 shrink-0 pt-0.5 text-gray-500">{ev.date}<br/>{ev.time}</div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{ev.title}</div>
                    {ev.attendees?.length > 0 && <div className="text-xs text-gray-500 mt-0.5">{ev.attendees.join(", ")}</div>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-xs text-green-800">
            <span className="font-semibold">🟢 Blockers:</span> None currently.
          </div>
        </>}

        {/* ISSUES */}
        {tab === "issues" && <>
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">🔄 In Progress ({ACTIVE_ISSUES.length})</h2>
            <div className="space-y-2">
              {ACTIVE_ISSUES.map(i => <IssueRow key={i.id} issue={i} checked={checked} onToggle={toggle} />)}
            </div>
          </section>
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 mt-2">📋 Todo ({TODO_ISSUES.length})</h2>
            <div className="space-y-2">
              {TODO_ISSUES.map(i => <IssueRow key={i.id} issue={i} checked={checked} onToggle={toggle} />)}
            </div>
          </section>
        </>}

        {/* NOTION FOCUS */}
        {tab === "focus" && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">📌 This Week's Focus</h2>
            <p className="text-xs text-gray-400 mb-4">{META.weekLabel} · from Notion PM Hub</p>
            <div className="space-y-2">
              {NOTION_FOCUS.map((item, i) => {
                const key = `notion-${i}`;
                const done = item.done || !!checked[key];
                return (
                  <div key={i} onClick={() => !item.done && toggle(key)}
                    className={`bg-white border rounded-lg p-3 flex gap-3 cursor-pointer hover:border-blue-200 transition-colors ${done ? "opacity-40" : ""}`}>
                    <input type="checkbox" checked={done} readOnly className="mt-0.5 h-4 w-4 accent-blue-600 shrink-0" />
                    <span className={`text-sm text-gray-800 ${done ? "line-through text-gray-400" : ""}`}>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* GMAIL */}
        {tab === "gmail" && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">📧 Unread Important (last 3 days)</h2>
            <div className="space-y-3">
              {GMAIL.map((msg, i) => (
                <div key={i} className="bg-white border rounded-xl p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-medium text-gray-900">{msg.subject}</div>
                      <div className="text-xs text-gray-500 mt-0.5">From: {msg.from}</div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 font-medium ${
                      msg.action ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-500"
                    }`}>{msg.tag}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{msg.preview}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* STANDUP */}
        {tab === "standup" && <>
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">✅ Completed Last 48h</h2>
            <div className="space-y-2">
              {COMPLETED.map(issue => (
                <div key={issue.id} className="bg-white border border-green-100 rounded-lg p-3 flex items-start gap-3 opacity-80">
                  <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                  <div>
                    <span className="font-medium text-gray-700 text-xs">{issue.id}</span>
                    <span className="text-gray-600 text-xs"> — {issue.title}</span>
                    <div className="text-xs text-gray-400 mt-0.5">{issue.when}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-blue-800 mb-2">📣 Standup Draft</h3>
            <pre className="text-xs text-blue-700 leading-relaxed whitespace-pre-wrap font-sans">{STANDUP_TEXT}</pre>
            <button
              onClick={() => copy(STANDUP_TEXT, "Standup copied!")}
              className="mt-3 text-xs px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              Copy Standup
            </button>
          </section>
        </>}

      </div>
    </div>
  );
}
