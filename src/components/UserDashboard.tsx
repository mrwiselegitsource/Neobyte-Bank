import React, { useState } from 'react';
import { CreditCard, Eye, EyeOff, ShieldCheck, Lock, Unlock, Sliders, AlertCircle, Edit3, KeyRound, Plus, Trash2, Tag, Calendar, DollarSign, Fingerprint } from 'lucide-react';
import { PurchasedCard } from '../types';

interface UserDashboardProps {
  purchasedCards: PurchasedCard[];
  onFreezeToggle: (id: string) => void;
  onUpdateLimit: (id: string, limit: number) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onDeleteCard: (id: string) => void;
  onGoToShop: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  purchasedCards,
  onFreezeToggle,
  onUpdateLimit,
  onUpdateNotes,
  onDeleteCard,
  onGoToShop
}) => {
  const [revealedCardId, setRevealedCardId] = useState<string | null>(null);
  const [pinPromptCardId, setPinPromptCardId] = useState<string | null>(null);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Edit notes states
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState('');

  const handleRevealClick = (id: string) => {
    const card = purchasedCards.find(c => c.id === id);
    if (!card) return;
    if (card.isFrozen) return; // Prevent reveal on frozen cards

    if (revealedCardId === id) {
      setRevealedCardId(null);
    } else {
      // Trigger security verification challenge
      setPinPromptCardId(id);
      setPinInput('');
      setPinError('');
    }
  };

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === '0000' || pinInput.length >= 4) {
      setRevealedCardId(pinPromptCardId);
      setPinPromptCardId(null);
      setPinInput('');
      setPinError('');
    } else {
      setPinError('Invalid credit code PIN. Try again. (Tip: Enter any 4-digit PIN)');
    }
  };

  const handleQuickBiometricVerify = () => {
    setRevealedCardId(pinPromptCardId);
    setPinPromptCardId(null);
    setPinInput('');
    setPinError('');
  };

  const startEditingNotes = (id: string, existingNotes: string) => {
    setEditingCardId(id);
    setNoteInput(existingNotes || '');
  };

  const saveNotes = (id: string) => {
    onUpdateNotes(id, noteInput);
    setEditingCardId(null);
  };

  return (
    <div className="w-full bg-[#030603]/80 py-12 px-4 shadow-inner min-h-[70vh]" id="wallet-dashboard-container">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Module Header */}
        <div className="text-center md:text-left flex flex-col md:flex-row items-center justify-between border-b border-zinc-900 pb-6 gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl font-sans font-extrabold text-white tracking-tight uppercase">
              MY ACTIVE <span className="text-[#adff2f]">CARDS WALLET</span>
            </h1>
            <p className="text-xs text-zinc-500 max-w-xl font-sans leading-relaxed">
              Securely orchestrate. Reveal CVVs under biometrics, instantly freeze cards, change temporary limits, and write customized tag labels for subscription tracking.
            </p>
          </div>

          <button
            onClick={onGoToShop}
            id="wallet-add-cards-btn"
            className="flex items-center space-x-1.5 bg-[#adff2f]/10 border border-[#adff2f]/30 hover:border-[#adff2f] text-[#adff2f] hover:bg-[#adff2f]/20 font-sans text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#adff2f]" />
            <span>Generate Cards</span>
          </button>
        </div>

        {purchasedCards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="wallet-cards-grid">
            {purchasedCards.map((card) => {
              const isRevealed = revealedCardId === card.id;

              return (
                <div
                  key={card.id}
                  id={`wallet-card-${card.id}`}
                  className="bg-zinc-950/90 border border-zinc-900 rounded-2xl p-5 md:p-6 space-y-6 relative hover:border-zinc-800 transition-all flex flex-col justify-between"
                >
                  
                  {/* Frosted glass active lock state layout */}
                  {card.isFrozen && (
                    <div className="absolute inset-0 bg-[#040D04]/40 backdrop-blur-xs rounded-2xl z-10 flex flex-col items-center justify-center p-4 border border-rose-500/20">
                      <Lock className="w-10 h-10 text-rose-500 animate-pulse mb-2.5" />
                      <h4 className="text-white text-xs font-bold uppercase tracking-widest font-mono">
                        CARD IS FROZEN / LOCKED
                      </h4>
                      <p className="text-[10px] text-zinc-400 mt-1 max-w-xs text-center leading-normal">
                        Unlock this proxy card using the bottom control button to permit transactions.
                      </p>
                    </div>
                  )}

                  {/* Card mockup view */}
                  <div className={`w-full aspect-[1.58/1] rounded-2xl p-5 bg-gradient-to-br ${
                    card.brand === 'Mastercard' ? 'from-[#112F11] to-[#040C04]' :
                    card.brand === 'Visa' ? 'from-[#0C1B2B] to-[#04090F]' :
                    card.brand === 'Amex' ? 'from-[#3A1448] to-[#120518]' :
                    'from-zinc-900 to-black'
                  } border border-[#adff2f]/15 flex flex-col justify-between shadow-lg relative overflow-hidden group`}>
                    
                    {/* Glowing highlight indicator */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#adff2f]/5 blur-3xl pointer-events-none" />

                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[7px] font-mono tracking-widest text-[#adff2f] font-bold block">NEOBYTE BANK</span>
                        <span className="text-[9px] text-zinc-400 font-sans tracking-tight uppercase font-medium">Core Private Server</span>
                      </div>
                      <span className="text-xs text-white font-mono font-black">{card.brand}</span>
                    </div>

                    <div className="w-9 h-7 rounded-sm bg-gradient-to-r from-yellow-500 to-yellow-600 border border-yellow-400/50 flex-shrink-0" />

                    <div className="space-y-1">
                      {/* Mask vs Reveal animation text */}
                      <p className="text-base text-white font-mono tracking-widest text-left font-bold select-none whitespace-nowrap">
                        {isRevealed ? card.cardNumber : `${card.cardNumber.substring(0, 4)} **** **** ${card.cardNumber.substring(15)}`}
                      </p>
                      
                      <div className="flex justify-between items-center text-[8px] text-zinc-400 font-mono">
                        <span className="truncate max-w-[120px] uppercase font-bold">{card.accountHolder}</span>
                        <div className="flex space-x-3">
                          <span>EXP: {card.expiry}</span>
                          <span className="text-[#adff2f] font-bold">
                            CVV: {isRevealed ? card.cvv : '***'}
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Management parameters stack */}
                  <div className="space-y-4">
                    
                    {/* Details status metadata block */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono border-b border-zinc-900 pb-3">
                      <div className="text-left space-y-1">
                        <span className="text-zinc-650 uppercase block">Purchase Date</span>
                        <span className="text-zinc-400 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                          {card.purchaseDate}
                        </span>
                      </div>
                      <div className="text-right space-y-1">
                        <span className="text-zinc-650 uppercase block">Active Limit</span>
                        <span className="text-[#adff2f] font-bold flex items-center justify-end gap-0.5">
                          <DollarSign className="w-3.5 h-3.5" />
                          ${card.limit.toLocaleString()}/mo
                        </span>
                      </div>
                    </div>

                    {/* Adjustable Credit limit scale sliders */}
                    <div className="space-y-1.5 text-left border-b border-zinc-900 pb-3">
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                        <span className="flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5" />
                          Spend Limit Volume
                        </span>
                        <span className="text-[#adff2f] font-bold">${card.limit.toLocaleString()} USD</span>
                      </div>
                      <input
                        type="range"
                        min="200"
                        max="24000"
                        step="100"
                        value={card.limit}
                        onChange={(e) => onUpdateLimit(card.id, parseInt(e.target.value))}
                        className="w-full h-1 bg-zinc-900 rounded appearance-none cursor-pointer accent-[#adff2f]"
                      />
                    </div>

                    {/* Annotation reference notes */}
                    <div className="space-y-2 text-left bg-zinc-950/40 p-3 rounded-xl border border-zinc-900">
                      <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono uppercase">
                        <span className="flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5" />
                          Annotation Card Tag
                        </span>
                        {editingCardId !== card.id && (
                          <button
                            onClick={() => startEditingNotes(card.id, card.notes || '')}
                            className="text-lime-400 hover:text-white transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {editingCardId === card.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="e.g. AWS development account"
                            value={noteInput}
                            onChange={(e) => setNoteInput(e.target.value)}
                            className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-[#adff2f]/30 p-1.5 rounded-lg text-xs text-white"
                          />
                          <button
                            onClick={() => saveNotes(card.id)}
                            className="px-2.5 py-1.5 bg-[#adff2f] hover:bg-[#bbf04d] text-black font-sans text-[10px] font-bold uppercase rounded-lg"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <p className="text-zinc-400 font-sans text-xs italic">
                          {card.notes || 'No annotation tag. Create one to keep track of this credit source.'}
                        </p>
                      )}
                    </div>

                  </div>

                  {/* Complete wallet toggles row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-900 mt-2 z-20 position-relative">
                    
                    <button
                      onClick={() => handleRevealClick(card.id)}
                      className={`flex items-center gap-1.5 text-xs font-mono font-bold uppercase py-2 px-3 rounded-xl cursor-pointer transition-all ${
                        isRevealed 
                          ? 'bg-[#adff2f]/15 border border-[#adff2f]/30 text-[#adff2f]' 
                          : 'bg-zinc-900 border border-zinc-850 hover:border-zinc-700 text-zinc-300'
                      }`}
                    >
                      {isRevealed ? (
                        <>
                          <EyeOff className="w-4 h-4" />
                          <span>Mask details</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 text-lime-400" />
                          <span>Reveal Details</span>
                        </>
                      )}
                    </button>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => onFreezeToggle(card.id)}
                        className={`flex items-center gap-1.5 text-xs font-mono font-bold uppercase py-2 px-3 rounded-xl border cursor-pointer transition-all ${
                          card.isFrozen
                            ? 'bg-rose-500 text-white border-rose-450 shadow-md shadow-rose-950/25'
                            : 'bg-zinc-900 text-zinc-300 border-zinc-850 hover:border-zinc-700'
                        }`}
                      >
                        {card.isFrozen ? (
                          <>
                            <Unlock className="w-4 h-4" />
                            <span>Unlock</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 text-rose-500" />
                            <span>Freeze</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          if (confirm('Verify deleting this prepaid proxy card from your active list? This is irreversible.')) {
                            onDeleteCard(card.id);
                          }
                        }}
                        className="p-2 border border-zinc-850 hover:border-red-500/20 bg-zinc-900 hover:bg-red-950/20 text-zinc-500 hover:text-red-400 rounded-xl transition-all cursor-pointer"
                        title="Delete Card"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-24 text-center flex flex-col items-center justify-center space-y-4 max-w-sm mx-auto bg-zinc-950/60 p-8 rounded-2xl border border-zinc-900">
            <CreditCard className="w-12 h-12 text-zinc-700 mx-auto" />
            <h3 className="text-white text-base font-sans font-bold uppercase tracking-wider">
              No Generated Cards Found
            </h3>
            <p className="text-xs text-zinc-500 font-sans leading-relaxed">
              Your wallet folder is currently empty. Explore our stock parameters to select and activate your custom global proxy.
            </p>
            <button
              onClick={onGoToShop}
              className="px-5 py-2.5 bg-[#adff2f] hover:bg-[#bbf04d] text-black font-sans font-extrabold text-xs tracking-widest uppercase rounded-xl transition-all shadow-md mt-2 cursor-pointer"
            >
              Configure Live Card
            </button>
          </div>
        )}

      </div>

      {/* Embedded security reveal credentials popup PIN / Biometrics simulator challange */}
      {pinPromptCardId && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" id="pin-challenge-overlay">
          <form 
            onSubmit={handleVerifyPin}
            className="w-full max-w-sm bg-[#090F09] border border-[#adff2f]/20 rounded-2xl p-6 text-center text-white space-y-5 shadow-2xl relative"
            id="pin-challenge-card"
          >
            <button
              type="button"
              onClick={() => setPinPromptCardId(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white"
            >
              <Trash2 className="w-4 h-4 rotate-45" />
            </button>

            <div className="mx-auto w-12 h-12 bg-[#122812] border border-[#adff2f]/20 rounded-full flex items-center justify-center text-[#adff2f]">
              <KeyRound className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-bold uppercase font-mono tracking-wider text-[#adff2f]">
                Security PIN Challenge
              </h3>
              <p className="text-[11px] text-zinc-400 font-sans">
                A verification PIN is required to unveil sensitive card account information.
              </p>
            </div>

            {pinError && (
              <p className="text-[10px] font-mono text-red-400 bg-red-950/30 p-2 border border-red-500/20 rounded-lg">
                {pinError}
              </p>
            )}

            {/* Quick Demo hint */}
            <p className="text-[9px] font-mono text-zinc-550 leading-relaxed text-left border-l border-zinc-800 pl-2">
              Tip: Enter your account PIN (e.g., <span className="text-[#adff2f]">1234</span> or <span className="text-emerald-400">0000</span>) or use the biometric scanning trigger below to identify.
            </p>

            <div className="space-y-1">
              <input
                type="password"
                maxLength={6}
                required
                placeholder="••••••"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError('');
                }}
                className="w-full text-center text-base tracking-widest bg-zinc-950 border border-zinc-800 p-2.5 rounded-xl text-[#adff2f] outline-none font-mono focus:border-[#adff2f]/30"
              />
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-[#adff2f] hover:bg-[#bbf04d] text-black font-sans font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all"
              >
                Verify Code
              </button>

              <button
                type="button"
                onClick={handleQuickBiometricVerify}
                className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-850 hover:text-white border border-zinc-800 text-zinc-400 font-sans text-xs font-bold uppercase rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Fingerprint className="w-4 h-4 text-emerald-400" />
                <span>Verify Biometrics</span>
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
};
