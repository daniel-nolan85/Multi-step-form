import MultiStepForm from './components/MultiStepForm';
import { FormContextProvider } from './context/FormContext';

function App() {
  return (
    <div>
      <FormContextProvider>
        <MultiStepForm />
      </FormContextProvider>
    </div>
  );
}

export default App;
