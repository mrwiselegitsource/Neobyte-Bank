import React from 'react';
import { Shield, Key, Cpu, CreditCard, ChevronRight, Menu, X, Landmark, User as UserIcon, LogOut } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  onOpenAuth: () => void;
  activeTab: 'shop' | 'dashboard' | 'admin';
  setActiveTab: (tab: 'shop' | 'dashboard' | 'admin') => void;
  purchasedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onLogout,
  onOpenAuth,
  activeTab,
  setActiveTab,
  purchasedCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isAdmin = user && user.isLoggedIn && user.email &&
    user.email.toLowerCase().startsWith('bankadmin') &&
    user.email.toLowerCase().endsWith('admin.com');


  return (
    <header className="sticky top-0 z-50 bg-[#040904]/90 backdrop-blur-md border-b border-[#adff2f]/10 shadow-lg px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Slogan */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => setActiveTab('shop')}
          id="brand-logo-trigger"
        >
          <div className="relative p-2 bg-[#122812] border border-[#adff2f]/30 rounded-xl overflow-hidden shadow-inner group-hover:border-[#adff2f] transition-all">
            <Cpu className="w-6 h-6 text-[#adff2f] animate-pulse" />
            <div className="absolute -inset-1 bg-gradient-to-r from-transparent to-[#adff2f]/20 blur-sm group-hover:block hidden" />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="font-sans font-bold text-lg text-white tracking-widest uppercase">
                NEOBYTE <span className="text-[#adff2f]">BANK</span>
              </span>
            </div>
            <p className="text-[9px] font-mono tracking-wider text-zinc-400 group-hover:text-lime-300 transition-colors">
              NEO SECURITY. REAL CREDIT.
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6" id="desktop-nav">
          <button
            onClick={() => setActiveTab('shop')}
            id="nav-shop-btn"
            className={`font-sans text-sm tracking-wide transition-all duration-300 py-1.5 px-3 rounded-lg ${
              activeTab === 'shop'
                ? 'text-[#adff2f] bg-[#122c12]/40 border border-[#adff2f]/20 shadow-[0_0_12px_rgba(173,255,47,0.1)]'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800/40 border border-transparent'
            }`}
          >
            Prepaid Portal
          </button>
          
          <button
            onClick={() => setActiveTab('dashboard')}
            id="nav-dashboard-btn"
            className={`relative font-sans text-sm tracking-wide transition-all duration-300 py-1.5 px-3 rounded-lg ${
              activeTab === 'dashboard'
                ? 'text-[#adff2f] bg-[#122c12]/40 border border-[#adff2f]/20 shadow-[0_0_12px_rgba(173,255,47,0.1)]'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800/40 border border-transparent'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <CreditCard className="w-4 h-4" />
              Active Cards
              {purchasedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#adff2f] text-black text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full ring-2 ring-[#040904]">
                  {purchasedCount}
                </span>
              )}
            </span>
          </button>

          {isAdmin && (
            <button
              onClick={() => setActiveTab('admin')}
              id="nav-admin-btn"
              className={`font-sans text-sm tracking-wide transition-all duration-300 py-1.5 px-3 rounded-lg ${
                activeTab === 'admin'
                  ? 'text-[#adff2f] bg-[#122c12]/40 border border-[#adff2f]/20 shadow-[0_0_12px_rgba(173,255,47,0.1)]'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-800/40 border border-transparent'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                Admin Panel
              </span>
            </button>
          )}
        </nav>

        {/* User Actions & Authenticator Access */}
        <div className="hidden md:flex items-center space-x-4">
          {user.isLoggedIn ? (
            <div className="flex items-center space-x-3 bg-zinc-900/60 p-1.5 pr-3 rounded-full border border-zinc-800">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#122812] to-[#adff2f]/30 flex items-center justify-center border border-[#adff2f]/20 text-[#adff2f]">
                <UserIcon className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-mono font-medium text-white max-w-[120px] truncate">{user.username}</p>
                <p className="text-[10px] text-zinc-400 font-sans">Premium Client</p>
              </div>
              <button
                onClick={onLogout}
                id="header-logout-btn"
                title="Sign Out"
                className="text-zinc-400 hover:text-red-400 transition-colors pl-2 border-l border-zinc-800 ml-1.5"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              id="header-login-btn"
              className="flex items-center space-x-1 bg-[#adff2f] hover:bg-[#bbf04d] text-black font-sans text-xs font-bold tracking-wider uppercase px-4 py-2 rounded-xl transition-all duration-300 shadow-md shadow-[#adff2f]/10 cursor-pointer"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Login / Sign Up</span>
            </button>
          )}
        </div>

        {/* Hamburger Menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          id="mobile-menu-trigger"
          className="md:hidden p-2 text-zinc-400 hover:text-white focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-[#adff2f]/10 flex flex-col space-y-3 bg-[#040904] px-2 pb-4 rounded-xl transition-all animate-in fade-in" id="mobile-nav">
          <button
            onClick={() => {
              setActiveTab('shop');
              setMobileMenuOpen(false);
            }}
            id="mobile-nav-shop"
            className={`w-full text-left py-2 px-3 rounded-lg text-sm transition-all ${
              activeTab === 'shop'
                ? 'text-[#adff2f] bg-[#122c12]/40 border-l-4 border-l-[#adff2f]'
                : 'text-zinc-300'
            }`}
          >
            Prepaid Portal
          </button>
          
          <button
            onClick={() => {
              setActiveTab('dashboard');
              setMobileMenuOpen(false);
            }}
            id="mobile-nav-dashboard"
            className={`w-full text-left py-2 px-3 rounded-lg text-sm flex items-center justify-between transition-all ${
              activeTab === 'dashboard'
                ? 'text-[#adff2f] bg-[#122c12]/40 border-l-4 border-l-[#adff2f]'
                : 'text-zinc-300'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <CreditCard className="w-4 h-4" />
              Active Cards
            </span>
            {purchasedCount > 0 && (
              <span className="bg-[#adff2f] text-black text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                {purchasedCount} Active
              </span>
            )}
          </button>

          {isAdmin && (
            <button
              onClick={() => {
                setActiveTab('admin');
                setMobileMenuOpen(false);
              }}
              id="mobile-nav-admin"
              className={`w-full text-left py-2 px-3 rounded-lg text-sm flex items-center justify-between transition-all ${
                activeTab === 'admin'
                  ? 'text-[#adff2f] bg-[#122c12]/40 border-l-4 border-l-[#adff2f]'
                  : 'text-zinc-300'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                Admin Panel
              </span>
            </button>
          )}

          <hr className="border-zinc-800 my-1" />

          {user.isLoggedIn ? (
            <div className="flex items-center justify-between bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#122812] to-[#adff2f]/30 flex items-center justify-center border border-[#adff2f]/20 text-[#adff2f]">
                  <UserIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-mono font-medium text-white">{user.username}</p>
                  <p className="text-[10px] text-zinc-400 font-sans">Premium Account</p>
                </div>
              </div>
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                id="mobile-nav-logout"
                className="text-zinc-400 hover:text-red-400 transition-colors p-2"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              id="mobile-nav-login"
              className="w-full flex items-center justify-center space-x-1.5 bg-[#adff2f] text-black font-sans font-bold uppercase text-xs px-4 py-2.5 rounded-lg shadow-md"
            >
              <Key className="w-4 h-4" />
              <span>Login / Sign Up</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
