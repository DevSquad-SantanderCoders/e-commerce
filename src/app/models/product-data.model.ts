export interface IProduct {
  id: number;
  name: string;
  brand: string;
  code: string;
  price: number;
  installment: number[];
  urlImg: string;
  sale: boolean;
  promotionalPrice?: number;
}
