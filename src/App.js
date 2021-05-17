import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import CustomersContextProvider from './contexts/CustomersContext';
import CustomersList from './components/CustomersList';
function App() {
  return (
    <div className="App">
        <CustomersContextProvider>
            <CustomersList/>
        </CustomersContextProvider>
    </div>
  );
}

export default App;
