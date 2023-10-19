import MultiStepForm from './components/MultiStepForm';
import { FormContextProvider } from './context/FormContext';

function App() {
  return (
    // Wrap 'MultiStepForm' with 'FormContextProvider' to provide context to it
    <FormContextProvider>
      <MultiStepForm />
    </FormContextProvider>
  );
}

export default App;
