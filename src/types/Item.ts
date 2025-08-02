import { Category } from "./Category";
import { Unit } from "./Unit";

export interface Item {
  id: number;
  sku: string;
  name: string;
  description: string;
  category: Category;
  unit: Unit;
  type: string;
  is_active: boolean;
}

export interface ItemApiResponse {
  data: Item[];
  last_page: number;
  current_page: number;
  from: number;
  to: number;
  total: number;
}

export interface StockAlert {
    id: number;
    name: string;
    sku: string;
    stock_on_hand: number;
    reorder_level: number;
}
