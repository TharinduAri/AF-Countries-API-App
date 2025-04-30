// src/services/countryService.js

const BASE_URL = "https://restcountries.com/v3.1";

export async function fetchAllCountries() {
  try {
    const response = await fetch(`${BASE_URL}/all`);
    if (!response.ok) throw new Error("Failed to fetch countries");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw new Error("Failed to load countries. Please try again later.");
  }
}

export async function fetchCountryByName(name) {
  try {
    const response = await fetch(`${BASE_URL}/name/${name}`);
    if (!response.ok) throw new Error("Failed to fetch country by name");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching country by name:", error);
    throw new Error("Country not found. Please check the name and try again.");
  }
}

export async function fetchCountriesByRegion(region) {
  try {
    const response = await fetch(`${BASE_URL}/region/${region}`);
    if (!response.ok) throw new Error("Failed to fetch countries by region");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching countries by region:", error);
    throw new Error("Failed to load countries by region. Try again.");
  }
}

export async function fetchCountryByCode(code) {
  try {
    const response = await fetch(`${BASE_URL}/alpha/${code}`);
    if (!response.ok) throw new Error("Failed to fetch country by code");
    const data = await response.json();
    return data[0]; // API returns an array with a single country
  } catch (error) {
    console.error("Error fetching country by code:", error);
    throw new Error("Failed to load country details.");
  }
}

export function formatPopulation(population) {
  return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}