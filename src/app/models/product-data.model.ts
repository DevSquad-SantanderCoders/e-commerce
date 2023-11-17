export interface IProduct {
  name: string;
  brand: string;
  id: string;
  price: number;
  installment: number[];
  urlImg: string;
  sale: boolean;
  promotionalPrice?: number;
}
