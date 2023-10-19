import { useState, useEffect } from 'react';
import { fetchCountries, Country } from '../utils/countryAPI';
import { useFormContext } from '../context/FormContext';

interface Step1Props {
  onStepComplete: (username: string, phone: string, country: string) => void;
}

const InitialInfo = ({ onStepComplete }: Step1Props) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    phone: '',
    country: '',
  });

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

  useEffect(() => {
    fetchCountries()
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  const isInitialInfoValid = () => {
    return (
      username.trim() !== '' &&
      email.trim() !== '' &&
      phone.trim() !== '' &&
      selectedCountry !== '' &&
      errors.username === '' &&
      errors.email === '' &&
      errors.phone === '' &&
      errors.country === ''
    );
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);

    if (value.trim() === '' || value.length < 4 || value.length > 12) {
      setErrors({ ...errors, username: 'Username must be 4-12 characters' });
    } else {
      setErrors({ ...errors, username: '' });
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!value.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)) {
      setErrors({ ...errors, email: 'Invalid email address' });
    } else {
      setErrors({ ...errors, email: '' });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);

    if (!value.match(/^[0-9]{10}$/)) {
      setErrors({ ...errors, phone: 'Invalid phone number' });
    } else {
      setErrors({ ...errors, phone: '' });
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e);

    const value = e.target.value;
    setSelectedCountry(value);

    if (value.trim() === '') {
      setErrors({ ...errors, country: 'Please select a country' });
    } else {
      setErrors({ ...errors, country: '' });
    }
  };

  return (
    <div>
      <p>Initial info</p>
      <input
        type='text'
        name='username'
        value={username}
        onChange={handleUsernameChange}
        placeholder='Username'
      />
      <span className='error'>{errors.username}</span>

      <input
        type='email'
        name='email'
        value={email}
        onChange={handleEmailChange}
        placeholder='Email'
      />
      <span className='error'>{errors.email}</span>

      <input
        type='tel'
        name='phone'
        value={phone}
        onChange={handlePhoneChange}
        placeholder='Phone Number'
      />
      <span className='error'>{errors.phone}</span>

      <select
        name='country'
        value={selectedCountry}
        onChange={handleCountryChange}
      >
        <option value=''>Select a country</option>
        {countries.map((country) => (
          <option key={country.cca2} value={country.cca2}>
            {country.name.common}
          </option>
        ))}
      </select>
      <span className='error'>{errors.country}</span>

      <button
        onClick={() => onStepComplete(username, phone, selectedCountry)}
        disabled={!isInitialInfoValid()}
      >
        Continue
      </button>
    </div>
  );
};

export default InitialInfo;
