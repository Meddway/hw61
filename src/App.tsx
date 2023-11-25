import CountryInfo from './components/CountryInfo/CountryInfo';
import CountryList from './components/CountryList/CountryList';
import './App.css';
import {useState} from 'react';
import {Country} from './Country';


const App = () => {
  const [choiceCountry, setChoiceCountry] = useState<Country | null>(null);

  const handleCountry = (choiceCountry: Country | null) => {
    setChoiceCountry(choiceCountry);
  };

  return (
    <div className="appDiv">
      <CountryList countrySelect = {handleCountry}/>
      <CountryInfo country = {choiceCountry}/>
    </div>
    );
};

export default App;
