import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Country } from '../../Country';
import './CountryInfo.css';
import CurrentCountryFlag from './CurrentCountryFlag';

interface Props {
  country: Country | null;
}

const CountryInfo: React.FC<Props> = ({ country }) => {
  const [borderingCountries, setBorderingCountries] = useState<{ name: string; flag: string }[]>([]);
  const [currencies, setCurrencies] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (country && country.borders) {
        try {
          const currenciesData = country?.currencies || {};
          const currenciesNames = Object.values(currenciesData).map((currency) => currency.name || 'Unknown');
          setCurrencies(currenciesNames);

          const borderingCountriesData = await Promise.all(
            country.borders.map(async (border) => {
              const responseBorder = await axios.get(`https://restcountries.com/v3.1/alpha/${border}`);
              const flag = responseBorder.data[0]?.flags?.svg || '';
              return { name: responseBorder.data[0]?.name?.common || border, flag };
            })
          );
          setBorderingCountries(borderingCountriesData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    void fetchData();
  }, [country]);

  if (!country) {
    return <h2 className="countryInfo">Выберите страну</h2>;
  }

  return (
    <div className="countryInfo">
      <h2><strong>Страна: </strong>
        {country.name.common}
      </h2>
      <CurrentCountryFlag country={country} />
      <p><strong>Столица: </strong>
        {country.capital}
      </p>
      <p><strong>Население: </strong>
        {country.population} человек
      </p>
      <p><strong>Местная валюта: </strong>
        {currencies.join(', ')}
      </p>
      <p><strong>Регион: </strong>
        {country.region}
      </p>
      <div>
        <strong>Граничит с:</strong>
        <ul>
          {borderingCountries.length > 0 ? (
            borderingCountries.map(({ name, flag }, index) => (
              <li key={index}>
                <img src={flag} alt={`Flag of ${name}`} style={{ maxWidth: '24px', marginRight: '4px' }} />
                {name}
              </li>
            ))
          ) : (
            <li>У выбранной вами страны - нет границ с соседними странами.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CountryInfo;
