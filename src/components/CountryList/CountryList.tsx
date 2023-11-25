import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './CountryList.css';

const allCountriesInfo = 'https://restcountries.com/v3.1/all';

interface Props {
  name: string,
  common: string
}

const CountryList: React.FC<Props> = () => {
  const [countries, setCountries] = useState<Props[]>([]);

  useEffect(() => {
    const data = async () => {
      const response = await axios.get(allCountriesInfo);
      if (response.status >= 200 && response.status < 300) {

        setCountries(response.data);
      } else {
        console.error('Error. Status: ', response.status);
      }
    };

    void data();
  }, []);

  return (
    <div className="countryList">
      <p>Список стран:</p>
      {countries.map((country) => (
        <div className="countryName"
             key={country.name.common}
        >
          {country.name.common}
        </div>
      ))}
    </div>
  );
};

export default CountryList;