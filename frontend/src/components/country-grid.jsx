import React from "react";
import { CountryCard } from "./country-card";

export function CountryGrid({ countries }) {
  return (
    <div className="w-full max-w-6xl gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-min">
      {countries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  );
}