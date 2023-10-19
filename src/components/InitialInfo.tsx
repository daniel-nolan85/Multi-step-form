import { useState, useEffect } from 'react';
import { fetchCountries, Country } from '../utils/countryAPI';
import { useFormContext } from '../context/FormContext';

// Define the props interface for the InitialInfo component
interface Step1Props {
  onStepComplete: (e: React.SyntheticEvent) => void;
}

const InitialInfo = ({ onStepComplete }: Step1Props) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [countriesVisible, setCountriesVisible] = useState(false);
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    phone: '',
    country: '',
  });

  // Use React context to access and set form values
  const {
    username,
    email,
    phone,
    selectedCountry,
    setUsername,
    setEmail,
    setPhone,
    setSelectedCountry,
  } = useFormContext();

  // Fetch countries data when component mounts
  useEffect(() => {
    fetchCountries()
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  // Validate form fields are filled in correctly
  const isInitialInfoValid = () => {
    return (
      username.trim() !== '' &&
      email.trim() !== '' &&
      phone.trim() !== '' &&
      selectedCountry !== 'Select a country' &&
      errors.username === '' &&
      errors.email === '' &&
      errors.phone === '' &&
      errors.country === ''
    );
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);

    // Validate username - must be 4-12 characters
    if (value.trim() === '' || value.length < 4 || value.length > 12) {
      setErrors({ ...errors, username: 'Username must be 4-12 characters' });
    } else {
      setErrors({ ...errors, username: '' });
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Validate email
    if (!value.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)) {
      setErrors({ ...errors, email: 'Invalid email address' });
    } else {
      setErrors({ ...errors, email: '' });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);

    // Validate phone
    if (!value.match(/^[0-9]{10}$/)) {
      setErrors({ ...errors, phone: 'Invalid phone number' });
    } else {
      setErrors({ ...errors, phone: '' });
    }
  };

  const handleCountryChange = (label: string) => {
    setSelectedCountry(label);
    setCountriesVisible(false);
  };

  // Toggle visibiliy of countries dropdown
  const handleDropdown = () => {
    setCountriesVisible(!countriesVisible);
  };

  return (
    <>
      <h3>Initial info</h3>
      <form>
        <p>Username</p>
        <div className='input-container'>
          <input
            type='text'
            name='username'
            value={username}
            onChange={handleUsernameChange}
            placeholder='Input username'
          />
          <span className='error'>{errors.username}</span>
          {errors.username && <span className='error-icon'>!</span>}
        </div>
        <p>Email</p>
        <div className='input-container'>
          <input
            type='email'
            name='email'
            value={email}
            onChange={handleEmailChange}
            placeholder='Input email'
          />
          <span className='error'>{errors.email}</span>
          {errors.email && <span className='error-icon'>!</span>}
        </div>
        <p>Phone</p>
        <div className='input-container'>
          <input
            type='tel'
            name='phone'
            value={phone}
            onChange={handlePhoneChange}
            placeholder='Input phone number'
          />
          <span className='error'>{errors.phone}</span>
          {errors.phone && <span className='error-icon'>!</span>}
        </div>
        <p>Country</p>
        <div className='select-box'>
          <div
            className={`options-container ${countriesVisible ? 'active' : ''}`}
          >
            {countries.map((country) => (
              <div className='option' key={country.cca2}>
                <input value={country.cca2} type='radio' className='radio' />
                <label onClick={() => handleCountryChange(country.name.common)}>
                  {country.name.common}
                </label>
              </div>
            ))}
          </div>
          <div className='selected' onClick={handleDropdown}>
            <span
              className={`${
                selectedCountry == 'Select a country' ? 'light' : ''
              }`}
            >
              {selectedCountry}
            </span>
          </div>
          <span className='caret'>╲╱</span>
        </div>
        <button
          type='submit'
          onClick={(e) => onStepComplete(e)}
          disabled={!isInitialInfoValid()}
        >
          Continue
        </button>
      </form>
    </>
  );
};

export default InitialInfo;
