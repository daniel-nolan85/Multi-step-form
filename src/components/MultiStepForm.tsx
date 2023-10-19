import { useState } from 'react';
import InitialInfo from './InitialInfo';
import PasswordScreen from './PasswordScreen';
import ReviewScreen from './ReviewScreen';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const handleStep1Complete = () => {
    setStep(2);
  };

  return (
    <div>
      {step === 1 ? (
        <InitialInfo onStepComplete={handleStep1Complete} />
      ) : step === 2 ? (
        <PasswordScreen />
      ) : (
        <ReviewScreen />
      )}
    </div>
  );
};

export default MultiStepForm;
