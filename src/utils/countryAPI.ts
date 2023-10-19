// Import Axios and destructure AxiosResponse to make HTTP requests
import axios, { AxiosResponse } from 'axios';

// Define a type 'Country' to represent the country object
export type Country = {
  cca2: string;
  name: {
    common: string;
  };
};

// Define an asynchronous function to fetch a list of countries
export const fetchCountries = async (): Promise<Country[]> => {
  try {
    const response: AxiosResponse<Country[]> = await axios.get(
      'https://restcountries.com/v3.1/all'
    );
    // Sort country data alphabetically by common name
    const sortedCountries = response.data.sort((a, b) => {
      const nameA = a.name.common.toLowerCase();
      const nameB = b.name.common.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    // Return the sorted array of countries
    return sortedCountries;
  } catch (error) {
    // If there's an error, log it and return an empty array
    console.error('Error fetching countries:', error);
    return [] as Country[];
  }
};
