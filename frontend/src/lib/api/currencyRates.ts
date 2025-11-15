import { apiClient } from "./client";
import { CurrencyRatesResponse } from "@/types/currency-rates";

// export const fetchCurrencyRates = (): Promise<CurrencyRatesResponse[]> => {
//   return apiClient<CurrencyRatesResponse[]>("/get-currency.json");
// };


export const fetchCurrencyRates = (): Promise<CurrencyRatesResponse[]> => {
  const res = fetch("/get-currency.json");
  return res.then((response) => response.json());
}