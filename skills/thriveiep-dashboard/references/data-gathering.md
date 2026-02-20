# Dashboard Data Gathering Protocol

## Step 1: Compute Dates

```
today = current date
day_of_week = Monday-Sunday
week_label = "Week of [Monday date]"
days_to_m2 = days until March 1, 2026
days_to_m3 = days until March 15, 2026
```

## Step 2: Parallel Data Fetch

Fetch all sources. These are independent and can be gathered in any order.

### 2a. Notion Priorities
- Fetch page: `2f74659c-b96d-8110-a85a-eba7732df3e9`
- Extract: "This Week's Focus" checklist items, "Blockers" section
- Note which items are checked vs unchecked

### 2b. Linear Issues
- `Linear:list_issues` — team: ThriveIEP, state: "In Progress" or "Todo"
- `Linear:list_issues` — team: ThriveIEP, state: "Done", updatedAt: last 48h
- For blocked issues: `Linear:list_issues` with label "blocked"
- For dependency graph: get relations (blockedBy/blocks) on active milestone issues

### 2c. Google Calendar (4 calendars, week view)
- `list_gcal_events` for each calendar:
  - `eric@thriveiep.com` (work)
  - `falkeeric@gmail.com` (personal)
  - `efalkemit@gmail.com` (MIT)
  - `dremilyinglesi@gmail.com` (Emily)
- Time range: today through end of week
- Classify each event (see event-classification.md)

### 2d. Notion To-Dos
- Query collection: `collection://1484659c-b96d-8132-94ea-000b793dca9b`
- Filter: open/uncomplete items
- Sort by due date

### 2e. Gmail
- `search_gmail_messages` with: `is:unread is:important newer_than:3d`
- Also: `search_gmail_messages` with: `is:unread category:primary newer_than:1d`
- Identify messages needing action vs FYI

### 2f. HubSpot (via MCP)
- Recent activity: last 7 days of logged activities
- Pipeline: active deals by stage
- Stale contacts: contacts with no outreach in 5+ business days
- Use `mcp.hubspot.com/anthropic` MCP server

## Step 3: Process and Classify

### Sort Issues
1. Separate by product (C2A, Accommodation, PI Redactor, Bloom, Team/Admin)
2. Within product: sort by priority (1=Urgent first)
3. Apply product weight for cross-product sorting:
   - C2A issues always surface first (weight 1)
   - Then Accommodation/Bloom (weight 2)
   - Then PI Redactor (weight 3)

### Classify Calendar Events
Apply event-classification.md rules to each event.

### Identify Networking Status
- Calculate business days since last HubSpot outreach activity
- If 5+ days: flag for networking nudge in Focus Picks
- If 10+ days: escalate to Focus Pick slot 2

## Step 4: Curate Focus Picks

Apply focus-pick-logic.md algorithm to produce exactly 3 Focus Picks.

## Step 5: Render

Produce both:
1. Interactive React artifact (`.jsx`) with all tabs
2. Brief text summary in the chat message
