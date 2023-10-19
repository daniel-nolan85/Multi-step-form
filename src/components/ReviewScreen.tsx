import { useFormContext } from '../context/FormContext';

// Define the props interface for the ReviewScreen component
interface Step3Props {
  onStepComplete: (e: React.SyntheticEvent) => void;
}

const ReviewScreen = ({ onStepComplete }: Step3Props) => {
  // Use React context to access form values
  const { username, email, phone, selectedCountry } = useFormContext();

  return (
    <>
      <h3>Review screen</h3>
      <form>
        <div>
          <p className='field-name'>Username</p>
          <p className='user-data'>{username}</p>
        </div>
        <div>
          <p className='field-name'>Email</p>
          <p className='user-data'>{email}</p>
        </div>
        <div>
          <p className='field-name'>Phone</p>
          <p className='user-data'>{phone}</p>
        </div>
        <div>
          <p className='field-name'>Country</p>
          <p className='user-data'>{selectedCountry}</p>
        </div>
        <button type='submit' onClick={(e) => onStepComplete(e)}>
          Complete
        </button>
      </form>
    </>
  );
};

export default ReviewScreen;
