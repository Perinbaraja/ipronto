"use client";
import { fetchCurrencyRates } from "@/lib/api";
import { CurrencyRatesResponse } from "@/types/currency-rates";
import useSWR from "swr";



export const useCurrencyRates = () => {
    const {data, error,mutate} = useSWR<CurrencyRatesResponse[]>(
        'currency-rates',
        fetchCurrencyRates,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    return {currencyRates:data, error,mutate};
}