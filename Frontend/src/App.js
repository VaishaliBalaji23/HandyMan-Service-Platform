import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ViewServices from './pages/ViewServices';
import TrackStatus from './pages/TrackStatus';
import ProfileSettings from './pages/ProfileSettings';
import BookingHistory from './pages/BookingHistory';
import FeedbackForm from './pages/FeedbackForm';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import About from './components/About';
import Services from './components/Services';
import Login from './components/Login';
import CustomerDashboard from './components/CustomerDashboard';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import Concrete from './components/Concrete';
import Pavers from './components/Pavers';
import Booknow from './components/Booknow';
import Retain from './components/Retain';
import Carpentry from './components/Carpentry';
import Flooring from './components/Flooring';
import Decks from './components/Decks';
import Basement from './components/Basement';
import Remodel from './components/Remodel';
import Gallery from './components/Gallery';
import Header from './components/Header';
import Register from "./components/Register";
import ManageUsers from "./pages/ManageUsers";
import ManageServices from "./pages/ManageServices";
import ManageBookings from "./pages/ManageBookings";
import FeedbackReviews from "./pages/FeedbackReviews";


function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true });
  }, []);

  const HomePage = () => (
    <>
      <Header />
      <Navbar />
      <HeroSection />
      <About />  {/* ✅ About section added */}
      <Services />
      <Footer/>
    </>
  );

  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<CustomerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/service" element={<Services />} />
        <Route path="/concrete" element={<Concrete />} />
        <Route path="/pavers" element={<Pavers/>}/>
         <Route path="booknow" element={<Booknow />} />
        <Route path="/retaining-walls" element={<Retain />} />
        <Route path="/carpentry" element={<Carpentry/>}/>
        <Route path="/flooring" element={<Flooring/>}/>
        <Route path="/decks" element={<Decks/>}/>
        <Route path="/basement" element={<Basement/>}/>
        <Route path="/remodeling" element={<Remodel/>}/>
        <Route path="/gallery" element={<Gallery/>}/>
        <Route path="/user" element={<CustomerDashboard />} />
        <Route path="/user/view-services" element={<ViewServices />} />
<Route path="/user/track-status" element={<TrackStatus />} />
<Route path="/user/profile-settings" element={<ProfileSettings />} />
<Route path="/user/booking-history" element={<BookingHistory />} />
<Route path="/user/give-feedback" element={<FeedbackForm />} />

 <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/services" element={<ManageServices />} />
        <Route path="/admin/bookings" element={<ManageBookings />} />
        <Route path="/admin/feedback" element={<FeedbackReviews />} />
        <Route path="/register" element={<Register />} />
      
      </Routes>
    </Router>
  );
}

export default App;
