import React from "react";
import { Input, Select, SelectItem, Spinner } from "@heroui/react";
import { CountryGrid } from "./country-grid";
import { useCountries } from "../hooks/use-countries";

export function CountriesExplorer() {
  const {
    filteredCountries,
    searchTerm,
    selectedRegion,
    loading,
    error,
    regions,
    setSearchTerm,
    setSelectedRegion
  } = useCountries();

  return (
    <section className="flex flex-col items-center gap-4 py-8 md:py-10 px-4 max-w-7xl mx-auto">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className="text-4xl font-bold tracking-tight">Explore Countries</h1>
        <p className="text-lg text-default-600 mt-4">
          Discover information about countries around the world
        </p>
      </div>

      <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between gap-4 mb-8">
        <Input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onValueChange={setSearchTerm}
          className="md:w-1/2"
          startContent={
            <span className="text-default-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>
          }
        />

        <Select
          placeholder="All Regions"
          selectedKeys={selectedRegion ? [selectedRegion] : []}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0]?.toString() || "";
            setSelectedRegion(selected);
          }}
          className="md:w-1/3"
        >
          <SelectItem key="" textValue="All Regions">
            All Regions
          </SelectItem>
          {regions.map((region) => (
            <SelectItem key={region} textValue={region}>
              {region}
            </SelectItem>
          ))}
        </Select>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" label="Loading countries..." />
        </div>
      )}

      {error && (
        <div className="text-center p-6 bg-danger-50 text-danger rounded-lg max-w-4xl">
          <p className="text-lg font-medium">Error loading countries</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && filteredCountries.length === 0 && (
        <div className="text-center mt-8 p-10 border border-dashed border-default-300 rounded-lg">
          <p className="text-xl text-default-500">
            No countries found matching your search criteria.
          </p>
        </div>
      )}

      {!loading && !error && filteredCountries.length > 0 && (
        <CountryGrid countries={filteredCountries} />
      )}
    </section>
  );
}