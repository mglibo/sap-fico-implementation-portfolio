import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileSearch,
  GitBranch,
  Layers3,
  Network,
  Route,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { EvidenceExplorer } from "@/components/evidence-explorer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { allEvidenceItems, cases, implementedCases, processRoadmap } from "@/lib/cases";

const p2p003 = cases.find((item) => item.id === "p2p-003");
const productionIssues = cases.reduce((sum, item) => sum + item.productionIssues.length, 0);
const configurationObjects = new Set(cases.flatMap((item) => item.configurationObjects));

const heroStats: Array<{
  label: string;
  value: string;
  detail: string;
  Icon: LucideIcon;
}> = [
  {
    label: "Implemented cases",
    value: implementedCases.length.toString(),
    detail: "P2P foundation, vendor, invoice",
    Icon: BriefcaseBusiness,
  },
  {
    label: "Evidence screenshots",
    value: allEvidenceItems.length.toString(),
    detail: "Case-specific galleries",
    Icon: Camera,
  },
  {
    label: "Production issues",
    value: productionIssues.toString(),
    detail: "F5155, zero-balance, GLT2076",
    Icon: FileSearch,
  },
  {
    label: "SAP objects",
    value: configurationObjects.size.toString(),
    detail: "Configuration and master data",
    Icon: Database,
  },
];

const storyPillars = [
  {
    title: "Business-process understanding",
    text: "Cases are organized by process, dependency, execution result, accounting impact, and validation status.",
    Icon: Workflow,
  },
  {
    title: "Configuration ability",
    text: "The P2P evidence shows posting periods, G/L accounts, tax layers, document controls, tolerance groups, and document splitting.",
    Icon: Layers3,
  },
  {
    title: "Troubleshooting discipline",
    text: "Production-style issues are documented with symptom, business impact, root cause, investigation path, resolution, and lesson.",
    Icon: ShieldCheck,
  },
];

const growthAreas = [
  "P2P vendor invoice and payment",
  "O2C customer invoice and incoming payment",
  "R2R close and reporting",
  "AA acquisition and depreciation",
  "CO cost object posting",
  "Cross-module validation packs",
];

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="mb-8">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-2">{title}</h2>
      <p className="section-copy mt-3">{copy}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <nav className="section-shell flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-3 font-bold text-slate-950">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-sm text-white shadow-sm">
              FI
            </span>
            <span>SAP ECC FI/CO Portfolio</span>
          </a>
          <div className="hidden items-center gap-1 text-sm font-semibold text-slate-600 lg:flex">
            <a className="rounded-md px-3 py-2 hover:bg-slate-100" href="#summary">
              Summary
            </a>
            <a className="rounded-md px-3 py-2 hover:bg-slate-100" href="#process">
              P2P Process
            </a>
            <a className="rounded-md px-3 py-2 hover:bg-slate-100" href="#evidence">
              Cases
            </a>
            <a className="rounded-md px-3 py-2 hover:bg-slate-100" href="#architecture">
              Architecture
            </a>
          </div>
        </nav>
      </header>

      <section id="top" className="hero-grid relative overflow-hidden border-b border-slate-200 bg-slate-950 text-white">
        <div className="section-shell relative z-10 grid gap-10 py-16 lg:grid-cols-[1fr_0.9fr] lg:py-20">
          <div className="flex flex-col justify-center">
            <Badge variant="outline" className="mb-5 w-fit border-white/20 bg-white/10 text-white">
              Mateo Glibo - SAP FI/FICO Consultant
            </Badge>
            <h1 className="max-w-5xl text-4xl font-bold leading-tight tracking-normal text-white md:text-6xl">
              SAP ECC FI/CO sandbox portfolio with evidence-backed case studies.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
              End-to-end business-process cases showing SAP configuration,
              execution, accounting impact, validation, and systematic troubleshooting
              in a fictional ECC sandbox.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href="#evidence">
                  Explore Cases <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <a href="#process">View P2P Process</a>
              </Button>
            </div>
            <p className="mt-6 max-w-3xl rounded-lg border border-amber-300/30 bg-amber-200/10 px-4 py-3 text-sm leading-6 text-amber-100">
              Self-initiated SAP ECC sandbox using fictional business data. No client-confidential information is displayed.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur">
            <div className="rounded-lg border border-white/10 bg-slate-900/85 p-5">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">
                    Implementation control room
                  </p>
                  <h2 className="mt-1 text-xl font-bold">Current portfolio signal</h2>
                </div>
                <Network className="h-5 w-5 text-amber-200" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {heroStats.map(({ label, value, detail, Icon }) => (
                  <div key={label} className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <Icon className="mb-4 h-5 w-5 text-cyan-200" />
                    <div className="text-2xl font-bold text-white">{value}</div>
                    <div className="mt-1 text-sm font-semibold text-slate-200">{label}</div>
                    <div className="mt-1 text-xs text-slate-400">{detail}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-cyan-100">
                  <Route className="h-4 w-4" />
                  P2P implementation path
                </div>
                <div className="mt-3 grid gap-2">
                  {processRoadmap.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-[28px_1fr] gap-3 text-sm">
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 text-xs font-bold">
                        {index + 1}
                      </span>
                      <span className="leading-6 text-slate-300">
                        <strong className="text-white">{item.label}</strong> - {item.statusLabel}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="summary" className="border-b border-slate-200 bg-white py-14">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Professional Summary"
            title="Built for recruiters, SAP managers, and clients to scan quickly"
            copy="The site presents business process context, SAP configuration work, accounting logic, production-style issue resolution, and screenshot-backed evidence without implying client-confidential delivery."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {storyPillars.map(({ title, text, Icon }) => (
              <div key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-6">
                <Icon className="mb-5 h-6 w-6 text-primary" />
                <h3 className="text-lg font-bold text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="bg-slate-50 py-16">
        <div className="section-shell">
          <SectionHeading
            eyebrow="P2P Process Roadmap"
            title="The website shows case dependencies instead of a screenshot archive"
            copy="Visitors first choose a case. Planned future cases remain visible in the roadmap but do not link to broken pages."
          />
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
            <div className="grid gap-3 lg:grid-cols-5">
              {processRoadmap.map((item, index) => {
                const node = (
                  <div className="h-full rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-primary text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <h3 className="text-sm font-bold leading-5 text-slate-950">{item.label}</h3>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      {item.statusLabel}
                    </p>
                  </div>
                );

                if (item.routeEnabled && item.slug) {
                  return (
                    <Link key={item.id} href={`/cases/${item.slug}`} className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                      {node}
                    </Link>
                  );
                }

                return (
                  <div key={item.id} aria-disabled="true" className="opacity-70">
                    {node}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="evidence" className="border-y border-slate-200 bg-white py-16">
        <div className="section-shell">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-eyebrow">Interactive Case Studies</p>
              <h2 className="section-title mt-2">Choose a case before viewing screenshots</h2>
              <p className="section-copy mt-3">
                The homepage lists the cases and roadmap. Each detail route uses the same reusable case template and shows only evidence relevant to that case.
              </p>
            </div>
            {p2p003 ? (
              <Button asChild>
                <Link href={`/cases/${p2p003.slug}`}>
                  Open P2P-003 <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : null}
          </div>
          <EvidenceExplorer />
        </div>
      </section>

      <section id="architecture" className="bg-slate-50 py-16">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="section-eyebrow">Reusable Architecture</p>
            <h2 className="section-title mt-2">Future cases are data additions, not page redesigns</h2>
            <p className="section-copy mt-3">
              P2P, O2C, R2R, AA, CO, and cross-module cases can use the same data model: overview, prerequisites, architecture, configuration, timeline, accounting, issues, evidence, validation, lessons, and related cases.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {growthAreas.map((area) => (
              <div key={area} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                <p className="text-sm leading-6 text-slate-700">{area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-12 text-white">
        <div className="section-shell grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">
              Portfolio Owner
            </p>
            <h2 className="mt-2 text-2xl font-bold">Mateo Glibo - SAP FI/FICO Consultant</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              Evidence-backed SAP ECC sandbox portfolio focused on configuration, execution, validation, accounting impact, and support thinking.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-white/10 p-4">
              <ClipboardCheck className="mb-3 h-5 w-5 text-cyan-200" />
              <div className="font-bold">Case data</div>
              <div className="text-xs text-slate-400">Structured model</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/10 p-4">
              <GitBranch className="mb-3 h-5 w-5 text-cyan-200" />
              <div className="font-bold">Roadmap</div>
              <div className="text-xs text-slate-400">P2P now, more later</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/10 p-4">
              <BadgeCheck className="mb-3 h-5 w-5 text-cyan-200" />
              <div className="font-bold">No client data</div>
              <div className="text-xs text-slate-400">Fictional sandbox</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

