Read `c:/dev/gruntwrk-site/HANDOFF.md` and then execute this exact flow:

1. Output a concise session brief that includes:
- What GruntWrk Site is
- Last session summary (from Section 10)
- Pending work snapshot (from Section 11)

2. Run `git -C c:/dev/gruntwrk-site log --oneline -8` and print it under the heading `Recent commits`.

3. Run `git -C c:/dev/gruntwrk-site status --short` and print it under the heading `Working tree`.
- If clean, print exactly: `Clean - nothing uncommitted`

4. End with exactly:
`Ready. What are we working on?`

Do not ask follow-up questions. Output the brief, git sections, and final line only.
