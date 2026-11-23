import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getVariantPrice } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { SwitchbackDevice } from "@/components/product/SwitchbackDevice";
import { VariantSelector } from "@/components/product/VariantSelector";
import { SectionNumber, SectionKicker } from "@/components/ui/SectionHeadings";
import { Button } from "@/components/ui/Button";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return notFound();

  const defaultColor = product.colors[0]?.id ?? "";
  const defaultEdition = product.editions[0]?.id ?? "";
  const priceCents = getVariantPrice(slug, defaultColor, defaultEdition);

  return (
    <>
      <section className="pt-20 pb-24">
        <div className="max-w-1024 mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-10">
              <SwitchbackDevice width={560} height={476} className="mx-auto" />
            </div>
            <div className="lg:col-span-5">
              <SectionNumber>Product</SectionNumber>
              <SectionKicker>Switchback</SectionKicker>
              <h1 className="text-3rem font-display tracking-tight mb-4">{product.name}</h1>
              <p className="text-[1.05rem] text-steel leading-relaxed mb-8 max-w-md">{product.tagline}</p>
              <p className="text-2.6rem font-display font-bold text-ink mb-8">{formatPrice(priceCents)}</p>

              <VariantSelector
                product={{ slug: product.slug, name: product.name, colors: product.colors, editions: product.editions, priceCents: product.priceCents }}
                defaultColor={defaultColor}
                defaultEdition={defaultEdition}
              />

              <div className="mt-10 pt-8 border-t border-line text-[0.85rem] font-mono text-steel space-y-2">
                <p>Free standard shipping</p>
                <p>30-day guarantee</p>
                <p>Ships within two weeks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-paper" id="details">
        <div className="section-inner">
          <SectionNumber>Details</SectionNumber>
          <SectionKicker>What’s inside</SectionKicker>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-display text-xl tracking-tight mb-4">How it works</h3>
              <p className="text-[0.925rem] text-steel leading-relaxed">{product.description}</p>
            </div>
            <div>
              <h3 className="font-display text-xl tracking-tight mb-4">Includes</h3>
              <ul className="text-[0.925rem] text-steel space-y-3 leading-relaxed list-disc pl-5">
                {product.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xl tracking-tight mb-4">Specifications</h3>
              <dl className="text-[0.925rem] text-steel space-y-3 leading-relaxed">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <dt className="font-mono text-xs uppercase tracking-wider text-steel">{k}</dt>
                    <dd className="text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="kit">
        <div className="section-inner">
          <SectionNumber>Complete</SectionNumber>
          <SectionKicker>The full kit</SectionKicker>
          <h2 className="text-2.6rem font-display tracking-tight mb-10">Pair it with</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {["treat-refill", "field-case"].map((s) => {
              const p = getProduct(s);
              if (!p) return null;
              return (
                <article key={s} className="rounded-3xl border border-line bg-paper p-8 hover:border-ember transition-colors">
                  <h3 className="font-display text-lg tracking-tight mb-2">{p.name}</h3>
                  <p className="text-[0.9rem] text-steel leading-relaxed mb-5">{p.tagline}</p>
                  <p className="text-xl font-display font-bold text-ink mb-6">{formatPrice(p.priceCents)}</p>
                  <Link href={`/product/${p.slug}`}>
                    <Button variant="outline" size="sm">View</Button>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
