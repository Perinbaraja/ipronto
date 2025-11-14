"use client";

import Select from "react-select";
import { useCurrencyRates } from "@/hooks/useCurrencyRates";
import { CurrencyRatesResponse } from "@/types/currency-rates";

const CurrencyRatesDropDown = () => {
  const { currencyRates, error } = useCurrencyRates();

  const options =
    currencyRates?.map((rate: CurrencyRatesResponse) => ({
      value: rate.cur_key,
      label: `${rate.cur_name} - ${rate.cur_value}`,
    })) || [];

  return (
    <Select
      options={options}
      placeholder="USD"
      isSearchable
      menuPlacement="top"
      styles={{
        control: (base) => ({
          ...base,
          background: "#0b1525",
          borderColor: "#2f3b4d",
          color: "white",
          padding: "3px",
          border: "1px solid #ccc",
          outline: "none",
          width: "250px",
          height: "40px",
        }),
        singleValue: (base) => ({
          ...base,
          color: "white",
        }),
        menu: (base) => ({
          ...base,
          background: "#fff",
          width: "250px",
          zIndex: 9999,
        }),
      }}
    />
  );
};

export default CurrencyRatesDropDown;
