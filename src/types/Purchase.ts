import { Item } from "./Item";
import { Vendor } from "./Vendor";

export interface PurchaseItemDetail {
    id: number;
    item: Item;
    description: string;
    batch: {
        batch_number: string;
        expiry_date: string;
        manufacture_date: string;
    };
    quantity: number;
    unit_cost: number;
    total_cost: number;
}

export interface Purchase {
  id: number;
  invoice_number: string;
  vendor: Vendor;
  purchase_date: string;
  total_amount: number;
  status: string;
  payment_status: string;
  is_active: boolean;
  items: PurchaseItemDetail[];
}

export interface PurchaseApiResponse {
  data: Purchase[];
  last_page: number;
  current_page: number;
  from: number;
  to: number;
  total: number;
}

export interface PurchasePayload {
  vendor_id: string;
  invoice_number: string;
  purchase_date: string;
  items: {
    item_id: string;
    quantity: number;
    unit_price: number;
  }[];
}
