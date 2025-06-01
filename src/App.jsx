import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import SignUp from './components/SignUp'; 
// import ProfileSettings from './components/ProfileSettings';
import ProfileSettings from './components/ProfileSetting';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<Auth />} /> 
        <Route path="/profile-settings" element={<ProfileSettings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
