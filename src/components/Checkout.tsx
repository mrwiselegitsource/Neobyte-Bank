import React, { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, ShieldCheck, ShoppingBag, CheckCircle, ChevronRight } from 'lucide-react';
import { PrepaidCard, User } from '../types';

interface CheckoutProps {
  card: PrepaidCard;
  user: User;
  onBackToDetail: () => void;
  onProceedToPayment: (firstName: string, lastName: string) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({
  card,
  user,
  onBackToDetail,
  onProceedToPayment
}) => {
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user.firstName) setFirstName(user.firstName);
    if (user.lastName) setLastName(user.lastName);
  }, [user]);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      setError('First name and Last name are strictly mandatory.');
      return;
    }
    setError('');
    onProceedToPayment(firstName.trim(), lastName.trim());
  };

  return (
    <div className="w-full bg-black py-12 px-4 shadow-inner" id="checkout-container">
      <div className="max-w-3xl mx-auto">
        
        {/* Step link */}
        <button
          onClick={onBackToDetail}
          id="checkout-back-btn"
          className="flex items-center space-x-2 text-zinc-400 hover:text-[#adff2f] transition-colors font-mono text-xs uppercase mb-8 cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Modify Configuration Parameters</span>
        </button>

        <h1 className="text-2xl sm:text-3xl font-sans font-extrabold text-[#adff2f] uppercase text-center md:text-left tracking-tight mb-8">
          COMPLETE CARD PURCHASE
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Checkout billing inputs form */}
          <div className="md:col-span-7 bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-6">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider border-b border-zinc-900 pb-2 text-left">
              Confirm Your Names
            </h3>

            {error && (
              <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-400 text-xs rounded-xl font-mono text-left">
                {error}
              </div>
            )}

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-left">
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1">
                    First Name <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Magic"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setError('');
                    }}
                    className="w-full text-xs bg-zinc-900 border border-zinc-800 focus:border-[#adff2f]/30 p-2.5 rounded-xl text-white outline-none focus:ring-1 focus:ring-[#adff2f]/10"
                  />
                </div>

                <div className="text-left">
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1">
                    Last Name <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Man"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setError('');
                    }}
                    className="w-full text-xs bg-zinc-900 border border-zinc-800 focus:border-[#adff2f]/30 p-2.5 rounded-xl text-white outline-none focus:ring-1 focus:ring-[#adff2f]/10"
                  />
                </div>
              </div>

              {/* Notice text */}
              <div className="p-3 bg-[#122812]/10 border border-[#adff2f]/5 rounded-xl text-left text-[11px] text-zinc-500 font-sans leading-relaxed">
                Important: Verify the accuracy of the names provided. These names will be associated with the verification registration to match transaction checks during authorization.
              </div>

              {/* Submit action */}
              <button
                type="submit"
                id="checkout-place-order"
                className="w-full py-4 bg-[#adff2f] hover:bg-[#bbf04d] text-black font-sans font-extrabold text-xs tracking-widest uppercase rounded-xl transition-all shadow-md shadow-[#adff2f]/5 flex items-center justify-center space-x-2 cursor-pointer group"
              >
                <span>PLACE ORDER</span>
                <ChevronRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </button>

            </form>
          </div>

          {/* Invoice summary pillar */}
          <div className="md:col-span-5 bg-zinc-950 p-6 border border-zinc-900 rounded-2xl space-y-6 text-left">
            
            <div className="flex items-center space-x-2 border-b border-zinc-900 pb-2 text-white">
              <ShoppingBag className="w-4 h-4 text-lime-400" />
              <h3 className="font-bold text-xs uppercase tracking-wider font-mono">Invoice Summary</h3>
            </div>

            {/* Display list of invoice items */}
            <div className="space-y-3 font-sans">
              <div className="flex justify-between items-start text-xs text-white">
                <div>
                  <p className="font-bold uppercase tracking-tight">{card.name}</p>
                  <p className="text-[10px] font-mono text-zinc-500 mt-0.5">Custom limit: ${card.limit.toLocaleString()} USD</p>
                </div>
                <span className="font-mono text-[#adff2f] font-bold">${card.price.toFixed(2)}</span>
              </div>

              <hr className="border-zinc-900" />

              <div className="flex justify-between items-center text-xs text-zinc-400 font-sans">
                <span className="font-medium">Subtotal</span>
                <span className="font-mono">${card.price.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-xs text-zinc-400 font-sans">
                <span className="font-medium">Tax & Platform Ingress</span>
                <span className="font-mono text-zinc-600">$0.00</span>
              </div>

              <div className="flex justify-between items-center text-xs text-zinc-400 font-sans">
                <span className="font-medium">Instant Activation Fee</span>
                <span className="font-mono text-lime-500">FREE</span>
              </div>

              <hr className="border-zinc-900 border-dashed" />

              <div className="flex justify-between items-center text-sm font-sans pt-1">
                <span className="text-white font-bold uppercase tracking-wide">Total Order Cost</span>
                <span className="font-mono text-[#adff2f] text-base font-black">${card.price.toFixed(2)}</span>
              </div>
            </div>

            {/* SSL protection statement */}
            <div className="pt-4 border-t border-zinc-900/60 text-center space-y-2">
              <p className="text-[9px] font-mono uppercase tracking-wider text-emerald-400 font-bold leading-relaxed">
                YOUR INFORMATION IS PROTECTED BY 256-BIT SSL ENCRYPTION
              </p>
              <p className="text-[10px] text-zinc-500 font-sans uppercase font-bold tracking-widest">
                SSL SECURED PAYMENT
              </p>
              <div className="flex items-center justify-center gap-2 pt-1 opacity-50 text-[8px] font-bold font-mono">
                <span className="border border-zinc-800 px-1 py-0.5 rounded text-white">VISA</span>
                <span className="border border-zinc-800 px-1 py-0.5 rounded text-white">MASTERCARD</span>
                <span className="border border-zinc-800 px-1 py-0.5 rounded text-white">DISCOVER</span>
                <span className="border border-zinc-800 px-1 py-0.5 rounded text-white">AMEX</span>
                <span className="border border-zinc-800 px-1 py-0.5 rounded text-white">M-PESA</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
