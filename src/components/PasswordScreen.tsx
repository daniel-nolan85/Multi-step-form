import { useState } from 'react';

interface Step1Props {
  onStepComplete: () => void;
}

const PasswordScreen = ({ onStepComplete }: Step1Props) => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState({
    password: '',
    repeatPassword: '',
  });

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
    <div>
      <p>Password screen</p>
      <input
        type='password'
        name='password'
        value={password}
        onChange={handlePasswordChange}
        placeholder='Password'
      />
      <span className='error'>{errors.password}</span>

      <input
        type='password'
        name='repeatPassword'
        value={repeatPassword}
        onChange={handleRepeatPasswordChange}
        placeholder='Repeat Password'
      />
      <span className='error'>{errors.repeatPassword}</span>

      <button onClick={onStepComplete} disabled={!isPasswordScreenValid()}>
        Continue
      </button>
    </div>
  );
};

export default PasswordScreen;
