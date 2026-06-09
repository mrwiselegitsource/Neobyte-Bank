/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { CardListing } from './components/CardListing';
import { CardDetail } from './components/CardDetail';
import { Checkout } from './components/Checkout';
import { PaymentPortal } from './components/PaymentPortal';
import { UserDashboard } from './components/UserDashboard';
import { AuthModal } from './components/AuthModal';
import { AdminDashboard } from './components/AdminDashboard';
import { PrepaidCard, User, PurchasedCard } from './types';
import { INITIAL_CARDS } from './data/cards';
import { ShieldCheck, Mail, Globe, Users, FileText, CheckCircle, Smartphone, X } from 'lucide-react';


export default function App() {
  // Store available cards and filters - local device catalog seeded on mount or customized in the admin panel
  const [cards, setCards] = useState<PrepaidCard[]>(() => {
    const saved = localStorage.getItem('neobyte_cards');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {}
    }
    // Set fallback seed
    localStorage.setItem('neobyte_cards', JSON.stringify(INITIAL_CARDS));
    return INITIAL_CARDS;
  });

  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  
  // User Authentication State - tracked locally on current device
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('neobyte_user_auth');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.email) {
          return parsed;
        }
      } catch (e) {}
    }
    return { username: '', email: '', isLoggedIn: false };
  });

  // Tab & Routing State
  const [activeTab, setActiveTab] = useState<'shop' | 'dashboard' | 'admin'>('shop');
  const [viewState, setViewState] = useState<'catalog' | 'detail' | 'checkout' | 'payment_portal'>('catalog');
  const [selectedCard, setSelectedCard] = useState<PrepaidCard | null>(null);

  // Checkout inputs
  const [billingFirstName, setBillingFirstName] = useState('');
  const [billingLastName, setBillingLastName] = useState('');

  // Local Wallet storage for cataloged instances, partition by user email
  const [allPurchasedCards, setAllPurchasedCards] = useState<PurchasedCard[]>(() => {
    const saved = localStorage.getItem('neobyte_purchasedCards');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed)) {
          return parsed;
        }
      } catch (e) {}
    }
    const initial = [
      {
        id: 'purchased-1',
        brand: 'Mastercard' as const,
        name: 'NeoByte Classic MasterCard',
        price: 50.00,
        limit: 3800,
        cardNumber: '5574 4291 0834 7378',
        expiry: '03/2029',
        cvv: '812',
        accountHolder: 'Emelyan Melilkus',
        purchaseDate: '2026-05-18',
        isFrozen: false,
        notes: 'Amazon Web Services node subscription',
        ownerEmail: 'manmagic550@yahoo.com'
      },
      {
        id: 'purchased-2',
        brand: 'Visa' as const,
        name: 'Atmos Visa Signature',
        price: 50.00,
        limit: 42000,
        cardNumber: '4204 5582 3912 6269',
        expiry: '10/2027',
        cvv: '109',
        accountHolder: 'Forrest Vincent',
        purchaseDate: '2026-05-24',
        isFrozen: false,
        notes: 'Google AdWords agency checkout baseline',
        ownerEmail: 'manmagic550@yahoo.com'
      }
    ];
    localStorage.setItem('neobyte_purchasedCards', JSON.stringify(initial));
    return initial;
  });

  // Dynamically compute the active user's cards based on their session email
  const purchasedCards = allPurchasedCards.filter(card => {
    if (user.isLoggedIn) {
      return (card as any).ownerEmail === user.email;
    } else {
      return !(card as any).ownerEmail || (card as any).ownerEmail === 'guest';
    }
  });

  // Auth Modal trigger
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Legal Modal trigger
  const [legalModal, setLegalModal] = useState<{
    isOpen: boolean;
    title: string;
    type: 'privacy' | 'terms' | 'contact';
  }>({
    isOpen: false,
    title: '',
    type: 'privacy'
  });

  // Contact Support State
  const [supportName, setSupportName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSuccess, setSupportSuccess] = useState(false);

  // Load state from local storage securely & establish local database interfaces
  useEffect(() => {
    // 1. Seed default accounts if they aren't registered yet in this browser instance
    const usersStr = localStorage.getItem('neobyte_registered_users');
    let registeredUsers = [];
    if (usersStr) {
      try {
        registeredUsers = JSON.parse(usersStr);
      } catch (e) {
        registeredUsers = [];
      }
    }
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
      localStorage.setItem('neobyte_registered_users', JSON.stringify(seedUsers));
    }

    // 2. Set client-side visitor counter
    const savedCount = localStorage.getItem('neobyte_visitor_count');
    const currentCount = savedCount ? parseInt(savedCount, 10) + 1 : 1642;
    localStorage.setItem('neobyte_visitor_count', currentCount.toString());
    setVisitorCount(currentCount);
  }, []);

  const handleLoginSuccess = (username: string, email: string, firstName?: string, lastName?: string) => {
    const freshUser: User = { username, email, firstName, lastName, isLoggedIn: true };
    setUser(freshUser);
    localStorage.setItem('neobyte_user_auth', JSON.stringify(freshUser));
  };

  const handleLogout = () => {
    const defaultUser: User = { username: '', email: '', isLoggedIn: false };
    setUser(defaultUser);
    localStorage.removeItem('neobyte_user_auth');
    setActiveTab('shop');
  };

  const handleSelectCard = (card: PrepaidCard) => {
    setSelectedCard(card);
    setViewState('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToPayment = (firstName: string, lastName: string) => {
    setBillingFirstName(firstName);
    setBillingLastName(lastName);
    setViewState('payment_portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentValidated = (notes?: string) => {
    if (!selectedCard) return;

    // Generate simulated dynamic CVV and card numbers
    const randomCVV = Math.floor(100 + Math.random() * 900).toString();
    
    const newPurchase: PurchasedCard & { ownerEmail?: string } = {
      id: `purchased-${Date.now()}`,
      brand: selectedCard.brand,
      name: selectedCard.name,
      price: selectedCard.price,
      limit: selectedCard.limit,
      cardNumber: selectedCard.cardNumber,
      expiry: selectedCard.expiry,
      cvv: randomCVV,
      accountHolder: `${billingFirstName} ${billingLastName}`.toUpperCase(),
      purchaseDate: new Date().toISOString().split('T')[0],
      isFrozen: false,
      notes: notes || `Created: Customized spent threshold set to $${selectedCard.limit}`,
      ownerEmail: user.isLoggedIn ? user.email : 'guest'
    };

    const updated = [newPurchase, ...allPurchasedCards];
    setAllPurchasedCards(updated);
    localStorage.setItem('neobyte_purchasedCards', JSON.stringify(updated));

    // Redirect to wallet cabinet
    setViewState('catalog');
    setSelectedCard(null);
    setActiveTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFreezeToggle = (id: string) => {
    const updated = allPurchasedCards.map(c => c.id === id ? { ...c, isFrozen: !c.isFrozen } : c);
    setAllPurchasedCards(updated);
    localStorage.setItem('neobyte_purchasedCards', JSON.stringify(updated));
  };

  const handleUpdateLimit = (id: string, limit: number) => {
    const updated = allPurchasedCards.map(c => c.id === id ? { ...c, limit } : c);
    setAllPurchasedCards(updated);
    localStorage.setItem('neobyte_purchasedCards', JSON.stringify(updated));
  };

  const handleUpdateNotes = (id: string, notes: string) => {
    const updated = allPurchasedCards.map(c => c.id === id ? { ...c, notes } : c);
    setAllPurchasedCards(updated);
    localStorage.setItem('neobyte_purchasedCards', JSON.stringify(updated));
  };

  const handleDeleteCard = (id: string) => {
    const updated = allPurchasedCards.filter(c => c.id !== id);
    setAllPurchasedCards(updated);
    localStorage.setItem('neobyte_purchasedCards', JSON.stringify(updated));
  };

  const handleOpenPrivacyTerms = (title: string, type: 'privacy' | 'terms' | 'contact') => {
    setSupportSuccess(false);
    setLegalModal({ isOpen: true, title, type });
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSupportSuccess(true);
    setSupportMessage('');
    setTimeout(() => {
      setLegalModal({ isOpen: false, title: '', type: 'privacy' });
      setSupportSuccess(false);
    }, 2500);
  };

  const isAdmin = user.isLoggedIn &&
    user.email.toLowerCase().startsWith('bankadmin') &&
    user.email.toLowerCase().endsWith('admin.com');

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col justify-between">
      
      {/* Dynamic Header */}
      <Header
        user={user}
        onLogout={handleLogout}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setViewState('catalog');
        }}
        purchasedCount={purchasedCards.length}
      />

      {/* Main Port Layout */}
      <main className="flex-1">
        {activeTab === 'shop' ? (
          <>
            {viewState === 'catalog' && (
              <>
                <Hero onScrollToCards={() => {
                  const element = document.getElementById('card-catalog-section');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }} />
                
                <CardListing
                  cards={cards}
                  onSelectCard={handleSelectCard}
                />
              </>
            )}

            {viewState === 'detail' && selectedCard && (
              <CardDetail
                card={selectedCard}
                loggedInName={user.isLoggedIn ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : undefined}
                onBackToStore={() => setViewState('catalog')}
                onProceedToCheckout={(customizedCard) => {
                  setSelectedCard(customizedCard);
                  // Auto redirect or prompt auth if wanted, otherwise proceed seamlessly
                  setViewState('checkout');
                }}
              />
            )}

            {viewState === 'checkout' && selectedCard && (
              <Checkout
                card={selectedCard}
                user={user}
                onBackToDetail={() => setViewState('detail')}
                onProceedToPayment={(fn, ln) => handleProceedToPayment(fn, ln)}
              />
            )}

            {viewState === 'payment_portal' && selectedCard && (
              <PaymentPortal
                card={selectedCard}
                billingFirstName={billingFirstName}
                billingLastName={billingLastName}
                onPaymentValidated={handlePaymentValidated}
                onBackToCheckout={() => setViewState('checkout')}
              />
            )}
          </>
        ) : activeTab === 'dashboard' ? (
          <UserDashboard
            purchasedCards={purchasedCards}
            onFreezeToggle={handleFreezeToggle}
            onUpdateLimit={handleUpdateLimit}
            onUpdateNotes={handleUpdateNotes}
            onDeleteCard={handleDeleteCard}
            onGoToShop={() => {
              setActiveTab('shop');
              setViewState('catalog');
            }}
          />
        ) : isAdmin ? (
          <AdminDashboard
            cards={cards}
            onAddCard={(newCard) => {
              const updated = [newCard, ...cards];
              setCards(updated);
              localStorage.setItem('neobyte_cards', JSON.stringify(updated));
            }}
            onDeleteCard={(id) => {
              const updated = cards.filter(c => c.id !== id);
              setCards(updated);
              localStorage.setItem('neobyte_cards', JSON.stringify(updated));
            }}
          />
        ) : (
          <div className="py-20 text-center text-zinc-500 font-mono text-xs">
            UNAUTHORIZED ACCESS. RETURNING TO MAIN PORTAL...
            {(() => { setTimeout(() => setActiveTab('shop'), 2000); return null; })()}
          </div>
        )}
      </main>

      {/* Footer layout */}
      <Footer onOpenPrivacyTerms={handleOpenPrivacyTerms} visitorCount={visitorCount} />

      {/* Dynamic Login modal */}
      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Compliance Information Modals overlays fallback */}
      {legalModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" id="legal-modal-overlay">
          <div className="relative w-full max-w-2xl bg-[#090F09] border border-[#adff2f]/20 rounded-2xl p-6 md:p-8 text-white shadow-2xl transition-all max-h-[85vh] overflow-y-auto">
            
            <button
              onClick={() => setLegalModal({ isOpen: false, title: '', type: 'privacy' })}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-3 mb-6 border-b border-zinc-900 pb-3">
              <ShieldCheck className="w-6 h-6 text-[#adff2f]" />
              <h2 className="text-lg font-sans font-bold uppercase tracking-tight text-white">{legalModal.title}</h2>
            </div>

            {legalModal.type === 'privacy' && (
              <div className="space-y-4 text-xs text-zinc-400 font-sans leading-relaxed text-left">
                <p className="text-[#adff2f] font-mono uppercase font-bold text-[10px]">1. Cryptographic Security Standards</p>
                <p>
                  NeoByte Technologies and its bank subsidiaries process your personal details strictly inside end-to-end symmetric encryption loops. We do not transmit identifiers to external credit unions or centralized reporting servers without authorization.
                </p>
                <p className="text-[#adff2f] font-mono uppercase font-bold text-[10px]">2. Cookie & Metadata Ingress</p>
                <p>
                  We store session keys inside persistent parameters standard client structures. Cookies are limited to authenticating custom account logins and maintaining persistent state arrays.
                </p>
                <p className="text-[#adff2f] font-mono uppercase font-bold text-[10px]">3. Transaction Log Preservation</p>
                <p>
                  Sufficient details of purchased virtual card proxy nodes are stored securely. All CVV, balance modifications, and freezing events remain locked under individual biometrics hashes.
                </p>
              </div>
            )}

            {legalModal.type === 'terms' && (
              <div className="space-y-4 text-xs text-zinc-400 font-sans leading-relaxed text-left">
                <p className="text-[#adff2f] font-mono uppercase font-bold text-[10px]">1. Purchase Conditions</p>
                <p>
                  By creating and confirming names for a virtual prepaid credit card, you acknowledge that prices represent immediate activation parameters and customized limit baseline adjustments. All allocations are immediate.
                </p>
                <p className="text-[#adff2f] font-mono uppercase font-bold text-[10px]">2. Acceptable Usage & Trials</p>
                <p>
                  Virtual credit proxies are calibrated primarily for subscription setups, cloud developers testing API interfaces, trial bypass channels, and commercial ads agencies billing structures. You agree not to execute illegal transfer operations.
                </p>
                <p className="text-[#adff2f] font-mono uppercase font-bold text-[10px]">3. Luhn Compliance Liability</p>
                <p>
                  Cards conform to mathematical Luhn (Mod 10) structures. We guarantee format and structural conformity, and maintain consistent proxy support for accepted global merchant networks.
                </p>
              </div>
            )}

            {legalModal.type === 'contact' && (
              <div className="space-y-4 text-left">
                <p className="text-xs text-zinc-400 font-sans">
                  Need terminal assistance? Transmit your secure message directly to our cybersecurity operators. All submissions are monitored.
                </p>

                {supportSuccess ? (
                  <div className="p-4 bg-[#122812]/40 border border-[#adff2f]/30 text-[#adff2f] rounded-xl text-center font-mono text-xs">
                    Support message securely transmitted! Your ticket hash is: NBT-{Math.floor(1000 + Math.random() * 9000)}.
                  </div>
                ) : (
                  <form onSubmit={handleSupportSubmit} className="space-y-4 text-xs font-sans">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-mono tracking-wide text-zinc-500 mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={supportName}
                          onChange={(e) => setSupportName(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-900 p-2.5 rounded-xl text-white outline-none focus:border-[#adff2f]/30"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-mono tracking-wide text-zinc-500 mb-1">Secure Email</label>
                        <input
                          type="email"
                          required
                          value={supportEmail}
                          onChange={(e) => setSupportEmail(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-900 p-2.5 rounded-xl text-white outline-none focus:border-[#adff2f]/30 font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-wide text-zinc-500 mb-1">Message Description</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Detail your request or support question..."
                        value={supportMessage}
                        onChange={(e) => setSupportMessage(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-900 p-2.5 rounded-xl text-white outline-none focus:border-[#adff2f]/30 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#adff2f] hover:bg-[#bbf04d] text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
                    >
                      Transmit Support Signal
                    </button>
                  </form>
                )}
              </div>
            )}

            <div className="pt-6 border-t border-zinc-900 text-center mt-6">
              <button
                onClick={() => setLegalModal({ isOpen: false, title: '', type: 'privacy' })}
                className="px-4 py-2 border border-zinc-800 text-zinc-400 hover:text-white rounded-xl text-xs uppercase"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
