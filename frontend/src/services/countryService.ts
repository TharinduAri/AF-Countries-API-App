// src/services/countryService.ts

export interface Country {
  name: {
    common: string;
    official: string;
  };
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  capital: string[];
  region: string;
  population: number;
  cca3: string;
  languages: { [key: string]: string };
}

const BASE_URL = "https://restcountries.com/v3.1";

export async function fetchAllCountries(): Promise<Country[]> {
  try {
    const response = await fetch(`${BASE_URL}/all`);
    if (!response.ok) throw new Error("Failed to fetch countries");
    const data: Country[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw new Error("Failed to load countries. Please try again later.");
  }
}

export async function fetchCountryByName(name: string): Promise<Country[]> {
  try {
    const response = await fetch(`${BASE_URL}/name/${name}`);
    if (!response.ok) throw new Error("Failed to fetch country by name");
    const data: Country[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching country by name:", error);
    throw new Error("Country not found. Please check the name and try again.");
  }
}

export async function fetchCountriesByRegion(region: string): Promise<Country[]> {
  try {
    const response = await fetch(`${BASE_URL}/region/${region}`);
    if (!response.ok) throw new Error("Failed to fetch countries by region");
    const data: Country[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching countries by region:", error);
    throw new Error("Failed to load countries by region. Try again.");
  }
}

export async function fetchCountryByCode(code: string): Promise<Country> {
  try {
    const response = await fetch(`${BASE_URL}/alpha/${code}`);
    if (!response.ok) throw new Error("Failed to fetch country by code");
    const data: Country[] = await response.json();
    return data[0]; // API returns an array with a single country
  } catch (error) {
    console.error("Error fetching country by code:", error);
    throw new Error("Failed to load country details.");
  }
}

export function formatPopulation(population: number): string {
  return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
