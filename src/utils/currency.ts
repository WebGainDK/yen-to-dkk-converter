export const formatCurrency = (amount: number, currency: 'JPY' | 'DKK'): string => {
  const formatter = new Intl.NumberFormat(currency === 'JPY' ? 'ja-JP' : 'da-DK', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: currency === 'JPY' ? 0 : 2,
    maximumFractionDigits: currency === 'JPY' ? 0 : 2,
  });
  return formatter.format(amount);
};

export const convertCurrency = async (
  amount: number,
  from: 'JPY' | 'DKK',
  to: 'JPY' | 'DKK'
): Promise<number> => {
  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${from}`
    );
    const data = await response.json();
    const rate = data.rates[to];
    return amount * rate;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return 0;
  }
};