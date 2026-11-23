import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="section max-w-lg">
      <div className="section-inner text-center">
        <h1 className="font-display text-4rem tracking-tight mb-4">404</h1>
        <p className="text-steel mb-10">Page not found. The path you followed may be broken, or the page may have been removed.</p>
        <Link href="/">
          <Button variant="primary" size="lg" className="flex items-center justify-center gap-2 mx-auto">
            <Home size={18} strokeWidth={2} /> Back to Home
          </Button>
        </Link>
      </div>
    </section>
  );
}