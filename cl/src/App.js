import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { Login, Error, Patient, Doctor, SRC } from "./pages"
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/Src" element={<SRC />} />
        {/* <Route path="/landing" element={<Landing />} /> */}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
