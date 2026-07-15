import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseDetail } from "@/components/case-detail";
import { availableCases, caseBySlug } from "@/lib/cases";

export function generateStaticParams() {
  return availableCases.map((caseItem) => ({ slug: caseItem.slug }));
}

type CasePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseItem = caseBySlug.get(slug);

  if (!caseItem) {
    return {
      title: "Case not found",
    };
  }

  return {
    title: `${caseItem.title} | SAP ECC FI/CO Portfolio`,
    description: caseItem.shortObjective,
  };
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const caseItem = caseBySlug.get(slug);

  if (!caseItem || !caseItem.routeEnabled) {
    notFound();
  }

  return <CaseDetail caseItem={caseItem} />;
}
