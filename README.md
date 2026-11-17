# PurposeBridge

I built PurposeBridge at BYU's AI Day Hackathon to explore a simple idea: a class assignment can also be useful work for a local nonprofit. The prototype lets judges follow one community challenge from a rough request to student work the nonprofit can review and adopt.

[Open the browser demo](https://cameronjohnboyle2-hub.github.io/purposebridge/)

## Try the workflow

1. **Nonprofit director:** Post a community need and use the challenge refiner to turn rough notes into a brief.
2. **Teacher:** Pick up the challenge, adapt it into a class project with milestones and a rubric, and assign it to a student team.
3. **Student team lead:** Review the assignment, run a feedback check, and submit a draft for teacher review.
4. **Teacher and nonprofit director:** The teacher reviews and forwards the work. The nonprofit can mark it adopted and record a sample community outcome.

Use the persona switcher at the top to move between roles. The teacher review step is intentional: students can work on a real problem while the teacher controls what leaves the classroom.

## Prototype scope

- The three personas, organizations, and impact examples are demo data. Updates persist locally in your browser.
- Challenge refinement, curriculum adaptation, and student feedback use simulated responses. The demo runs without a model API key.
- Role switching demonstrates the workflow. Production use would require authenticated accounts, server-side permissions, and a student privacy review.

## Run locally

Built with React, TypeScript, Vite, and Tailwind CSS.

```sh
npm ci
npm run dev
```

Run `npm run build` to check TypeScript and build the static site.
