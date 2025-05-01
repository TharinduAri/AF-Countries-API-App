import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { title, subtitle } from "../components/premitives";
import DefaultLayout from "../layouts/default";
import { fetchCountryByCode, formatPopulation } from "../services/countryService";

export default function CountryPage() {
  const { id } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getCountryData = async () => {
      try {
        setLoading(true);
        if (id) {
          const data = await fetchCountryByCode(id);
          setCountry(data);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to load country data");
      } finally {
        setLoading(false);
      }
    };

    getCountryData();
  }, [id]);

  if (loading) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DefaultLayout>
    );
  }

  if (error || !country) {
    return (
      <DefaultLayout>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className={title()}>Error</h1>
          <p className={subtitle()}>
            {error || "Country not found"}
          </p>
          <button 
            onClick={() => window.history.back()}
            className="mt-6 px-4 py-2 bg-primary text-white rounded-md"
          >
            Go Back
          </button>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <button 
            onClick={() => window.history.back()}
            className="mb-4 px-4 py-2 bg-primary text-white rounded-md"
          >
            ← Back to Countries
          </button>
          
          <h1 className={title()}>{country.name.common}</h1>
          <p className={subtitle()}>{country.name.official}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src={country.flags.svg || country.flags.png} 
              alt={`Flag of ${country.name.common}`}
              className="w-full h-auto"
            />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Country Details</h2>
            
            <div className="space-y-3">
              <div>
                <span className="font-semibold">Capital:</span> {country.capital ? country.capital.join(", ") : "N/A"}
              </div>
              <div>
                <span className="font-semibold">Region:</span> {country.region}
              </div>
              <div>
                <span className="font-semibold">Population:</span> {formatPopulation(country.population)}
              </div>

              <div>
                <span className="font-semibold">Languages:</span> {country.languages ? Object.values(country.languages).join(", ") : "N/A"}
              </div>
            </div>
          </div>
        </div>

        {/* Additional sections can be added here */}
      </div>
    </DefaultLayout>
  );
}