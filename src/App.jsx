import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CakeFinderQuiz from './components/CakeFinderQuiz';
import CustomCakeBuilder from './components/CustomCakeBuilder';
import SignatureGallery from './components/SignatureGallery';
import ReviewsAndRatings from './components/ReviewsAndRatings';
import BakeryLocationStatus from './components/BakeryLocationStatus';
import Footer from './components/Footer';
import UpiPaymentModal from './components/UpiPaymentModal';
import AuthModal from './components/AuthModal';
import OfferSubscriptionToast from './components/OfferSubscriptionToast';
import SearchModal from './components/SearchModal';
import { authAPI } from './services/api';

export default function App() {
  const [upiModalOpen, setUpiModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [initialCakeForBuilder, setInitialCakeForBuilder] = useState(null);

  useEffect(() => {
    // Check if customer already has a valid JWT session
    const checkSession = async () => {
      try {
        const user = await authAPI.getProfile();
        if (user) {
          setCurrentUser(user);
        }
      } catch (err) {
        console.warn('Session check failed:', err);
      }
    };
    checkSession();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-cream-100 font-sans text-cocoa-900 selection:bg-rose-200 selection:text-cocoa-900">
      
      {/* Navigation */}
      <Navbar
        onOpenQuiz={() => scrollToSection('quiz')}
        onOpenBuilder={() => scrollToSection('builder')}
        onOpenUpi={() => setUpiModalOpen(true)}
        currentUser={currentUser}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Main Content */}
      <main>
        {/* Editorial Hero */}
        <Hero
          onOpenQuiz={() => scrollToSection('quiz')}
          onOpenBuilder={() => scrollToSection('builder')}
        />

        {/* The Cake Finder Quiz */}
        <CakeFinderQuiz
          onSelectForCustomizer={(cake) => setInitialCakeForBuilder(cake)}
        />

        {/* Custom Cake Studio */}
        <CustomCakeBuilder
          initialCake={initialCakeForBuilder}
          currentUser={currentUser}
        />

        {/* Signature Gallery */}
        <SignatureGallery
          onCustomizeCake={(cake) => setInitialCakeForBuilder(cake)}
        />

        {/* Patron Reviews & FAQ */}
        <ReviewsAndRatings />

        {/* Bakery Location, Timings & Satara Logistics */}
        <BakeryLocationStatus />
      </main>

      {/* Footer */}
      <Footer 
        onOpenUpi={() => setUpiModalOpen(true)} 
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* UPI Payment Modal */}
      <UpiPaymentModal
        isOpen={upiModalOpen}
        onClose={() => setUpiModalOpen(false)}
      />

      {/* Customer Auth & Profile Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentUser={currentUser}
        onAuthSuccess={(user) => setCurrentUser(user)}
        onLogout={() => setCurrentUser(null)}
      />

      {/* Interactive Catalog Search with Recommendations */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectCake={(cake) => setInitialCakeForBuilder(cake)}
      />

      {/* Dismissible Offer & Updates Toast */}
      <OfferSubscriptionToast />

    </div>
  );
}
