import { useState } from 'react';
import InitialInfo from './InitialInfo';
import PasswordScreen from './PasswordScreen';
import ReviewScreen from './ReviewScreen';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const handleStep1Complete = () => {
    setStep(2);
  };

  const handleStep2Complete = () => {
    setStep(3);
  };

  return (
    <div>
      <h2>Super test form</h2>
      {step === 1 ? (
        <InitialInfo onStepComplete={handleStep1Complete} />
      ) : step === 2 ? (
        <PasswordScreen onStepComplete={handleStep2Complete} />
      ) : (
        <ReviewScreen />
      )}
    </div>
  );
};

export default MultiStepForm;
