export interface IProduct {
  id: number;
  name: string;
  brand: string;
  id: string;
  price: number;
  installment: number[];
  urlImg: string;
  sale: boolean;
  promotionalPrice?: number;
}
