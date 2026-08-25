import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageView } from "@/components/seo/service-page-view";
import { buildPageMetadata } from "@/lib/seo";
import { getServicePage, servicePages } from "@/lib/service-pages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};

  return buildPageMetadata({
    title: page.title,
    description: page.description,
    slug: page.slug,
    keywords: [...page.keywords],
  });
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  return <ServicePageView page={page} />;
}
