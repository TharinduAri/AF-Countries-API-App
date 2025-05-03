// services/geminiService.js

/**
 * Calls the Google Gemini API with country context and user message
 * @param {string} userMessage - The message from the user
 * @param {object} countryContext - The country information to provide context
 * @returns {Promise<string>} - The response from Gemini API
 */
export const callGeminiAPI = async (userMessage, countryContext) => {
    try {
      const API_KEY = "AIzaSyCk7xfHn8Y_ES1uwDMidxn_SipiORE-5Ac";
      const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
      
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are a helpful assistant that provides information about ${countryContext.name}. 
                  Use the following country information as context for your responses:
                  - Official Name: ${countryContext.officialName}
                  - Capital: ${countryContext.capital}
                  - Region: ${countryContext.region}
                  - Subregion: ${countryContext.subregion}
                  - Population: ${countryContext.population}
                  - Languages: ${countryContext.languages}
                  - Currencies: ${countryContext.currencies}
                  - Borders: ${countryContext.borders}
                  - Timezones: ${countryContext.timezones}
                  - Continents: ${countryContext.continents}
                  
                  User Query: ${userMessage}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        }),
      });
      
      const data = await response.json();
      
      // Extract response text from Gemini API response
      if (data.candidates && data.candidates[0].content.parts && data.candidates[0].content.parts[0].text) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error("Unexpected API response format");
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  };
  
  /**
   * Prepares country data for the Gemini API
   * @param {object} country - The country object
   * @returns {object} - Formatted country context
   */
  export const prepareCountryContext = (country) => {
    return {
      name: country.name.common,
      officialName: country.name.official,
      capital: country.capital ? country.capital.join(", ") : "N/A",
      region: country.region,
      subregion: country.subregion || "N/A",
      population: country.population,
      languages: country.languages ? Object.values(country.languages).join(", ") : "N/A",
      currencies: country.currencies ? Object.keys(country.currencies).map(key => `${country.currencies[key].name} (${key})`).join(", ") : "N/A",
      borders: country.borders ? country.borders.join(", ") : "N/A",
      timezones: country.timezones ? country.timezones.join(", ") : "N/A",
      continents: country.continents ? country.continents.join(", ") : "N/A",
    };
  };