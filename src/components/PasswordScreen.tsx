import { useState } from 'react';

// Define the props interface for the PasswordScreen component
interface Step2Props {
  onStepComplete: (e: React.SyntheticEvent) => void;
}

const PasswordScreen = ({ onStepComplete }: Step2Props) => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState({
    password: '',
    repeatPassword: '',
  });

  // Validate form fields are filled in correctly
  const isPasswordScreenValid = () => {
    return (
      password.trim() !== '' &&
      repeatPassword.trim() !== '' &&
      password === repeatPassword &&
      password.length >= 8 &&
      password.length <= 16 &&
      repeatPassword.length >= 8 &&
      repeatPassword.length <= 16
    );
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    // Validate password - must be 8-16 characters
    if (value.length < 8 || value.length > 16) {
      setErrors({ ...errors, password: 'Password must be 8-16 characters' });
    } else {
      setErrors({ ...errors, password: '' });
    }
  };

  const handleRepeatPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setRepeatPassword(value);

    // Check if the repeated password matches the original
    if (value !== password) {
      setErrors({ ...errors, repeatPassword: 'Passwords do not match' });
    } else {
      setErrors({ ...errors, repeatPassword: '' });
    }
  };

  return (
    <>
      <h3>Password screen</h3>
      <form>
        <p>Password</p>
        <div className='input-container'>
          <input
            type='password'
            name='password'
            value={password}
            onChange={handlePasswordChange}
            placeholder='Password'
          />
          <span className='error'>{errors.password}</span>
          {errors.password && <span className='error-icon'>!</span>}
        </div>
        <p>Repeat password</p>
        <div className='input-container'>
          <input
            type='password'
            name='repeatPassword'
            value={repeatPassword}
            onChange={handleRepeatPasswordChange}
            placeholder='Repeat Password'
          />
          <span className='error'>{errors.repeatPassword}</span>
          {errors.repeatPassword && <span className='error-icon'>!</span>}
        </div>
        <button
          type='submit'
          onClick={(e) => onStepComplete(e)}
          disabled={!isPasswordScreenValid()}
        >
          Continue
        </button>
      </form>
    </>
  );
};

export default PasswordScreen;
