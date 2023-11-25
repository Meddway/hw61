import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './CountryList.css';
import { Country } from '../../Country';

const allCountriesInfo = 'https://restcountries.com/v3.1/all';

interface Props {
  countrySelect: (country: Country | null) => void;
}

const CountryList: React.FC<Props> = ({ countrySelect }) => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Country[]>(allCountriesInfo);
        if (response.status >= 200 && response.status < 300) {
          setCountries(response.data);
        } else {
          console.error('Error. Status: ', response.status);
        }
      } catch (error) {
        console.error('Error fetching list of countries:', error);
      }
    };

    void fetchData();
  }, []);

  const clickShowDataCountry = (choiceCountry: Country | null) => {
    countrySelect(choiceCountry);
  };

  return (
    <div className="countryList">
      <h2>Список стран:</h2>
      {countries.map((country) => (
        <div className="countryName"
          key={country.name.common}
          onClick={() => clickShowDataCountry(country)}
        >
          {country.name.common}
        </div>
      ))}
    </div>
  );
};

export default CountryList;
