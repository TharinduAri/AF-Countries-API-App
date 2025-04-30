import { useState, useEffect } from "react";
import { Input } from "@heroui/input";
import { button as buttonStyles } from "@heroui/theme";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Country, fetchAllCountries, formatPopulation } from "@/services/countryService";

export default function HomePage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  // Fetch all countries on component mount
  useEffect(() => {
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
  useEffect(() => {
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

  // Get card size based on population
  const getCardSize = (population: number) => {
    if (population > 100000000) return "col-span-1 md:col-span-2 h-96";
    if (population > 50000000) return "col-span-1 lg:col-span-1 h-80";
    return "col-span-1 h-72";
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle region selection
  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center gap-4 py-8 md:py-10 px-4">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Explore Countries</span>
          <div className={subtitle({ class: "mt-4" })}>
            Discover information about countries around the world
          </div>
        </div>

        <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between gap-4 mb-8">
          <Input
            type="text"
            placeholder="Search for a country..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="md:w-1/2"
          />

          <div className="md:w-1/3">
            <select 
              value={selectedRegion}
              onChange={handleRegionChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">All Regions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
        </div>

        {loading && (
          <div className="text-center">
            <svg className="animate-spin h-10 w-10 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
        
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="max-w-6xl gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-min">
            {filteredCountries.map((country) => (
              <div
                key={country.cca3}
                className={`${getCardSize(country.population)} group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all relative`}
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
                  <button
                    className={`${buttonStyles({
                      color: "secondary",
                      variant: "shadow",
                    })} px-4 py-1 rounded-full text-sm`}
                  >
                    Travel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && filteredCountries.length === 0 && (
          <p className="text-center mt-8">
            No countries found matching your search criteria.
          </p>
        )}
      </section>
    </DefaultLayout>
  );
}