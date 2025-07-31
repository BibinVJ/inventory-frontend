import { Category } from "./Category";
import { Unit } from "./Unit";

export interface Item {
  id: number;
  name: string;
  description: string;
  category: Category;
  unit: Unit;
  is_active: boolean;
}

export interface ItemApiResponse {
  results: Item[];
  count: number;
}
