import InitialInfo from './InitialInfo';
import PasswordScreen from './PasswordScreen';
import ReviewScreen from './ReviewScreen';
import { useFormContext } from '../context/FormContext';

const MultiStepForm = () => {
  // Use React context to access and set form values and step
  const { step, setStep, setUsername, setEmail, setPhone, setSelectedCountry } =
    useFormContext();

  // Function to handle completion of step 1
  const handleStep1Complete = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setStep(2); // Move to step 2
  };

  // Function to handle completion of step 2
  const handleStep2Complete = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setStep(3); // Move to step 3
  };

  // Function to handle completion of step 3
  const handleStep3Complete = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // Move back to step 1 and reset the form
    setStep(1);
    setUsername('');
    setEmail('');
    setPhone('');
    setSelectedCountry('Select a country');
  };

  return (
    <div className='form-container'>
      <h2>Super test form</h2>
      {step === 1 ? (
        <InitialInfo onStepComplete={(e) => handleStep1Complete(e)} />
      ) : step === 2 ? (
        <PasswordScreen onStepComplete={(e) => handleStep2Complete(e)} />
      ) : (
        <ReviewScreen onStepComplete={(e) => handleStep3Complete(e)} />
      )}
    </div>
  );
};

export default MultiStepForm;
