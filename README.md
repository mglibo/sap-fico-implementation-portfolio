# SAP ECC FI/CO Sandbox Portfolio

Interactive SAP ECC FI/CO sandbox portfolio for a self-initiated fictional company scenario. The site presents SAP implementation evidence as reusable case packages rather than a bulk screenshot gallery.

This is not client work and does not claim real implementation ownership, production results, certificates, or production screenshots. Life OS is the source of truth; this website is the presentation layer for selected SAP ECC FI/CO configuration logic, business process explanation, testing evidence, table validation, and support-style problem solving.

## Portfolio Model

Evidence packages are defined in `lib/cases.ts` using a reusable case structure:

- module, area, status, difficulty, business process, and evidence type filters
- business context and implementation objective
- business requirement, solution overview, dependencies, and related cases
- SAP objects, transactions, configuration objects, and master data
- implementation timeline from requirement to validation/evidence
- selected screenshots for that case only
- table validations and result status
- lessons learned and interview talking points

The structure is designed to scale to future cases such as vendor invoice, F110 payment, customer invoice, asset accounting, bank accounting, controlling, month-end close, and testing evidence.

## Current Evidence

- CASE 002: Vendor Master - BioLab Chemicals GmbH
- Business process: Procure-to-Pay
- Validated SAP tables: LFA1, LFB1, LFM1
- Screenshot gallery: stored under `public/images/case-002/`
- Interactive detail view: business requirement, solution overview, implementation timeline, dependencies, related cases, validations, gallery, lessons, and interview talking point

Planned updates will add more evidence packages and a downloadable 2-page recruiter summary PDF.

## Tech Stack

- Next.js
- React
- Tailwind CSS
- shadcn-style UI components
- Radix Dialog for the screenshot lightbox
- Docker

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For a production check:

```bash
npm run build
npm run start
```

On PowerShell, set the port before starting if needed:

```powershell
$env:PORT=3000; npm run start
```

## Docker

```bash
docker build -t sap-fico-portfolio .
docker run --rm -p 3000:3000 sap-fico-portfolio
```

Open `http://localhost:3000`.
