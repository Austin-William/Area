import { render } from "react-dom";
import { NotificationContainer } from "react-notifications";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Url from "./pages/Url";
import AboutFile from "./pages/AboutFile";

const rootElement = document.getElementById("root");

render(
  <BrowserRouter>
    <NotificationContainer />
    <Routes>
      {/* All available routes. If you need to add new route(s), put it in the Routes component */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/url" element={<Url />} />
      <Route path="/aboutfile" element={<AboutFile />} />
      <Route
        path="*"
        element={<Error />}
        options={{ status: 404 }}
      />
    </Routes>
  </BrowserRouter>,
  rootElement
);