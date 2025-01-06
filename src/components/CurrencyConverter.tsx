import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { ArrowUpDown, Copy } from 'lucide-react';
import { formatCurrency, convertCurrency } from '@/utils/currency';
import { useQuery } from '@tanstack/react-query';

type Currency = 'JPY' | 'DKK';

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<Currency>('JPY');
  const [toCurrency, setToCurrency] = useState<Currency>('DKK');
  const { toast } = useToast();

  const { data: convertedAmount, isLoading } = useQuery({
    queryKey: ['convert', amount, fromCurrency, toCurrency],
    queryFn: async () => {
      if (!amount || isNaN(Number(amount))) return 0;
      return convertCurrency(Number(amount), fromCurrency, toCurrency);
    },
    enabled: Boolean(amount && !isNaN(Number(amount))),
  });

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleCopy = () => {
    if (convertedAmount) {
      navigator.clipboard.writeText(formatCurrency(convertedAmount, toCurrency));
      toast({
        title: "Copied to clipboard",
        description: "The converted amount has been copied to your clipboard.",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6 space-y-6 animate-fade">
      <div className="space-y-2">
        <label className="text-sm font-medium">Amount</label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="font-mono text-lg"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium">From</p>
          <p className="font-mono text-lg">{fromCurrency}</p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleSwapCurrencies}
          className="mx-2"
        >
          <ArrowUpDown className="h-4 w-4" />
        </Button>

        <div className="space-y-2">
          <p className="text-sm font-medium">To</p>
          <p className="font-mono text-lg">{toCurrency}</p>
        </div>
      </div>

      <div className="pt-4 border-t">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Converted Amount</p>
            <p className="font-mono text-2xl font-semibold animate-slide-up">
              {isLoading ? "..." : formatCurrency(convertedAmount || 0, toCurrency)}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            disabled={!convertedAmount}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};