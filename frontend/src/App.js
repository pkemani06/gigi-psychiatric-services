import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/index';
import ServicesPage from './pages/services';
import AboutPage from './pages/about';
import ContactPage from './pages/contact';
import BookingPage from './pages/booking';
import BlogPage from './pages/blog';
import WhatWeTreatPage from './pages/what-we-treat';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/what-we-treat" element={<WhatWeTreatPage />} />
      </Routes>
    </BrowserRouter>
  );
}