import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, ChevronRight, Sparkles, AlertCircle, ShoppingCart } from 'lucide-react';
import { PrepaidCard, CardBrand } from '../types';

interface CardListingProps {
  cards: PrepaidCard[];
  onSelectCard: (card: PrepaidCard) => void;
}

export const CardListing: React.FC<CardListingProps> = ({ cards, onSelectCard }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<CardBrand | 'All'>('All');
  const [sortBy, setSortBy] = useState<'highest-price' | 'lowest-price' | 'highest-limit' | 'title'>('lowest-price');

  // Available brands for filters
  const brands: (CardBrand | 'All')[] = ['All', 'Mastercard', 'Visa', 'Amex', 'Discover', 'Atmos'];

  // Filtered and sorted listings
  const filteredCards = useMemo(() => {
    let result = cards.filter(card => {
      const matchSearch = 
        card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.accountHolder.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchBrand = selectedBrand === 'All' || card.brand === selectedBrand;
      
      return matchSearch && matchBrand;
    });

    // Sorting
    return result.sort((a, b) => {
      if (sortBy === 'lowest-price') return a.price - b.price;
      if (sortBy === 'highest-price') return b.price - a.price;
      if (sortBy === 'highest-limit') return b.limit - a.limit;
      if (sortBy === 'title') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [cards, searchTerm, selectedBrand, sortBy]);

  return (
    <div className="w-full bg-black py-12 px-4 shadow-inner" id="card-catalog-section">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Title Grid */}
        <div className="text-center md:text-left md:flex justify-between items-end border-b border-zinc-900 pb-6 gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-white tracking-tight uppercase" id="catalog-title">
              OUR FEATURED <span className="text-[#adff2f]">VIRTUAL CARDS</span>
            </h2>
            <p className="text-xs text-zinc-500 max-w-xl font-sans leading-relaxed">
              Carefully designed and trusted by our growing community, these cards stand out for their advanced security, innovative features, and seamless global usability. Chosen for performance. Valued for reliability.
            </p>
          </div>
          
          <div className="flex items-center justify-center space-x-1.5 p-2 bg-[#122c12]/40 border border-[#adff2f]/15 rounded-xl font-mono text-[10px] text-[#adff2f]/90 mt-4 md:mt-0 uppercase">
            <Sparkles className="w-4 h-4 text-[#adff2f] animate-pulse" />
            <span>Select card to see Luhn specifications</span>
          </div>
        </div>

        {/* Search, Filter, Sort controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          {/* Search bar input */}
          <div className="lg:col-span-4 relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-500">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search card model, type or features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs bg-zinc-950/80 border border-zinc-800 focus:border-[#adff2f]/30 pl-10 pr-4 py-3 rounded-xl text-white outline-none focus:ring-1 focus:ring-[#adff2f]/10 font-sans transition-all placeholder:text-zinc-600"
            />
          </div>

          {/* Brand Filter Pills */}
          <div className="lg:col-span-5 flex flex-wrap items-center gap-1.5 overflow-x-auto py-1scrollbar-none">
            {brands.map(brand => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-3 py-2 text-[10px] sm:text-xs font-mono font-bold uppercase rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                  selectedBrand === brand
                    ? 'bg-[#122a12] text-[#adff2f] border-[#adff2f]/30'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-900 hover:text-zinc-200 hover:border-zinc-800'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          {/* Sorter selector */}
          <div className="lg:col-span-3 flex items-center space-x-2 bg-zinc-950/80 border border-zinc-800 p-2 rounded-xl">
            <ArrowUpDown className="w-4 h-4 text-zinc-600" />
            <select
              value={sortBy}
              aria-label="Sort cards list"
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full text-xs bg-transparent text-zinc-300 border-none outline-none font-mono cursor-pointer font-bold uppercase focus:ring-0"
            >
              <option className="bg-zinc-950 text-white" value="lowest-price">Price: Low to High</option>
              <option className="bg-zinc-950 text-white" value="highest-price">Price: High to Low</option>
              <option className="bg-zinc-950 text-white" value="highest-limit">Limit Capacity</option>
              <option className="bg-zinc-950 text-white" value="title">Card Model (A-Z)</option>
            </select>
          </div>

        </div>

        {/* Results grid */}
        {filteredCards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="catalog-grid">
            {filteredCards.map((card) => (
              <div
                key={card.id}
                onClick={() => onSelectCard(card)}
                className="group flex flex-col bg-zinc-950/80 border border-zinc-900 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-lime-950/5 transition-all duration-300 hover:border-zinc-800 relative"
                id={`card-item-${card.id}`}
              >
                {/* Visual discount and tags bar */}
                <div className="absolute top-3 left-3 z-10 flex flex-col space-y-1">
                  {card.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider ${
                        tag.includes('Sale') 
                          ? 'bg-[#adff2f] text-black' 
                          : tag.includes('Best') || tag.includes('Hot')
                          ? 'bg-rose-500 text-white'
                          : 'bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card visual mockup panel */}
                <div className="p-4 pt-11 bg-zinc-950 relative flex items-center justify-center overflow-hidden border-b border-zinc-900">
                  <div
                    className={`w-full max-w-[240px] aspect-[1.58/1] rounded-xl border border-transparent group-hover:scale-102 transition-transform duration-300 p-3 flex flex-col justify-between shadow-md relative overflow-hidden bg-gradient-to-br ${card.color}`}
                    style={card.imageURL ? { backgroundImage: `url(${card.imageURL})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
                  >
                    {card.isUploadedImage && card.imageURL ? (
                      // Display local file PNG without overlay text
                      <div className="absolute inset-0 bg-transparent z-10" />
                    ) : (
                      <>
                        {card.imageURL && <div className="absolute inset-0 bg-black/50 -z-0" />}
                        
                        <div className="flex items-start justify-between z-10 relative">
                          <span className="text-[7px] text-[#adff2f] font-mono tracking-widest uppercase font-bold opacity-80 z-10">NEOBYTE BANK</span>
                          <span className="text-[10px] text-white font-mono font-bold leading-none z-10">{card.brand}</span>
                        </div>

                        <div className="w-7 h-5 rounded-sm bg-gradient-to-r from-yellow-500/80 to-yellow-600/80 border border-yellow-400/50 z-10 relative" />

                        <div className="space-y-1 z-10 relative">
                          <p className="text-[11px] text-white font-mono tracking-wider font-semibold z-10">
                            {card.cardNumber.split(' ')[0]} **** **** {card.cardNumber.split(' ')[3] || '7378'}
                          </p>
                          
                          <div className="flex justify-between items-center text-[7px] text-zinc-400 font-mono z-10">
                            <span className="truncate max-w-[80px] uppercase font-bold z-10">{card.accountHolder}</span>
                            <span className="z-10">{card.expiry}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Text and details panel */}
                <div className="p-4 flex flex-col justify-between flex-1 space-y-3">
                  <div>
                    <h3 className="text-white text-xs font-bold uppercase tracking-wide group-hover:text-[#adff2f] transition-colors truncate text-left">
                      {card.name}
                    </h3>
                    <p className="text-[10px] text-zinc-500 font-mono text-left tracking-tight mt-1 truncate">
                      Limit Capability: ${card.limit.toLocaleString()}/Month
                    </p>
                  </div>

                  {/* Pricing and Action button row */}
                  <div className="flex items-end justify-between pt-1 border-t border-zinc-900/60">
                    <div className="text-left">
                      <span className="text-[10px] text-zinc-500 line-through font-mono block">
                        ${card.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-white font-mono font-extrabold text-sm text-[#adff2f]">
                        ${card.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1 py-1.5 px-3 bg-[#122812]/50 border border-[#adff2f]/20 rounded-lg group-hover:bg-[#adff2f] text-[#adff2f] group-hover:text-black transition-all">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider">Buy</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center justify-center space-y-2.5 max-w-md mx-auto">
            <AlertCircle className="w-10 h-10 text-zinc-600" />
            <h4 className="text-white text-sm font-bold uppercase font-mono">No Cards Match Criteria</h4>
            <p className="text-xs text-zinc-500 font-sans">
              Adjust your cryptographic filter terms, category tabs, or clean the keyword search box to retrieve our stock virtual credits.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedBrand('All');
              }}
              className="text-xs text-lime-400 font-mono underline hover:text-white"
            >
              Reset active search rules
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
