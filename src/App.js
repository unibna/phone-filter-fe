import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './App.css';

import MainLayout from "./Layouts/MainLayout";
import AuthLayout from "./Layouts/AuthLayout";
import AuthPage from "./Pages/AuthPage";
import LoginPage from "./Pages/AuthPage/LoginPage";
import RegisterPage from "./Pages/AuthPage/RegisterPage";
import FilePage from "./Pages/FilePage";
import UserPage from "./Pages/UserPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/auth" element={<AuthLayout/>}>
            <Route index element={<AuthPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route path="/" element={<MainLayout/>}>
            <Route index element={<FilePage />} />
            <Route path="file" element={<FilePage />} />
            <Route path="user" element={<UserPage />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
