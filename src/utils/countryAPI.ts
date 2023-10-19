import axios, { AxiosResponse } from 'axios';

export type Country = {
  cca2: string;
  name: {
    common: string;
  };
};

export const fetchCountries = async (): Promise<Country[]> => {
  try {
    const response: AxiosResponse<Country[]> = await axios.get(
      'https://restcountries.com/v3.1/all'
    );
    const sortedCountries = response.data.sort((a, b) => {
      const nameA = a.name.common.toLowerCase();
      const nameB = b.name.common.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    return sortedCountries;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [] as Country[];
  }
};
