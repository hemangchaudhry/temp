import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Patient from './pages/Patient';
import Support from './pages/Support';
import Doctor from './pages/Doctor';
import LoginPage from './components/LoginPage';
import VideoChat from './pages/VideoChat';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/login-page' element={<LoginPage/>} />
        <Route path='/patient' element={<Patient />} />
        <Route path='/doctor' element={<Doctor />} />
        <Route path='/src' element={<Support />} />
        <Route path='/video-chat' element={<VideoChat />} />
      </Routes>
    </>
  )
}

export default App;