import { CurrencyConverter } from "@/components/CurrencyConverter";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Valutaomregner</h1>
        <CurrencyConverter />
        <p className="text-xs text-muted-foreground text-center mt-4">
          Valutakurser leveres af exchangerate-api.com
        </p>
      </div>
    </div>
  );
};

export default Index;