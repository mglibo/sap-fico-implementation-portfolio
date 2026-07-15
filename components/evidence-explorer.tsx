import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Clock3,
  Command,
  FileSearch,
  Layers3,
  Lock,
  Route,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PortfolioCase, ProcessRoadmapItem } from "@/lib/cases";
import { cases, processRoadmap } from "@/lib/cases";
import { cn } from "@/lib/utils";

function statusVariant(toneOrStatus: PortfolioCase["statusTone"] | ProcessRoadmapItem["status"]) {
  if (toneOrStatus === "success" || toneOrStatus === "complete") return "success";
  if (toneOrStatus === "warning" || toneOrStatus === "validation-pending") return "warning";
  return "secondary";
}

function CaseCard({ item }: { item: PortfolioCase }) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-lg border bg-white p-5 shadow-sm",
        item.routeEnabled ? "border-slate-200" : "border-dashed border-slate-300 bg-slate-50",
      )}
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge variant={statusVariant(item.statusTone)}>{item.statusLabel}</Badge>
        <Badge variant="outline">{item.process}</Badge>
        <Badge variant="outline">{item.module}</Badge>
      </div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
        {item.id.toUpperCase()}
      </p>
      <h3 className="mt-2 text-xl font-bold leading-7 text-slate-950">{item.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{item.shortObjective}</p>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-md bg-slate-50 p-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
            <Camera className="h-3.5 w-3.5" />
            Evidence
          </div>
          <div className="mt-1 text-lg font-bold text-slate-950">{item.evidence.length}</div>
        </div>
        <div className="rounded-md bg-slate-50 p-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
            <Command className="h-3.5 w-3.5" />
            T-codes
          </div>
          <div className="mt-1 text-lg font-bold text-slate-950">{item.transactions.length}</div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {item.transactions.slice(0, 5).map((transaction) => (
          <Badge key={transaction} variant="outline">
            {transaction}
          </Badge>
        ))}
        {item.transactions.length > 5 ? <Badge variant="outline">+{item.transactions.length - 5}</Badge> : null}
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        {item.routeEnabled ? (
          <Button asChild className="w-full">
            <Link href={`/cases/${item.slug}`}>
              View Case
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button type="button" disabled className="w-full">
            Planned
            <Lock className="h-4 w-4" />
          </Button>
        )}
      </div>
    </article>
  );
}

function RoadmapNode({ item, index }: { item: ProcessRoadmapItem; index: number }) {
  const content = (
    <div
      className={cn(
        "h-full rounded-lg border p-4 transition",
        item.routeEnabled
          ? "border-slate-200 bg-white hover:border-primary hover:shadow-soft"
          : "border-dashed border-slate-300 bg-slate-50 text-slate-500",
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-950 text-sm font-bold text-white">
          {index + 1}
        </span>
        <Badge variant={statusVariant(item.status)}>{item.statusLabel}</Badge>
      </div>
      <h3 className="text-sm font-bold leading-5 text-slate-950">{item.label}</h3>
      <p className="mt-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
        {item.routeEnabled ? <Route className="h-3.5 w-3.5" /> : <Clock3 className="h-3.5 w-3.5" />}
        {item.routeEnabled ? "Open case" : "Future case"}
      </p>
    </div>
  );

  if (!item.routeEnabled || !item.slug) {
    return content;
  }

  return (
    <Link href={`/cases/${item.slug}`} className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
      {content}
    </Link>
  );
}

export function EvidenceExplorer() {
  const implemented = cases.filter((item) => item.status !== "planned");
  const evidenceCount = cases.reduce((sum, item) => sum + item.evidence.length, 0);
  const issueCount = cases.reduce((sum, item) => sum + item.productionIssues.length, 0);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <CheckCircle2 className="mb-4 h-5 w-5 text-emerald-600" />
          <div className="text-2xl font-bold text-slate-950">{implemented.length}</div>
          <div className="text-sm font-semibold text-slate-500">Implemented cases</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <Camera className="mb-4 h-5 w-5 text-primary" />
          <div className="text-2xl font-bold text-slate-950">{evidenceCount}</div>
          <div className="text-sm font-semibold text-slate-500">Published screenshots</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <FileSearch className="mb-4 h-5 w-5 text-amber-600" />
          <div className="text-2xl font-bold text-slate-950">{issueCount}</div>
          <div className="text-sm font-semibold text-slate-500">Production issues solved</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <Layers3 className="mb-4 h-5 w-5 text-cyan-700" />
          <div className="text-2xl font-bold text-slate-950">Data-driven</div>
          <div className="text-sm font-semibold text-slate-500">Reusable case template</div>
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-950">P2P roadmap</h3>
            <p className="text-sm text-slate-600">
              Planned future cases are visible but disabled until evidence-backed routes exist.
            </p>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-5">
          {processRoadmap.map((item, index) => (
            <RoadmapNode key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>

      <div>
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-950">Choose a case</h3>
          <p className="text-sm text-slate-600">
            Each case opens its own detail page. The evidence gallery on that page shows only screenshots for that case.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {cases.map((item) => (
            <CaseCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

