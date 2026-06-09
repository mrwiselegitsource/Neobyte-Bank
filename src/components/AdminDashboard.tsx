import React, { useState } from 'react';
import { PrepaidCard, CardBrand } from '../types';
import { ShieldCheck, Plus, Trash2, Image, FileText, Check, AlertTriangle, Users, Sliders } from 'lucide-react';

interface AdminDashboardProps {
  cards: PrepaidCard[];
  onAddCard: (card: PrepaidCard) => void;
  onDeleteCard: (id: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  cards,
  onAddCard,
  onDeleteCard,
}) => {
  // Form fields
  const [brand, setBrand] = useState<CardBrand>('Mastercard');
  const [name, setName] = useState('');
  const [price, setPrice] = useState<string>('49.99');
  const [limit, setLimit] = useState<string>('5000');
  const [imageURL, setImageURL] = useState('');
  const [description, setDescription] = useState('');
  const [customTags, setCustomTags] = useState('New, Admin Addition');
  const [country, setCountry] = useState('United States');
  const [address, setAddress] = useState('733 Bank Road Corporate HQ');

  // Interactive feedback state
  const [alertMessage, setAlertMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Derive responsive brand visual themes
  const getBrandDetails = (selectedBrand: CardBrand) => {
    switch (selectedBrand) {
      case 'Visa':
        return {
          color: 'from-[#0A2626] to-[#030D0D] hover:border-teal-400',
          textHighlight: 'text-teal-400',
          prefix: '4204',
        };
      case 'Amex':
        return {
          color: 'from-[#4C3B1E] to-[#1A140A] hover:border-yellow-500',
          textHighlight: 'text-yellow-500',
          prefix: '3782',
        };
      case 'Discover':
        return {
          color: 'from-[#4D0F1D] to-[#1C050A] hover:border-red-400',
          textHighlight: 'text-red-400',
          prefix: '6011',
        };
      case 'Atmos':
        return {
          color: 'from-[#0C1B2B] to-[#04090F] hover:border-blue-400',
          textHighlight: 'text-sky-400',
          prefix: '4938',
        };
      default: // Mastercard
        return {
          color: 'from-[#112F11] to-[#040C04] hover:border-[#adff2f]',
          textHighlight: 'text-lime-400',
          prefix: '5574',
        };
    }
  };

  const handleCreateCard = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setAlertMessage({ type: 'error', text: 'Card title model name is required' });
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setAlertMessage({ type: 'error', text: 'Price must be a positive number' });
      return;
    }

    const limitNum = parseInt(limit);
    if (isNaN(limitNum) || limitNum < 100) {
      setAlertMessage({ type: 'error', text: 'Spending Limit must be at least $100' });
      return;
    }

    const brandTheme = getBrandDetails(brand);

    // Simulate standard Luhn number attributes
    const numBlock2 = Math.floor(1000 + Math.random() * 9000).toString();
    const numBlock3 = Math.floor(1000 + Math.random() * 9000).toString();
    const numBlock4 = Math.floor(1000 + Math.random() * 9000).toString();
    const simulatedCardNumber = `${brandTheme.prefix} ${numBlock2} ${numBlock3} ${numBlock4}`;

    // Create PrepaidCard object conforming to Types definitions
    const newCard: PrepaidCard = {
      id: `card-${Date.now()}`,
      brand,
      name: name.trim(),
      price: priceNum,
      originalPrice: parseFloat((priceNum * 1.2).toFixed(2)),
      limit: limitNum,
      cardNumber: simulatedCardNumber,
      expiry: '12/2030',
      cvv: Math.floor(100 + Math.random() * 900).toString(),
      accountHolder: 'AUTHORIZATION NODE',
      address: address.trim() || 'Central Ledger Substation',
      country: country.trim() || 'Global',
      tags: customTags.split(',').map(t => t.trim()).filter(t => t.length > 0),
      color: brandTheme.color,
      textHighlight: brandTheme.textHighlight,
      description: description.trim() || `Enterprise grade virtual proxy built for flexible checkout options. Auto-assigned with a clean $${limitNum.toLocaleString()} spending threshold.`,
      imageURL: imageURL.trim() || undefined,
    };

    onAddCard(newCard);

    // Reset Form Fields
    setName('');
    setPrice('49.99');
    setLimit('5000');
    setImageURL('');
    setDescription('');
    setAlertMessage({ type: 'success', text: `Success: "${newCard.name}" card configuration has been added to live stock!` });

    // Smooth scroll to top of card manager
    setTimeout(() => {
      setAlertMessage(null);
    }, 4000);
  };

  const activeTheme = getBrandDetails(brand);

  return (
    <div className="w-full bg-black py-10 px-4 min-h-[80vh]" id="admin-dashboard-container">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Admin Dashboard Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-900 pb-6 gap-6">
          <div className="text-left space-y-2">
            <span className="inline-block text-[9px] font-mono px-2 py-0.5 rounded bg-lime-950/80 border border-[#adff2f]/30 text-[#adff2f] font-bold uppercase tracking-wider">
              Secure Ledger Node
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-white tracking-tight uppercase" id="admin-title">
              ADMIN <span className="text-[#adff2f]">DASHBOARD</span>
            </h2>
            <p className="text-xs text-zinc-500 max-w-xl font-sans leading-relaxed">
              Authorized admin console. Create and register virtual credit nodes directly into NeoByte's network catalog database, or review the current stock allocations.
            </p>
          </div>

          <div className="flex items-center space-x-2 p-3 bg-zinc-950 border border-zinc-900 rounded-xl text-left">
            <ShieldCheck className="w-5 h-5 text-[#adff2f]" />
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">Ledger Integrity Status</span>
              <span className="text-xs font-mono font-bold text-white uppercase">VALID & ENCRYPTED</span>
            </div>
          </div>
        </div>

        {/* Action feedback message */}
        {alertMessage && (
          <div 
            className={`p-4 rounded-xl text-xs font-mono border flex items-center space-x-2.5 animate-in fade-in duration-300 ${
              alertMessage.type === 'success'
                ? 'bg-[#122812]/40 border-lime-500/30 text-lime-400'
                : 'bg-red-950/20 border-red-500/30 text-red-400'
            }`}
          >
            <Check className="w-4 h-4 shrink-0" />
            <span>{alertMessage.text}</span>
          </div>
        )}

        {/* Split UI Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Card Showcase / Realtime Live Preview (Left Area) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-zinc-950/55 p-6 rounded-2xl border border-zinc-900 flex flex-col justify-between space-y-6">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#adff2f] block text-left">
                &bull; Real-Time Card Node Preview
              </span>

              {/* Virtual Card Mockup */}
              <div 
                className={`relative w-full aspect-[1.58/1] rounded-2xl border border-[#adff2f]/20 p-5 flex flex-col justify-between shadow-[0_0_24px_rgba(173,255,47,0.05)] transition-all overflow-hidden bg-gradient-to-br ${activeTheme.color}`}
                style={imageURL ? { backgroundImage: `url(${imageURL})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
              >
                {/* Background image overlay filter for content readability */}
                {imageURL && <div className="absolute inset-0 bg-black/60 -z-0" />}

                <div className="flex items-start justify-between z-10 relative">
                  <div>
                    <span className="text-[8px] font-mono tracking-widest text-[#adff2f] font-bold block">NEOBYTE BANK</span>
                    <span className="text-[9px] text-zinc-400 font-sans tracking-tight mt-0.5 uppercase block">PREPAID LIVE PREVIEW</span>
                  </div>
                  <span className="text-sm text-white font-mono font-extrabold">{brand}</span>
                </div>

                <div className="w-9 h-7 rounded bg-gradient-to-r from-yellow-500/95 to-yellow-600/90 border border-yellow-400/40 p-0.5 z-10 relative">
                  <div className="w-full h-full border border-yellow-900/10" />
                </div>

                <div className="space-y-1 text-left z-10 relative">
                  <p className="text-xs sm:text-sm text-white font-mono tracking-widest font-bold">
                    {activeTheme.prefix} **** **** {Math.floor(1000 + Math.random() * 9000)}
                  </p>
                  <div className="flex justify-between items-center text-[8px] text-[#adff2f] font-mono uppercase">
                    <span className="truncate max-w-[150px] font-bold tracking-wide">{name.trim().toUpperCase() || 'NEW CARD PROXY'}</span>
                    <span>12/12</span>
                  </div>
                </div>
              </div>

              {/* Brief spec detail overlay preview */}
              <div className="border border-zinc-900 rounded-xl overflow-hidden text-xs text-left">
                <div className="grid grid-cols-2 py-2 px-3 border-b border-zinc-900 bg-zinc-950/50">
                  <span className="text-zinc-500">Node Identifier</span>
                  <span className="text-white font-mono text-right truncate">NEO-T-{Date.now().toString().slice(-6)}</span>
                </div>
                <div className="grid grid-cols-2 py-2 px-3 border-b border-zinc-900">
                  <span className="text-zinc-500">Retail Cost</span>
                  <span className="text-[#adff2f] font-mono text-right font-bold">${parseFloat(price || '0').toFixed(2)} USD</span>
                </div>
                <div className="grid grid-cols-2 py-2 px-3">
                  <span className="text-zinc-500">Threshold Limit</span>
                  <span className="text-white font-mono text-right font-bold">${parseInt(limit || '0').toLocaleString()}/Month</span>
                </div>
              </div>

            </div>
          </div>

          {/* Form Controls Input Area (Right Area) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleCreateCard} className="bg-zinc-950 p-6 sm:p-8 rounded-2xl border border-zinc-900 space-y-6 text-left">
              
              <div className="flex items-center space-x-2 border-b border-zinc-900 pb-3">
                <Sliders className="w-5 h-5 text-[#adff2f]" />
                <h3 className="text-white text-xs font-bold font-mono uppercase tracking-wider">
                  Prepaid Card Schema Form
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Brand Selector */}
                <div className="space-y-1.5 focus-within:text-white">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500">Card Issuer Brand</label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value as CardBrand)}
                    className="w-full text-xs bg-zinc-900 border border-zinc-800 focus:border-[#adff2f]/30 p-2.5 rounded-xl text-white outline-none cursor-pointer focus:ring-1 focus:ring-[#adff2f]/10"
                  >
                    <option value="Mastercard">Mastercard Network</option>
                    <option value="Visa">Visa Alliance</option>
                    <option value="Amex">American Express</option>
                    <option value="Discover">Discover Group</option>
                    <option value="Atmos">Atmos Specialized Credit</option>
                  </select>
                </div>

                {/* Name Input */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500">Card Model Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NeoByte Diamond Visa"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs bg-zinc-900 border border-zinc-800 focus:border-[#adff2f]/30 p-2.5 rounded-xl text-white outline-none focus:ring-1 focus:ring-[#adff2f]/10 placeholder:text-zinc-650"
                  />
                </div>

                {/* Price Input */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500">Retail Registration Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="e.g. 45.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full text-xs bg-zinc-900 border border-zinc-800 focus:border-[#adff2f]/30 p-2.5 rounded-xl text-white outline-none focus:ring-1 focus:ring-[#adff2f]/10 font-mono"
                  />
                </div>

                {/* Limit Input */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500">Credit Limit Volume ($)</label>
                  <input
                    type="number"
                    step="50"
                    required
                    placeholder="e.g. 5000"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                    className="w-full text-xs bg-zinc-900 border border-zinc-800 focus:border-[#adff2f]/30 p-2.5 rounded-xl text-white outline-none focus:ring-1 focus:ring-[#adff2f]/10 font-mono"
                  />
                </div>

              </div>

              {/* imageURL Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                    Background Custom Image URL
                  </label>
                  <span className="text-[8px] font-mono text-zinc-600 uppercase">Optional Custom Vector / JPEG</span>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-500">
                    <Image className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="url"
                    placeholder="e.g. https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                    className="w-full text-xs bg-zinc-900 border border-zinc-800 focus:border-[#adff2f]/30 pl-9 pr-3 py-2.5 rounded-xl text-white outline-none focus:ring-1 focus:ring-[#adff2f]/10 font-mono"
                  />
                </div>
              </div>

              {/* Description box */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500">Card Specifications Description</label>
                <textarea
                  rows={2}
                  placeholder="Detail custom security credentials, features, or restrictions..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs bg-zinc-900 border border-zinc-800 focus:border-[#adff2f]/30 p-2.5 rounded-xl text-white outline-none focus:ring-1 focus:ring-[#adff2f]/10 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                {/* Semi-tags input */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500">Tags (Comma-Separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. Popular, High Limit, Hot"
                    value={customTags}
                    onChange={(e) => setCustomTags(e.target.value)}
                    className="w-full text-xs bg-zinc-900 border border-zinc-800 focus:border-[#adff2f]/30 p-2.5 rounded-xl text-white outline-none"
                  />
                </div>

                {/* Country scope */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500">Card Base Country Access</label>
                  <input
                    type="text"
                    placeholder="e.g. United States"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full text-xs bg-zinc-900 border border-zinc-800 focus:border-[#adff2f]/30 p-2.5 rounded-xl text-white outline-none"
                  />
                </div>

              </div>

              {/* Submit Trigger Action */}
              <button
                type="submit"
                id="create-card-btn"
                className="w-full py-4 bg-[#adff2f] hover:bg-[#bbf04d] text-black font-sans font-extrabold text-xs tracking-widest uppercase rounded-xl transition-all shadow-md shadow-[#adff2f]/10 flex items-center justify-center space-x-2 cursor-pointer mt-4"
              >
                <Plus className="w-4 h-4 text-black" />
                <span>CONFIRM CARD CONFIGURATION</span>
              </button>

            </form>
          </div>

        </div>

        {/* Existing Inventory Management (Full Width Below) */}
        <div className="bg-zinc-950 rounded-2xl border border-zinc-900 p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-900 pb-4 gap-4 text-left">
            <h3 className="text-white text-base font-sans font-bold uppercase tracking-wide">
              Live Stock Catalog Index <span className="text-[#adff2f] font-mono">({cards.length})</span>
            </h3>
            <span className="text-[10px] font-mono text-zinc-500 uppercase">
              Immediate changes applied to prepaid listing panel
            </span>
          </div>

          {/* Catalog Inventory Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-zinc-900 text-zinc-500 uppercase tracking-wider text-[10px] font-mono">
                  <th className="pb-3 font-semibold text-left">Card Profile</th>
                  <th className="pb-3 font-semibold text-left">Brand</th>
                  <th className="pb-3 font-semibold text-left">Monthly Limit</th>
                  <th className="pb-3 font-semibold text-left">Price ($)</th>
                  <th className="pb-3 font-semibold text-left">Tags</th>
                  <th className="pb-3 font-semibold text-right">Delete Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/60 font-medium">
                {cards.map((card) => (
                  <tr key={card.id} className="hover:bg-zinc-900/20 transition-all text-zinc-300">
                    <td className="py-4">
                      <div className="flex items-center space-x-3 text-left">
                        <div className={`w-10 h-6 rounded bg-gradient-to-br ${card.color} border border-zinc-800 shrink-0 relative overflow-hidden`} >
                          {card.imageURL && (
                            <img src={card.imageURL} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div>
                          <span className="text-white font-sans text-xs font-bold hover:text-[#adff2f] block">{card.name}</span>
                          <span className="text-[9px] text-[#adff2f] font-mono">{card.cardNumber.split(' ')[0]} **** {card.cardNumber.split(' ')[3] || '7378'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 font-mono text-zinc-400 font-bold uppercase">{card.brand}</td>
                    <td className="py-4 font-mono text-white font-bold">${card.limit.toLocaleString()}</td>
                    <td className="py-4 font-mono font-bold text-[#adff2f]">${card.price.toFixed(2)}</td>
                    <td className="py-4">
                      <div className="flex flex-wrap gap-1">
                        {card.tags.slice(0, 2).map((tg, i) => (
                          <span key={i} className="text-[8px] font-mono bg-zinc-900 text-zinc-500 px-1.5 py-0.5 rounded font-bold uppercase">
                            {tg}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <button
                        onClick={() => onDeleteCard(card.id)}
                        className="p-2 bg-red-950/20 hover:bg-red-950/80 border border-red-900/30 text-rose-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                        title="Delete this card configuration"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
