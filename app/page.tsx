import { Hero } from "@/components/home/Hero";
import { Mechanisms } from "@/components/home/Mechanisms";
import { Progression } from "@/components/home/Progression";
import { Specs } from "@/components/home/Specs";
import { Testimonials } from "@/components/home/Testimonials";
import { BuyCTA } from "@/components/home/BuyCTA";
import { FAQ } from "@/components/home/FAQ";
import { PuzzleDemo } from "@/components/product/PuzzleDemo";
import { getProduct } from "@/lib/products";

export default function Home() {
  const product = getProduct("switchback");
  return (
    <>
      <Hero />
      <PuzzleDemo />
      <Mechanisms mechanisms={product.mechanisms} />
      <Progression />
      <Specs specs={product.specs} />
      <Testimonials />
      <BuyCTA />
      <FAQ />
    </>
  );
}
