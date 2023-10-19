import { useFormContext } from '../context/FormContext';

const ReviewScreen = () => {
  const { username, email, phone, selectedCountry } = useFormContext();
  return (
    <div>
      <p>Review screen</p>
      <div>
        <p>Username</p>
        <p>{username}</p>
      </div>
      <div>
        <p>Email</p>
        <p>{email}</p>
      </div>
      <div>
        <p>Phone</p>
        <p>{phone}</p>
      </div>
      <div>
        <p>Country</p>
        <p>{selectedCountry}</p>
      </div>
      <button>Complete</button>
    </div>
  );
};

export default ReviewScreen;
