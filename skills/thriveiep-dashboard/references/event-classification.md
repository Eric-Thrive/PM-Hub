# Calendar Event Classification

Rules for categorizing calendar events. Applied to all 4 calendars.

## Classification Rules

Match against event title and description. First match wins.

| Pattern (case-insensitive) | Type | Icon |
|---------------------------|------|------|
| team, standup, sync, daily, 1:1 with Soham | `team` | 👥 |
| Jack, George, Vera, Jen, Nehmet, tutoring, lesson | `tutoring` | 📚 |
| NLU, National Louis, kickoff, Neuropool, Kinsome | `client` | 🤝 |
| GTM, go-to-market, marketing, sales call | `gtm` | 📈 |
| doctor, dentist, personal, Emily, family | `personal` | 🏠 |
| Everything else | `work` | 💼 |

## Display Rules

- **Today's events:** Show all types with times
- **Team tab (shared view):** Show only `team` and `client` types
- **Personal items:** Never shown in shared/team view
- **Tutoring:** Show in personal view only
- **All-day events:** Show at top with "All Day" label

## Meeting Prep Detection

An event triggers meeting prep logic when:
1. It's within the next 24 hours
2. It's type `client` or `team`
3. The event title or description contains a Linear issue reference (THR-XXX)
   OR maps to a known focus area from Notion Priorities

When detected, the meeting prep task is promoted in Focus Picks.
