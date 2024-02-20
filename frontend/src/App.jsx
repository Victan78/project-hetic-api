// App.js
import React from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Facture from './componant/CreateFacture';
import CVForm from './componant/CreateCv';
import { UserProvider } from './context/userContext';
import Dashboard from './pages/Dashboard';
import './App.css';
import LoginPage from './pages/Login';
import './assets/form.css';

const App = () => {
  return (

    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/facture" element={<Facture />} />
          <Route path="/cv" element={<CVForm />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
     
      </UserProvider>
    </Router>
  );
};

export default App;
