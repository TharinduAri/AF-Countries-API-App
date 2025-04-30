import React from "react";
import { Button } from "@heroui/react";
import { formatPopulation } from "../services/countryService";

export function CountryCard({ country }) {
  // Get card size based on population
  const getCardSize = (population) => {
    if (population > 100000000) return "col-span-1 md:col-span-2 h-96";
    if (population > 50000000) return "col-span-1 lg:col-span-1 h-80";
    return "col-span-1 h-72";
  };

  return (
    <div
      className={`${getCardSize(
        country.population
      )} group bg-content1 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all relative`}
    >
      <div className="absolute z-10 top-0 left-0 right-0 bg-black/40 p-4 text-white">
        <p className="text-xs uppercase font-bold text-white/60">
          {country.region}
        </p>
        <h3 className="text-xl font-bold">{country.name.common}</h3>
      </div>

      <div className="h-full w-full overflow-hidden">
        <img
          src={country.flags.svg || country.flags.png}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-4 text-white border-t border-white/20 flex justify-between items-center">
        <div>
          <p className="text-sm">
            <span className="font-semibold">Population:</span>{" "}
            {formatPopulation(country.population)}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Capital:</span>{" "}
            {country.capital ? country.capital.join(", ") : "N/A"}
          </p>
        </div>
        <Button color="secondary" variant="shadow" size="sm" radius="full">
          Travel
        </Button>
      </div>
    </div>
  );
}