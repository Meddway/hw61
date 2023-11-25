import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Country} from '../../Country';
import './CountryInfo.css';

interface Props {
  country: Country | null;
}

const CountryInfo: React.FC<Props> = ({country}) => {
  const [borderingCountries, setBorderingCountries] = useState<{ name: string; flag: string }[]>([]);

  useEffect(() => {
    const fetchBorderingCountries = async () => {
      if (country && country.borders && country.borders.length > 0) {
        try {
          const dataBorderingCountries = await Promise.all(
            country.borders.map(async (border) => {
              const response = await axios.get(`https://restcountries.com/v3.1/alpha/${border}`);
              const flag = response.data[0]?.flags?.svg || '';
              return {name: response.data[0]?.name?.common || border, flag};
            })
          );
          setBorderingCountries(dataBorderingCountries);
        } catch (error) {
          console.error('Error fetching bordering countries:', error);
        }
      }
    };
    void fetchBorderingCountries();

  }, [country]);

  if (!country) {
    return <h2 className="countryInfo">Выберите страну</h2>;
  }

  console.log('Received country data:', country);

  return (
    <div className="countryInfo">
      <h2><strong>Страна: </strong>{country.name.common}</h2>
      <p><strong>Столица: </strong>{country.capital}</p>
      <p><strong>Население: </strong>{country.population} человек</p>
      <p><strong>Местная валюта:</strong></p>
      <p><strong>Регион: </strong>{country.region} </p>
      <div>
        <strong>Граничит с:</strong>
        <ul>
          {borderingCountries.map(({name, flag}, index) => (
            <li key={index}>
              <img src={flag} alt={`Flag of ${name}`} style={{maxWidth: '24px', marginRight: '4px'}}/>
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CountryInfo;