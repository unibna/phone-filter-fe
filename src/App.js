import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './App.css';

import MainLayout from "./Layouts/MainLayout";
import AuthLayout from "./Layouts/AuthLayout";
import AuthPage from "./Pages/AuthPage";
import LoginPage from "./Pages/AuthPage/LoginPage";
import RegisterPage from "./Pages/AuthPage/RegisterPage";
import LogoutPage from "./Pages/AuthPage/LogoutPage";
import FileListingPage from "./Pages/FilePage/FileListingPage";
import FileUploadingPage from "./Pages/FilePage/FileUploadingPage";
import UserDetailPage from "./Pages/UserPage/UserDetailPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/auth" element={<AuthLayout/>}>
            <Route index element={<AuthPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="logout" element={<LogoutPage />} />
          </Route>
          <Route path="" element={<MainLayout/>}>
            <Route path="/user/detail" element={<UserDetailPage />} />
            <Route path="/files" element={<FileListingPage />} />
            <Route path="/files/upload" element={<FileUploadingPage />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
