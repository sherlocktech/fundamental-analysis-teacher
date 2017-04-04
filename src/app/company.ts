import { Stock }        from './stock';
import { Fundamentals } from './fundamentals';

export class Company {
  ticker: string;
  name: string;
  stock: Stock;
  fundamentals: Fundamentals;
}
