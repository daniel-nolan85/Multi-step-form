import {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

// Define the context type for form values and step
interface FormContextType {
  step: number;
  username: string;
  email: string;
  phone: string;
  selectedCountry: string;
  setStep: Dispatch<SetStateAction<number>>;
  setUsername: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setPhone: Dispatch<SetStateAction<string>>;
  setSelectedCountry: Dispatch<SetStateAction<string>>;
}

// Create the FormContext with initial values
const FormContext = createContext<FormContextType | undefined>(undefined);

// Custom hook to access the context values
export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormContextProvider');
  }
  return context;
}

// Define the props for the FormContextProvider component
interface FormContextProviderProps {
  children: ReactNode;
}

// FormContextProvider component to provide context values
export function FormContextProvider({ children }: FormContextProviderProps) {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('Select a country');

  // Create the context value to be provided
  const contextValue: FormContextType = {
    step,
    username,
    email,
    phone,
    selectedCountry,
    setStep,
    setUsername,
    setEmail,
    setPhone,
    setSelectedCountry,
  };

  return (
    // Provide the context values to the children
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
}
