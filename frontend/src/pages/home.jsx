import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Input } from "@heroui/input";
import { button as buttonStyles } from "@heroui/theme";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@heroui/react";
import { title, subtitle } from "../components/premitives";
import DefaultLayout from "../layouts/default";
import { 
  fetchAllCountries, 
  fetchCountryByName, 
  fetchCountriesByRegion, 
  fetchCountryByCode,
  formatPopulation 
} from "../services/countryService";

export default function HomePage() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  // Fetch countries based on current filters
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        setError(""); // Clear any previous errors
        let data;

        // If a region is selected
        if (selectedRegion) {
          console.log(`📡 API Call: Fetching countries by region "${selectedRegion}"`);
          data = await fetchCountriesByRegion(selectedRegion);
          console.log(`✅ API Success: Received ${data.length} countries for region "${selectedRegion}"`);
        } 
        // If search term is entered
        else if (searchTerm.trim().length > 0) {
          console.log(`📡 API Call: Searching for countries with name "${searchTerm}"`);
          try {
            data = await fetchCountryByName(searchTerm);
            console.log(`✅ API Success: Found ${data.length} countries matching "${searchTerm}"`);
          } catch (searchError) {
            console.log(`ℹ️ No results found for "${searchTerm}" - showing all countries instead`);
            // If search fails, fall back to showing all countries
            data = await fetchAllCountries();
            console.log(`✅ API Success: Falling back to all ${data.length} countries`);
            // Set a notification message
            setError(`No countries found matching "${searchTerm}". Showing all countries instead.`);
          }
        } 
        // Default: fetch all countries
        else {
          console.log('📡 API Call: Fetching all countries');
          data = await fetchAllCountries();
          console.log(`✅ API Success: Received ${data.length} countries`);
        }

        // Always update the countries state with the data we received
        setCountries(data);
      } catch (error) {
        console.error('❌ API Error:', error);
        setError(error instanceof Error ? error.message : "An unknown error occurred");
        // Only clear countries if we have a critical error
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    // Add debounce for search term to avoid too many API calls
    const debounceTimeout = setTimeout(() => {
      fetchCountries();
    }, searchTerm ? 500 : 0); // Apply delay only when searching

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, selectedRegion]);

  // Get card size based on population
  const getCardSize = (population) => {
    if (population > 100000000) return "col-span-1 md:col-span-2 h-96";
    if (population > 50000000) return "col-span-1 lg:col-span-1 h-80";
    return "col-span-1 h-72";
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Clear region selection when searching
    if (e.target.value.trim()) {
      setSelectedRegion("");
    }
  };

  // Handle region selection
  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
    // Clear search term when selecting a region
    setSearchTerm("");
  };

  // Handle Travel click
  const handleTravelClick = (country) => {
    navigate(`/country/${country.cca3}`);
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
        
        {error && (
          <div className="w-full max-w-4xl mx-auto p-4 mb-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <p className="text-center text-amber-800 dark:text-amber-200">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="max-w-6xl gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-min">
            {countries.map((country) => (
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
                    onClick={() => handleTravelClick(country)}
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

        {!loading && !error && countries.length === 0 && (
          <div className="text-center mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
            <p className="text-lg font-medium">No countries found matching your search criteria.</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Try a different search term or select a region from the dropdown.
            </p>
          </div>
        )}
      </section>
    </DefaultLayout>
  );
}