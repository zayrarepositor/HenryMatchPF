import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UIProvider } from "../src/components/Context/ContextUI";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import Desktop from "./pages/Desktop/Desktop";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";

export const App = () => {
  return (
    <UIProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/desktop" element={<Desktop />} />
          <Route path="/chatroom" element={<ChatRoom />} />
        </Routes>
      </BrowserRouter>
    </UIProvider>
  );
};
