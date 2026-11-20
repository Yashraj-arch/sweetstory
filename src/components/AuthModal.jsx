import React, { useState, useEffect } from 'react';
import { X, User, Phone, Mail, Lock, ShieldCheck, LogOut, CheckCircle, AlertCircle, ShoppingBag } from 'lucide-react';
import { authAPI, ordersAPI } from '../services/api';

export default function AuthModal({ isOpen, onClose, currentUser, onAuthSuccess, onLogout }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [myOrders, setMyOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  useEffect(() => {
    if (isOpen) {
      setError('');
      setSuccessMsg('');
      if (currentUser) {
        fetchOrders();
      }
    }
  }, [isOpen, currentUser]);

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);
      const orders = await ordersAPI.getMyOrders();
      setMyOrders(orders);
    } catch (err) {
      console.error('Failed to load orders', err);
    } finally {
      setOrdersLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await authAPI.login({
        identifier: loginIdentifier,
        password: loginPassword
      });
      setSuccessMsg(`Welcome back, ${data.user.full_name}!`);
      onAuthSuccess(data.user);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await authAPI.register({
        full_name: regName,
        phone: regPhone,
        email: regEmail || null,
        password: regPassword
      });
      setSuccessMsg(`Account created successfully! Welcome, ${data.user.full_name}.`);
      onAuthSuccess(data.user);
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err) {
      setError(err.message || 'Registration failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutClick = async () => {
    setLoading(true);
    try {
      await authAPI.logout();
      onLogout();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cocoa-950/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-cream-50 border-2 border-cocoa-950 shadow-2xl p-6 sm:p-8 rounded-none">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 border border-cocoa-900/20 text-cocoa-800 hover:text-cocoa-950 hover:border-cocoa-950 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Tag */}
        <div className="mb-4">
          <span className="text-[11px] font-mono uppercase tracking-widest text-cocoa-500 block">
            Sweet Story Cakes // Customer Portal
          </span>
          <h3 className="font-serif text-2xl font-bold text-cocoa-950 mt-1">
            {currentUser ? 'Your Customer Account' : activeTab === 'login' ? 'Customer Sign In' : 'Create Customer Account'}
          </h3>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
            <span>{error}</span>
          </div>
        )}
        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-start gap-2">
            <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* LOGGED IN VIEW */}
        {currentUser ? (
          <div className="space-y-6">
            <div className="p-4 bg-white border border-cocoa-900/15 space-y-2">
              <div className="flex items-center justify-between border-b border-cocoa-900/10 pb-2">
                <span className="text-xs font-mono uppercase text-cocoa-500">Full Name</span>
                <span className="text-sm font-semibold text-cocoa-950">{currentUser.full_name}</span>
              </div>
              <div className="flex items-center justify-between border-b border-cocoa-900/10 pb-2">
                <span className="text-xs font-mono uppercase text-cocoa-500">Phone Number</span>
                <span className="text-xs font-mono text-cocoa-900">+91 {currentUser.phone}</span>
              </div>
              {currentUser.email && (
                <div className="flex items-center justify-between border-b border-cocoa-900/10 pb-2">
                  <span className="text-xs font-mono uppercase text-cocoa-500">Email Address</span>
                  <span className="text-xs text-cocoa-800">{currentUser.email}</span>
                </div>
              )}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-mono uppercase text-cocoa-500">Security Status</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Customer
                </span>
              </div>
            </div>

            {/* Past Inquiries & Orders */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-widest text-cocoa-600 flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5" /> Your Cake Orders & Quotes
                </span>
                <span className="text-xs font-mono text-cocoa-500">{myOrders.length} records</span>
              </div>
              {ordersLoading ? (
                <p className="text-xs text-cocoa-500 py-3 text-center">Loading orders...</p>
              ) : myOrders.length === 0 ? (
                <div className="p-4 text-center border border-dashed border-cocoa-900/20 text-xs text-cocoa-600">
                  No orders recorded yet. Use the Custom Studio or Signature gallery to request a quote!
                </div>
              ) : (
                <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                  {myOrders.map((ord) => (
                    <div key={ord.id} className="p-3 bg-white border border-cocoa-900/10 text-xs flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-cocoa-950">{ord.cake_title}</p>
                        <p className="text-[11px] text-cocoa-600">{ord.tier_type} • {ord.weight_kg}kg • {ord.flavor}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono font-bold text-cocoa-950">₹{ord.calculated_price.toLocaleString('en-IN')}</p>
                        <span className="text-[10px] font-mono text-amber-800 uppercase px-1.5 py-0.5 bg-amber-50 border border-amber-200">
                          {ord.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogoutClick}
              disabled={loading}
              className="w-full py-2.5 px-4 bg-white hover:bg-rose-50 text-rose-700 text-xs font-mono uppercase tracking-widest border border-rose-300 transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{loading ? 'Signing out...' : 'Sign Out of Account'}</span>
            </button>
          </div>
        ) : (
          /* AUTHENTICATION TABS (LOGIN / REGISTER) */
          <div>
            {/* Tab Switcher */}
            <div className="grid grid-cols-2 gap-2 mb-6 border-b border-cocoa-900/15 pb-3">
              <button
                type="button"
                onClick={() => { setActiveTab('login'); setError(''); }}
                className={`py-2 text-xs font-mono uppercase tracking-widest transition-colors ${
                  activeTab === 'login'
                    ? 'bg-cocoa-950 text-cream-100 font-bold'
                    : 'bg-white text-cocoa-700 hover:text-cocoa-950 border border-cocoa-900/15'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('register'); setError(''); }}
                className={`py-2 text-xs font-mono uppercase tracking-widest transition-colors ${
                  activeTab === 'register'
                    ? 'bg-cocoa-950 text-cream-100 font-bold'
                    : 'bg-white text-cocoa-700 hover:text-cocoa-950 border border-cocoa-900/15'
                }`}
              >
                New Account
              </button>
            </div>

            {/* SIGN IN FORM */}
            {activeTab === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-cocoa-600 mb-1">
                    Phone Number or Email
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. 9822155763 or email@domain.com"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-cocoa-900/20 text-cocoa-950 text-xs focus:outline-none focus:border-cocoa-950 rounded-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-cocoa-600 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      placeholder="Enter your account password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-cocoa-900/20 text-cocoa-950 text-xs focus:outline-none focus:border-cocoa-950 rounded-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-cocoa-950 hover:bg-cocoa-900 text-cream-100 text-xs font-mono uppercase tracking-widest border border-cocoa-950 transition-colors flex items-center justify-center gap-2"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
                  </button>
                </div>
              </form>
            ) : (
              /* REGISTER FORM */
              <form onSubmit={handleRegister} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-cocoa-600 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Deshmukh"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-cocoa-900/20 text-cocoa-950 text-xs focus:outline-none focus:border-cocoa-950 rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-cocoa-600 mb-1">
                    Phone Number (Mandatory) *
                  </label>
                  <div className="flex">
                    <span className="px-2.5 py-2 bg-cocoa-100 border border-r-0 border-cocoa-900/20 text-xs font-mono text-cocoa-800">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-cocoa-900/20 text-cocoa-950 text-xs focus:outline-none focus:border-cocoa-950 rounded-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-cocoa-600 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="For order confirmations & PDF receipts"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-cocoa-900/20 text-cocoa-950 text-xs focus:outline-none focus:border-cocoa-950 rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-cocoa-600 mb-1">
                    Create Password *
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="Minimum 6 characters"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-cocoa-900/20 text-cocoa-950 text-xs focus:outline-none focus:border-cocoa-950 rounded-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-cocoa-950 hover:bg-cocoa-900 text-cream-100 text-xs font-mono uppercase tracking-widest border border-cocoa-950 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                    <span>{loading ? 'Creating Account...' : 'Register Account'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Security badge at bottom */}
        <div className="mt-6 pt-3 border-t border-cocoa-900/10 flex items-center justify-center gap-2 text-[10px] font-mono text-cocoa-500">
          <ShieldCheck className="w-3 h-3 text-cocoa-600" />
          <span>Encrypted with native Bcrypt & JWT • Zero data selling</span>
        </div>

      </div>
    </div>
  );
}
