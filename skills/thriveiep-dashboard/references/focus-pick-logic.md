# Focus Pick Curation Algorithm

Produces exactly 3 Focus Picks — the most important things Eric should work on today.

## Priority Cascade

Evaluate in order. First match fills the slot.

### Slot 1: Blockers (always highest priority)
1. Check Notion Priorities "Blockers" section
2. Check Linear issues with "blocked" label that Eric can unblock
3. Check issues blocking other issues on the critical path
4. If no blockers: fall through to Slot 2 logic

### Slot 2: Deadline-Driven Work
1. Unchecked items in "This Week's Focus" from Notion Priorities
2. Ranked by: `(days_until_deadline)^-1 × product_weight^-1`
   - Closer deadline + higher priority product = higher rank
3. Meeting prep: if a meeting in the next 24h maps to a Linear issue or
   focus item, promote it (prep work should happen before the meeting)

### Slot 3: Strategic / Networking
1. **Networking nudge check:** If 5+ business days since last HubSpot outreach:
   - This slot becomes a networking action
   - Suggest 1-2 contacts to reach out to
   - Rank by: relevance to current priorities > deal stage > recency of last touch
2. If networking is current (< 5 days): use next highest deadline-driven item

### Fallback (if slots aren't filled by above)
- Overdue items (any unchecked item past its due date)
- Urgent Linear issues (priority 1-2) not yet in progress
- Milestone deadline proximity (closest milestone deliverable not started)

## Networking Nudge Thresholds

| Days Since Outreach | Action |
|---------------------|--------|
| < 5 business days | No nudge — networking is healthy |
| 5-9 business days | Slot 3 becomes networking nudge |
| 10+ business days | Slot 2 becomes networking nudge (unless genuine emergency) |

## Contact Ranking for Networking Nudge

When suggesting contacts for outreach:
1. **Relevance:** Contact is related to current milestone work (NLU, ed-tech partners)
2. **Deal stage:** Active deals > prospects > cold contacts
3. **Recency:** Longer since last touch = higher priority to reconnect
4. **Warmth:** Previous positive interaction signals

## Focus Pick Format

Each focus pick should include:
```
[Priority indicator] [Action verb] [Specific task]
Source: [Linear THR-XXX / Notion / Calendar / HubSpot]
Why now: [Brief justification]
```

Example:
```
🔴 Complete THR-197 norms registry validation
Source: Linear THR-197 (blocks THR-22 profile generation)
Why now: On critical path for M3, THR-22 can't start without it

📋 Prep for NLU check-in call (tomorrow 2pm)
Source: Calendar + Linear THR-180
Why now: Meeting in 22 hours, need to update progress slides

🤝 Reconnect with [Contact Name] re: pilot partnerships
Source: HubSpot (12 days since last touch, active deal)
Why now: Networking gap detected — relationship maintenance
```
