# Data Gathering Protocol

Query syntax, calendar IDs, and processing rules for each data source.
The workflow and verification checklist live in SKILL.md — this file is
reference material for how to fetch and process each source.

## Step 1: Compute Dates

```
today = current date
day_of_week = Monday-Sunday
week_label = "Week of [Monday date]"
days_to_m2 = days until March 1, 2026
days_to_m3 = days until March 15, 2026
```

## Step 2: Fetch Each Source

### 2a. PM-Hub Priorities
- Read `context/priorities.md` from cloned PM-Hub repo via terminal
- Extract: "This Week's Focus" checklist items, "Blockers" section
- Note which items are checked vs unchecked

### 2b. Linear Issues (3 separate queries)

**In Progress:**
- `Linear:list_issues` — team: ThriveIEP, state: "In Progress"

**Todo:**
- `Linear:list_issues` — team: ThriveIEP, state: "Todo"

**Completed (last 48h):**
- `Linear:list_issues` — team: ThriveIEP, state: "Done", updatedAt: last 48h

**Optional (if time permits):**
- Blocked issues: `Linear:list_issues` with label "blocked"
- Dependency graph: get relations (blockedBy/blocks) on active milestone issues

### 2c. Google Calendar (4 calendars)

Fetch today through end of current week for each:

| Calendar | ID | Required? |
|----------|-----|-----------|
| Work | `eric@thriveiep.com` | ✅ Yes |
| Personal | `falkeeric@gmail.com` | Best-effort |
| MIT | `efalkemit@gmail.com` | Best-effort |
| Emily | `dremilyinglesi@gmail.com` | Best-effort |

Use `list_gcal_events` with `time_min` = start of today, `time_max` = end of
week (Sunday 11:59 PM), `time_zone` = "America/New_York".

Classify each event using `references/event-classification.md`.

**If a non-work calendar returns no events or errors:** Mark ⏭️ in the
checklist and move on. Only the work calendar is required.

### 2d. Gmail (2 queries)

**Query 1 — important unread:**
```
search_gmail_messages(q="is:unread is:important newer_than:3d")
```

**Query 2 — primary unread:**
```
search_gmail_messages(q="is:unread category:primary newer_than:1d")
```

Deduplicate across both queries. For each message, classify:
- `tag: "Action"` — needs Eric's response or decision
- `tag: "FYI"` — informational, no action needed
- `tag: "Reply"` — someone replied to Eric's message
- `tag: "Test"` — CI/CD notifications, test results
- Set `action: true` only for "Action" and "Reply" tags

### 2e. Slack (2 channel checks)

Search for messages in the last 24 hours:

**#general:**
```
Slack:slack_search_public(query="in:general after:[24h-ago-unix-ts]")
```

**#thriveiep-dev:**
```
Slack:slack_search_public(query="in:thriveiep-dev after:[24h-ago-unix-ts]")
```

Look for: team updates, blockers mentioned, meeting changes, deployment notes.
Slack data enriches calendar alerts and blocker detection — it doesn't have
its own dashboard section.

**If Slack returns no results or errors:** Mark ⏭️ and move on. This is
best-effort context enrichment.

### 2f. HubSpot

Use `HubSpot:get_user_details` first to check permissions, then:

**Pipeline deals:**
```
HubSpot:search_crm_objects(objectType="deals")
```

**Recent activity (last 7 days):**
```
HubSpot:search_crm_objects(objectType="contacts",
  filterGroups=[{filters:[{propertyName:"notes_last_updated",
  operator:"GTE", value:"[7-days-ago-ISO]"}]}])
```

**Networking status calculation:**
- Count business days since most recent logged outreach activity
- < 5 days: networking healthy (no nudge)
- 5-9 days: networking nudge for Focus Pick Slot 3
- 10+ days: escalate to Focus Pick Slot 2
- If HubSpot errors or returns no data: status = "unknown", note in summary

### 2g. Notion To-Dos (optional)

```
Notion:notion-search(query="To-Do", data_source_url="collection://1484659c-b96d-8132-94ea-000b793dca9b")
```

Filter for open/uncomplete items. Sort by due date.

**If Notion errors or the collection is inaccessible:** Skip entirely. This
source supplements the dashboard but is not required.

## Step 3: Process and Classify

### Sort Issues
1. Separate by product (C2A, Accommodation, PI Redactor, Bloom, Team/Admin)
2. Within product: sort by priority (1=Urgent first)
3. Apply product weight for cross-product sorting:
   - C2A issues always surface first (weight 1)
   - Then Accommodation/Bloom (weight 2)
   - Then PI Redactor (weight 3)

### Classify Calendar Events
Apply `references/event-classification.md` rules to each event.

### Enrich with Slack Context
If Slack returned messages relevant to a calendar event or Linear issue,
add an `alert` field to the corresponding calendar entry or note it in
the Focus Pick `why` field.
