import { Guid } from "guid-ts";

export interface IProduct {
  id: Guid;
  name: string;
  brand: string;
  price: number;
  installment: number[];
  urlImg: string;
  sale: boolean;
  promotionalPrice?: number;
}
