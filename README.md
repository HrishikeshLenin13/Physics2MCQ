# Physics2MCQ

A circuit-physics multiple-choice study app with question diagrams, answer review, and focused retakes.

## Features

- Work through the included question bank and revisit previous questions.
- Review correct, incorrect, and unanswered questions.
- Retake the full bank or only missed questions.
- **Download review** saves a local JSON report with question IDs, selected choices, result status, and totals.
- Light/dark appearance and browser-persisted quiz state.

The review report contains no account credentials. Short or malformed saved answer lists count as unanswered rather than inflating the answered total.

## Local development

Requires Node.js 22+ and npm.

```sh
npm ci
npm run dev
```

Open [localhost:8080](http://localhost:8080). The app includes environment and connector scaffolding from its original hosting setup; external sign-in/data features need the corresponding configuration.

## Verify

```sh
npm test
npm run typecheck
```

`npm run build:dev` builds the development-mode site without the production command's database migration step. Configure the deployment environment before using `npm run build`.

## Data and limitations

Quiz selections are saved in this browser. Clearing site storage resets them. The JSON download is a personal review aid, not an official grade record. The checked-in questions and solutions should be reviewed by an instructor before high-stakes use.
