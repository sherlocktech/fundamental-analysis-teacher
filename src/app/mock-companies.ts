import { Company } from './company';

export const COMPANIES: Company[] = [
  {
    name: 'Apple, Inc.',
    ticker: 'AAPL',
    stock:
      {
        currentPrice: 100,
        priceHistory:
        {
          dates: [Date.now()],
          prices: [100]
        }
      },
    fundamentals:
      {
        curRatio: 1.11,
        quickRatio: 1.8,
        profitMargin: 0.23
      }
  }
];
