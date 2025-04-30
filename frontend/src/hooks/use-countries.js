import React from "react";
import { fetchAllCountries } from "../services/countryService";

export function useCountries() {
  const [countries, setCountries] = React.useState([]);
  const [filteredCountries, setFilteredCountries] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedRegion, setSelectedRegion] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  // Fetch all countries on component mount
  React.useEffect(() => {
    const getCountries = async () => {
      try {
        setLoading(true);
        const data = await fetchAllCountries();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    getCountries();
  }, []);

  // Filter countries based on search term and selected region
  React.useEffect(() => {
    let result = countries;

    if (searchTerm) {
      result = result.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedRegion) {
      result = result.filter((country) => country.region === selectedRegion);
    }

    setFilteredCountries(result);
  }, [searchTerm, selectedRegion, countries]);

  return {
    countries,
    filteredCountries,
    searchTerm,
    selectedRegion,
    loading,
    error,
    regions,
    setSearchTerm,
    setSelectedRegion
  };
}