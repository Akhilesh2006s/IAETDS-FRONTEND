import { MarketingNav } from "@/components/marketing/nav";
import { MarketingFooter } from "@/components/marketing/footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mkt-root min-h-screen">
      <MarketingNav />
      <main>{children}</main>
      <MarketingFooter />
    </div>
  );
}
