import { Country } from '../../Country';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Props {
  country: Country | null;
}

const CurrentCountryFlag: React.FC<Props> = ({ country }) => {
  const [currentCountryFlag, setCurrentCountryFlag] = useState<string | null>('');

  useEffect(() => {
    const fetchFlag = async () => {
      if (country) {
        try {
          const response = await axios.get(`https://restcountries.com/v3.1/name/${country.name.common}`);
          const flag = response.data[0]?.flags?.svg || '';
          setCurrentCountryFlag(flag);
        } catch (error) {
          console.error('Error fetching country flag:', error);
        }
      }
    };
    void fetchFlag();
  }, [country]);

  if (!country) {
    return null;
  }

  return (
    <div>
      {currentCountryFlag && (
        <img src={currentCountryFlag} alt={`Flag of ${country.name.common}`} style={{ maxWidth: '100px' }} />
      )}
    </div>
  );
};

export default CurrentCountryFlag;
