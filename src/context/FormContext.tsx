import {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

interface FormContextType {
  username: string;
  email: string;
  phone: string;
  selectedCountry: string;
  setUsername: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setPhone: Dispatch<SetStateAction<string>>;
  setSelectedCountry: Dispatch<SetStateAction<string>>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormContextProvider');
  }
  return context;
}

interface FormContextProviderProps {
  children: ReactNode;
}

export function FormContextProvider({ children }: FormContextProviderProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const contextValue: FormContextType = {
    username,
    email,
    phone,
    selectedCountry,
    setUsername,
    setEmail,
    setPhone,
    setSelectedCountry,
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
}
