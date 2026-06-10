import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Eye, EyeOff, ShieldCheck, Cpu } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (username: string, email: string, firstName?: string, lastName?: string, isNewSignup?: boolean) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleDemoFill = (type: 'user' | 'admin') => {
    setError('');
    if (type === 'admin') {
      setEmail('bankadmin@admin.com');
      setPassword('1234');
      if (activeTab === 'signup') {
        setUsername('bankadmin');
        setFirstName('Bank');
        setLastName('Administrator');
      }
    } else {
      setEmail('manmagic550@yahoo.com');
      setPassword('password123');
      if (activeTab === 'signup') {
        setUsername('manmagic550');
        setFirstName('Magic');
        setLastName('Man');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all security fields.');
      return;
    }

    const isEmailAdmin = email.toLowerCase().includes('admin');

    // Admin Passcode Enforcer ('1234' on default account, or 4+ characters for others)
    if (email.toLowerCase() === 'bankadmin@admin.com') {
      if (password !== '1234') {
        setError('Admin access denied. Administrators are protected by passcode verification (must match required security key "1234").');
        return;
      }
    } else if (password.length < 4) {
      setError('Password must be at least 4 characters in length.');
      return;
    }

    setLoading(true);

    // Dynamic latency simulation for a polished, secure authenticating experience
    await new Promise(resolve => setTimeout(resolve, 350));

    try {
      // Retrieve registered accounts
      const usersStr = localStorage.getItem('neobyte_registered_users');
      let registeredUsers = [];
      if (usersStr) {
        try {
          registeredUsers = JSON.parse(usersStr);
        } catch (e) {
          registeredUsers = [];
        }
      }

      // Proactively seed default accounts if they aren't registered yet
      const hasAdmin = registeredUsers.some((u: any) => u.email.toLowerCase() === 'bankadmin@admin.com');
      const hasUser = registeredUsers.some((u: any) => u.email.toLowerCase() === 'manmagic550@yahoo.com');

      if (!hasAdmin || !hasUser) {
        const seedUsers = [...registeredUsers];
        if (!hasAdmin) {
          seedUsers.push({
            email: 'bankadmin@admin.com',
            username: 'bankadmin',
            password: '1234',
            firstName: 'Bank',
            lastName: 'Administrator'
          });
        }
        if (!hasUser) {
          seedUsers.push({
            email: 'manmagic550@yahoo.com',
            username: 'manmagic550',
            password: 'password123',
            firstName: 'Magic',
            lastName: 'Man'
          });
        }
        registeredUsers = seedUsers;
        localStorage.setItem('neobyte_registered_users', JSON.stringify(seedUsers));
      }

      if (activeTab === 'login') {
        const targetSearch = email.trim().toLowerCase();
        const userFound = registeredUsers.find((u: any) => 
          u.email.toLowerCase() === targetSearch || 
          u.username.toLowerCase() === targetSearch
        );

        if (!userFound) {
          setError('Incorrect secure credentials or bad login key configuration.');
          setLoading(false);
          return;
        }

        if (userFound.password !== password) {
          setError('Incorrect key password. Verification failed.');
          setLoading(false);
          return;
        }

        onLoginSuccess(
          userFound.username,
          userFound.email,
          userFound.firstName || 'Magic',
          userFound.lastName || 'User'
        );
        onClose();
      } else {
        // Sign Up
        if (!username) {
          setError('Desired username parameter is required.');
          setLoading(false);
          return;
        }

        const emailLower = email.trim().toLowerCase();
        const usernameLower = username.trim().toLowerCase();

        const userExists = registeredUsers.some((u: any) => 
          u.email.toLowerCase() === emailLower || 
          u.username.toLowerCase() === usernameLower
        );

        if (userExists) {
          setError('This secure email address or username is already allocated to another account.');
          setLoading(false);
          return;
        }

        const fnVal = firstName.trim() || (isEmailAdmin ? 'Bank' : 'Magic');
        const lnVal = lastName.trim() || (isEmailAdmin ? 'Administrator' : 'User');

        const newUser = {
          email: emailLower,
          username: username.trim(),
          password: password,
          firstName: fnVal,
          lastName: lnVal
        };

        const updatedUsers = [...registeredUsers, newUser];
        localStorage.setItem('neobyte_registered_users', JSON.stringify(updatedUsers));

        onLoginSuccess(username.trim(), emailLower, fnVal, lnVal, true);
        onClose();
      }
    } catch (err: any) {
      console.error('Local Device Auth Error:', err);
      setError('A local authorization error occurred. Please clear storage and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" id="auth-modal-overlay">
      <div 
        className="relative w-full max-w-md bg-[#090F09] border border-[#adff2f]/20 rounded-2xl p-6 md:p-8 text-white shadow-[0_0_50px_rgba(173,255,47,0.1)] transition-all animate-in zoom-in-95 duration-200"
        id="auth-modal-card"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="auth-modal-close"
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo Shield Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 bg-[#112F11] border border-[#adff2f]/20 rounded-2xl mb-2.5">
            <Cpu className="w-8 h-8 text-[#adff2f]" />
          </div>
          <h2 className="text-xl font-sans font-bold tracking-widest text-[#adff2f] uppercase">
            NEOBYTE BANK
          </h2>
          <p className="text-[10px] font-mono tracking-wide text-zinc-400 uppercase mt-0.5">
            Secure Cryptographic Access Node
          </p>
        </div>

        {/* Toggle tabs */}
        <div className="grid grid-cols-2 bg-zinc-950 p-1.5 rounded-xl border border-zinc-900 mb-6">
          <button
            onClick={() => {
              setActiveTab('login');
              setError('');
            }}
            id="auth-tab-login"
            className={`py-2 text-xs font-sans font-bold tracking-wider uppercase rounded-lg transition-all cursor-pointer ${
              activeTab === 'login'
                ? 'bg-zinc-800 text-white border border-zinc-700'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => {
              setActiveTab('signup');
              setError('');
            }}
            id="auth-tab-signup"
            className={`py-2 text-xs font-sans font-bold tracking-wider uppercase rounded-lg transition-all cursor-pointer ${
              activeTab === 'signup'
                ? 'bg-zinc-800 text-white border border-zinc-700'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Info alerts */}
        {error && (
          <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-400 text-xs rounded-xl font-mono text-left mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Sign up name parameters */}
          {activeTab === 'signup' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500 text-left mb-1">First Name</label>
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full text-xs bg-zinc-950 border border-zinc-800 focus:border-[#adff2f]/40 p-2.5 rounded-xl text-white font-sans outline-none focus:ring-1 focus:ring-[#adff2f]/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500 text-left mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full text-xs bg-zinc-950 border border-zinc-800 focus:border-[#adff2f]/40 p-2.5 rounded-xl text-white font-sans outline-none focus:ring-1 focus:ring-[#adff2f]/20 transition-all"
                />
              </div>
            </div>
          )}

          {/* Email/Username parameter */}
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500 text-left mb-1">
              {activeTab === 'login' ? 'Email / Username' : 'Email Address'}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-500">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                placeholder={activeTab === 'login' ? 'Enter email address' : 'Enter security email'}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className="w-full text-xs bg-zinc-950 border border-zinc-800 focus:border-[#adff2f]/40 pl-9 pr-3 p-2.5 rounded-xl text-white font-sans outline-none focus:ring-1 focus:ring-[#adff2f]/20 transition-all font-mono"
              />
            </div>
          </div>

          {/* Signup Username parameter */}
          {activeTab === 'signup' && (
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500 text-left mb-1">Desired Username</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-500">
                  <UserIcon className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError('');
                  }}
                  className="w-full text-xs bg-zinc-950 border border-zinc-800 focus:border-[#adff2f]/40 pl-9 pr-3 p-2.5 rounded-xl text-white font-sans outline-none focus:ring-1 focus:ring-[#adff2f]/20 transition-all font-mono"
                />
              </div>
            </div>
          )}

          {/* Password element */}
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500 text-left mb-1">Security Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-500">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full text-xs bg-zinc-950 border border-zinc-800 focus:border-[#adff2f]/40 pl-9 pr-10 p-2.5 rounded-xl text-white outline-none focus:ring-1 focus:ring-[#adff2f]/20 transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Checkboxes controls */}
          <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-2">
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="accent-[#adff2f] rounded border-zinc-800 bg-zinc-950 text-black focus:ring-0 w-3.5 h-3.5"
              />
              <span className="font-sans">Remember on this device</span>
            </label>
            <button
              type="button"
              onClick={() => setError('Password recovery link has been simulated to your secure email.')}
              className="hover:text-white transition-colors hover:underline font-mono"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit action button */}
          <button
            type="submit"
            disabled={loading}
            id="auth-modal-submit"
            className="w-full py-3 bg-[#adff2f] hover:bg-[#bbf04d] text-black font-sans font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md shadow-[#adff2f]/5 flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            {loading ? (
              <span className="border-2 border-black border-t-transparent rounded-full w-4 h-4 animate-spin" />
            ) : (
              <span>{activeTab === 'login' ? 'SIGN IN' : 'SIGN UP'}</span>
            )}
          </button>

          {/* Quick Demo Assist */}
          <div className="pt-4 border-t border-zinc-900/60 flex flex-col gap-2 items-center justify-center">
            <span className="text-[9px] font-mono uppercase text-zinc-500">Fast Demo Presets:</span>
            <div className="flex flex-wrap gap-2 justify-center w-full">
              <button
                type="button"
                onClick={() => handleDemoFill('user')}
                id="auth-autofill-user"
                className="text-[10px] text-zinc-400 hover:text-white font-mono flex items-center space-x-1.5 px-2.5 py-1.5 rounded bg-zinc-950 border border-zinc-900 hover:border-zinc-700 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
                <span>Autofill User Mode</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill('admin')}
                id="auth-autofill-admin"
                className="text-[10px] text-zinc-400 hover:text-white font-mono flex items-center space-x-1.5 px-2.5 py-1.5 rounded bg-zinc-950 border border-zinc-900 hover:border-zinc-700 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>Autofill Admin (1234)</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
