"use client";

import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  Calculator,
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Command,
  FileSearch,
  GitBranch,
  Layers3,
  Maximize2,
  Minus,
  Plus,
  Route,
  ShieldAlert,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { EvidenceItem, PortfolioCase, ProductionIssue } from "@/lib/cases";
import { caseBySlug } from "@/lib/cases";
import { cn } from "@/lib/utils";

function statusVariant(tone: PortfolioCase["statusTone"]) {
  if (tone === "success") return "success";
  if (tone === "warning") return "warning";
  return "secondary";
}

function SectionHeader({
  id,
  eyebrow,
  title,
  copy,
}: {
  id: string;
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div id={id} className="scroll-mt-24">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950 md:text-3xl">{title}</h2>
      {copy ? <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{copy}</p> : null}
    </div>
  );
}

function ListPanel({
  title,
  items,
  icon,
}: {
  title: string;
  items: string[];
  icon: React.ReactNode;
}) {
  if (items.length === 0) return null;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-slate-500">
        {icon}
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function issueEvidenceLabels(issue: ProductionIssue, evidence: EvidenceItem[]) {
  return issue.relatedEvidenceSteps
    .map((step) => evidence.find((item) => item.step === step))
    .filter(Boolean) as EvidenceItem[];
}

export function CaseDetail({ caseItem, compact = false }: { caseItem: PortfolioCase; compact?: boolean }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);

  const activeEvidence = lightboxIndex !== null ? caseItem.evidence[lightboxIndex] : undefined;
  const evidenceGroups = useMemo(() => {
    return Array.from(new Set(caseItem.evidence.map((item) => item.group))).map((group) => ({
      group,
      items: caseItem.evidence.filter((item) => item.group === group),
    }));
  }, [caseItem.evidence]);
  const validationGroups = useMemo(() => {
    return Array.from(new Set(caseItem.validation.map((item) => item.group ?? "Validation"))).map((group) => ({
      group,
      items: caseItem.validation.filter((item) => (item.group ?? "Validation") === group),
    }));
  }, [caseItem.validation]);

  const totalDebits = caseItem.accountingEntry
    .filter((line) => line.type === "Dr")
    .reduce((sum, line) => sum + line.amount, 0);
  const totalCredits = caseItem.accountingEntry
    .filter((line) => line.type === "Cr")
    .reduce((sum, line) => sum + line.amount, 0);
  const accountingBalances = Math.abs(totalDebits - totalCredits) < 0.001;

  const moveLightbox = (direction: -1 | 1) => {
    if (lightboxIndex === null || caseItem.evidence.length === 0) return;
    setLightboxIndex((lightboxIndex + direction + caseItem.evidence.length) % caseItem.evidence.length);
    setZoom(1);
  };

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") moveLightbox(1);
      if (event.key === "ArrowLeft") moveLightbox(-1);
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "+" || event.key === "=") setZoom((value) => Math.min(value + 0.2, 1.8));
      if (event.key === "-") setZoom((value) => Math.max(value - 0.2, 0.8));
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [caseItem.evidence.length, lightboxIndex]);

  const navItems = [
    ["overview", "Overview"],
    ["scenario", "Business Scenario"],
    ["prerequisites", "Prerequisites"],
    ["architecture", "SAP Architecture"],
    ["configuration", "Configuration"],
    ["timeline", "Timeline"],
    ["accounting", "Accounting Entry"],
    ["issues", "Production Issues"],
    ["evidence", "Evidence Gallery"],
    ["validation", "Validation"],
    ["lessons", "Lessons"],
    ["related", "Related Cases"],
  ];

  return (
    <article className={cn("bg-slate-50", compact ? "" : "min-h-screen")}>
      <section className={cn("border-b border-slate-200 bg-white", compact ? "rounded-xl border" : "")}>
        <div className={cn("section-shell py-8", compact ? "px-5 sm:px-6" : "py-10")}>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            {!compact ? (
              <Button asChild variant="outline" size="sm">
                <Link href="/#evidence">
                  <ArrowLeft className="h-4 w-4" />
                  Back to cases
                </Link>
              </Button>
            ) : null}
            <Badge variant={statusVariant(caseItem.statusTone)}>{caseItem.statusLabel}</Badge>
            <Badge variant="outline">{caseItem.process}</Badge>
            <Badge variant="outline">{caseItem.module}</Badge>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
            <div>
              <p className="section-eyebrow">{caseItem.id.toUpperCase()} case study</p>
              <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
                {caseItem.title}
              </h1>
              <p className="mt-5 max-w-4xl text-base leading-7 text-slate-600 md:text-lg">
                {caseItem.businessObjective}
              </p>
              <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold leading-6 text-amber-900">
                Self-initiated SAP ECC sandbox using fictional business data. No client-confidential information is displayed.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-950 p-5 text-white shadow-soft">
              <div className="mb-4 flex items-center gap-2 text-sm font-bold text-cyan-100">
                <ClipboardCheck className="h-4 w-4" />
                Case facts
              </div>
              <dl className="space-y-3 text-sm">
                {[
                  ["Company code", caseItem.companyCode],
                  ["Vendor", caseItem.vendor],
                  ["Document", caseItem.documentNumber],
                  ["Fiscal year", caseItem.fiscalYear],
                  ["Document type", caseItem.documentType],
                  ["Reference", caseItem.reference],
                  ["Posting date", caseItem.postingDate],
                  ["Tax code", caseItem.taxCode],
                ]
                  .filter(([, value]) => value)
                  .map(([label, value]) => (
                    <div key={label} className="grid grid-cols-[120px_1fr] gap-3 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                      <dt className="text-slate-400">{label}</dt>
                      <dd className="font-semibold text-white">{value}</dd>
                    </div>
                  ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <div className="section-shell py-8">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <nav className="sticky top-20 rounded-lg border border-slate-200 bg-white p-3 shadow-sm" aria-label="Case sections">
              {navItems.map(([href, label]) => (
                <a
                  key={href}
                  href={`#${href}`}
                  className="block rounded-md px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                >
                  {label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="min-w-0 space-y-10">
            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader
                id="overview"
                eyebrow="Overview"
                title={caseItem.implementationResult}
                copy={caseItem.shortObjective}
              />
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-slate-50 p-4">
                  <div className="text-2xl font-bold text-slate-950">{caseItem.evidence.length}</div>
                  <div className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Evidence screenshots</div>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <div className="text-2xl font-bold text-slate-950">{caseItem.transactions.length}</div>
                  <div className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Transactions</div>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <div className="text-2xl font-bold text-slate-950">{caseItem.productionIssues.length}</div>
                  <div className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Issues solved</div>
                </div>
              </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <SectionHeader id="scenario" eyebrow="Business Scenario" title="What the case proves" />
                <p className="mt-5 text-sm leading-7 text-slate-700">{caseItem.businessObjective}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <SectionHeader id="prerequisites" eyebrow="Prerequisites" title="Ready before execution" />
                <ul className="mt-5 space-y-2">
                  {caseItem.prerequisites.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-3">
              <ListPanel title="SAP Architecture" icon={<Route className="h-4 w-4 text-primary" />} items={caseItem.architecture} />
              <ListPanel title="Configuration" icon={<Layers3 className="h-4 w-4 text-primary" />} items={caseItem.configuration} />
              <ListPanel title="Transactions" icon={<Command className="h-4 w-4 text-primary" />} items={caseItem.transactions} />
            </section>

            <section id="timeline" className="scroll-mt-24 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader eyebrow="Execution Timeline" title="Chronological implementation story" id="timeline-heading" />
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {caseItem.timeline.map((step, index) => (
                  <div key={`${step.stage}-${step.title}`} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-3 flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-sm font-bold text-white">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">{step.stage}</p>
                        <h3 className="mt-1 text-sm font-bold text-slate-950">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm leading-6 text-slate-600">{step.description}</p>
                    {step.evidenceSteps ? (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {step.evidenceSteps.map((evidenceStep) => (
                          <Badge key={evidenceStep} variant="outline">STEP {String(evidenceStep).padStart(2, "0")}</Badge>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>

            {caseItem.accountingEntry.length > 0 ? (
              <section id="accounting" className="scroll-mt-24 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <SectionHeader
                  eyebrow="Accounting Entry"
                  title="Final FI document impact"
                  copy="The invoice creates an open vendor liability. It does not imply payment occurred."
                  id="accounting-heading"
                />
                <div className="mt-6 overflow-hidden rounded-lg border border-slate-200">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-xs uppercase tracking-[0.12em] text-slate-500">
                      <tr>
                        <th className="px-4 py-3">Dr/Cr</th>
                        <th className="px-4 py-3">Account</th>
                        <th className="px-4 py-3">Meaning</th>
                        <th className="px-4 py-3 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {caseItem.accountingEntry.map((line) => (
                        <tr key={`${line.type}-${line.account}`}>
                          <td className="px-4 py-3 font-bold text-slate-950">{line.type}</td>
                          <td className="px-4 py-3">
                            <div className="font-bold text-slate-950">{line.account}</div>
                            <div className="text-xs text-slate-500">{line.label}</div>
                          </td>
                          <td className="px-4 py-3 text-slate-600">{line.impact}</td>
                          <td className="px-4 py-3 text-right font-bold text-slate-950">{line.amountDisplay}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Badge variant={accountingBalances ? "success" : "warning"}>
                    <Calculator className="mr-1 h-3.5 w-3.5" />
                    {accountingBalances ? "Balanced to 0.00 EUR" : "Accounting does not balance"}
                  </Badge>
                  <span className="text-sm font-semibold text-slate-600">{caseItem.accountingSummary}</span>
                </div>
              </section>
            ) : null}

            {caseItem.productionIssues.length > 0 ? (
              <section id="issues" className="scroll-mt-24 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <SectionHeader
                  eyebrow="Production Issues Solved"
                  title="Configuration defects found during execution"
                  copy="Each issue is documented as symptom, impact, root cause, investigation, resolution, and preventive lesson."
                  id="issues-heading"
                />
                <div className="mt-6 grid gap-4">
                  {caseItem.productionIssues.map((issue) => (
                    <div key={issue.id} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        <ShieldAlert className="h-5 w-5 text-amber-600" />
                        {issue.message ? <Badge variant="warning">{issue.message}</Badge> : null}
                        <h3 className="text-lg font-bold text-slate-950">{issue.title}</h3>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Symptom</p>
                          <p className="mt-1 text-sm leading-6 text-slate-700">{issue.symptom}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Business impact</p>
                          <p className="mt-1 text-sm leading-6 text-slate-700">{issue.businessImpact}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Root cause</p>
                          <p className="mt-1 text-sm leading-6 text-slate-700">{issue.rootCause}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Resolution</p>
                          <p className="mt-1 text-sm leading-6 text-slate-700">{issue.resolution}</p>
                        </div>
                      </div>
                      <div className="mt-4 rounded-md border border-white bg-white p-4">
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Investigation path</p>
                        <ul className="mt-2 space-y-1">
                          {issue.investigation.map((item) => (
                            <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
                              <FileSearch className="mt-1 h-4 w-4 shrink-0 text-primary" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {issueEvidenceLabels(issue, caseItem.evidence).map((evidence) => (
                          <button
                            type="button"
                            key={evidence.step}
                            onClick={() => {
                              setLightboxIndex(caseItem.evidence.findIndex((item) => item.step === evidence.step));
                              setZoom(1);
                            }}
                            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-primary hover:text-primary"
                          >
                            STEP {String(evidence.step).padStart(2, "0")}
                          </button>
                        ))}
                      </div>
                      <p className="mt-4 rounded-md bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
                        <AlertTriangle className="mr-2 inline h-4 w-4" />
                        {issue.lesson}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <section id="evidence" className="scroll-mt-24 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader
                eyebrow="Evidence Gallery"
                title="Screenshots for this case only"
                copy="Evidence is grouped by implementation phase. No screenshots from unrelated cases are shown here."
                id="evidence-heading"
              />
              {caseItem.evidence.length > 0 ? (
                <div className="mt-6 space-y-8">
                  {evidenceGroups.map(({ group, items }) => (
                    <div key={group}>
                      <h3 className="mb-3 text-base font-bold text-slate-950">{group}</h3>
                      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {items.map((item) => {
                          const globalIndex = caseItem.evidence.findIndex((entry) => entry.step === item.step);
                          return (
                            <button
                              type="button"
                              key={item.filename}
                              data-case-evidence={caseItem.id}
                              data-evidence-step={item.step}
                              onClick={() => {
                                setLightboxIndex(globalIndex);
                                setZoom(1);
                              }}
                              className="group overflow-hidden rounded-lg border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:shadow-soft focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            >
                              <div className="flex aspect-[16/10] items-center justify-center bg-slate-100 p-2">
                                <img
                                  src={item.src}
                                  alt={item.alt}
                                  loading="lazy"
                                  decoding="async"
                                  className="h-full w-full object-contain object-center"
                                />
                              </div>
                              <div className="p-4">
                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                  <Badge variant="outline">STEP {String(item.step).padStart(2, "0")}</Badge>
                                  <Badge variant="outline">{item.transaction}</Badge>
                                </div>
                                <h4 className="text-sm font-bold leading-5 text-slate-950">{item.title}</h4>
                                <p className="mt-2 text-xs leading-5 text-slate-600">{item.whatItProves}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                  <Camera className="mx-auto mb-3 h-8 w-8 text-slate-400" />
                  <h3 className="font-bold text-slate-950">Evidence is summarized in Life OS</h3>
                  <p className="mx-auto mt-2 max-w-lg text-sm text-slate-600">
                    This case can use the same evidence model when screenshots are published to the website.
                  </p>
                </div>
              )}
            </section>

            <section id="validation" className="scroll-mt-24 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader
                eyebrow="Validation"
                title="Application and table-level proof"
                copy="Validation cards summarize the checks that support the case result without implying payment or clearing occurred."
                id="validation-heading"
              />
              <div className="mt-6 space-y-6">
                {validationGroups.map(({ group, items }) => (
                  <div key={group}>
                    <h3 className="mb-3 text-base font-bold text-slate-950">{group}</h3>
                    <div className="grid gap-3 md:grid-cols-2">
                      {items.map((item) => (
                        <div key={item.label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                          <div className="mb-2 flex items-center gap-2">
                            <Badge variant={item.status === "complete" ? "success" : item.status === "pending" ? "warning" : "secondary"}>
                              {item.status}
                            </Badge>
                            <h4 className="font-bold text-slate-950">{item.label}</h4>
                          </div>
                          <p className="text-sm leading-6 text-slate-600">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="lessons" className="scroll-mt-24 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <SectionHeader eyebrow="Lessons Learned" title="Reusable consulting takeaways" id="lessons-heading" />
                <ul className="mt-6 space-y-2">
                  {caseItem.lessons.map((lesson) => (
                    <li key={lesson} className="flex gap-2 text-sm leading-6 text-slate-700">
                      <BookOpenCheck className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      {lesson}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 shadow-sm">
                <SectionHeader eyebrow="Interview Talking Point" title="How to explain this work" id="interview-heading" />
                <p className="mt-6 text-sm leading-7 text-slate-700">{caseItem.interviewTalkingPoint}</p>
              </div>
            </section>

            <section id="related" className="scroll-mt-24 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader eyebrow="Related Cases" title="P2P dependency chain" id="related-heading" />
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {caseItem.relatedCases.map((related) => {
                  const target = Array.from(caseBySlug.values()).find((item) => item.id === related.id);
                  if (!related.available || !target) {
                    return (
                      <div key={related.id} className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-slate-500">
                        <div className="text-sm font-bold">{related.label}</div>
                        <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em]">Planned - route disabled</div>
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={related.id}
                      href={`/cases/${target.slug}`}
                      className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-primary hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-sm font-bold text-slate-950">{related.label}</div>
                          <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary">View case</div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-primary" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </div>

      <Dialog open={lightboxIndex !== null} onOpenChange={(open) => !open && setLightboxIndex(null)}>
        <DialogContent>
          {activeEvidence ? (
            <div className="min-w-0 overflow-hidden">
              <div className="border-b border-slate-200 bg-white px-5 py-4 pr-14">
                <DialogTitle className="text-base font-bold text-slate-950">
                  STEP {String(activeEvidence.step).padStart(2, "0")} - {activeEvidence.title}
                </DialogTitle>
                <DialogDescription className="mt-1 text-sm text-slate-600">
                  {activeEvidence.whatItProves}
                </DialogDescription>
              </div>
              <div className="flex items-center justify-between gap-3 border-b border-slate-800 bg-slate-950 px-4 py-3 text-white">
                <div className="text-xs font-semibold text-slate-300">
                  {lightboxIndex !== null ? lightboxIndex + 1 : 1} / {caseItem.evidence.length}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    disabled={zoom <= 1}
                    onClick={() => setZoom((value) => Math.max(value - 0.2, 1))}
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Zoom out</span>
                  </Button>
                  <Button type="button" variant="secondary" size="icon" onClick={() => setZoom(1)}>
                    <Maximize2 className="h-4 w-4" />
                    <span className="sr-only">Reset zoom</span>
                  </Button>
                  <Button type="button" variant="secondary" size="icon" onClick={() => setZoom((value) => Math.min(value + 0.2, 1.8))}>
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Zoom in</span>
                  </Button>
                  <Button type="button" variant="secondary" size="icon" onClick={() => setLightboxIndex(null)}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close gallery</span>
                  </Button>
                </div>
              </div>
              <div
                className={cn(
                  "relative h-[min(62vh,620px)] min-h-[320px] w-full min-w-0 bg-slate-950 p-4",
                  zoom > 1 ? "overflow-auto" : "overflow-hidden",
                )}
              >
                <div
                  className={cn(
                    "flex h-full w-full shrink-0",
                    zoom > 1 ? "items-start justify-start" : "items-center justify-center",
                  )}
                  style={zoom > 1 ? { width: `${zoom * 100}%`, height: `${zoom * 100}%` } : undefined}
                >
                  <img
                    src={activeEvidence.src}
                    alt={activeEvidence.alt}
                    className={cn(
                      "rounded-md bg-white",
                      zoom > 1 ? "h-auto max-w-none" : "max-h-full max-w-full object-contain",
                    )}
                    style={zoom > 1 ? { width: `${zoom * 100}%` } : undefined}
                  />
                </div>
                {caseItem.evidence.length > 1 ? (
                  <>
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="absolute left-5 top-1/2 -translate-y-1/2"
                      onClick={() => moveLightbox(-1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Previous screenshot</span>
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="absolute right-5 top-1/2 -translate-y-1/2"
                      onClick={() => moveLightbox(1)}
                    >
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">Next screenshot</span>
                    </Button>
                  </>
                ) : null}
              </div>
              <div className="flex min-w-0 max-w-full gap-2 overflow-x-auto border-t border-slate-200 bg-white p-3">
                {caseItem.evidence.map((item, index) => (
                  <button
                    key={item.filename}
                    type="button"
                    data-evidence-step={item.step}
                    onClick={() => {
                      setLightboxIndex(index);
                      setZoom(1);
                    }}
                    className={cn(
                      "h-14 w-24 shrink-0 overflow-hidden rounded border bg-slate-100",
                      index === lightboxIndex ? "border-primary ring-2 ring-primary/20" : "border-slate-200",
                    )}
                    aria-label={`Open ${item.title}`}
                  >
                    <img src={item.src} alt="" className="h-full w-full object-contain object-center p-1" />
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </article>
  );
}
