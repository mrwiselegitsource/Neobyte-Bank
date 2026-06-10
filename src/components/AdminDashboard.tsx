import React, { useState } from 'react';
import { PrepaidCard, CardBrand, PurchasedCard } from '../types';
import { ShieldCheck, Plus, Trash2, Image, FileText, Check, AlertTriangle, Users, Sliders, Edit, ExternalLink, Mail, CheckSquare } from 'lucide-react';

export const generateHTMLCardFile = (card: PurchasedCard): string => {
  const cardGradientStyle = card.color ? card.color :
    card.brand === 'Mastercard' ? 'linear-gradient(135deg, #112F11, #040C04)' :
    card.brand === 'Visa' ? 'linear-gradient(135deg, #0C1B2B, #04090F)' :
    card.brand === 'Amex' ? 'linear-gradient(135deg, #3A1448, #120518)' :
    'linear-gradient(135deg, #18112f, #090518)';

  // Format colors slightly cleaner for inline CSS fallback
  let inlineGradient = 'linear-gradient(135deg, #112F11, #040C04)';
  if (card.brand === 'Visa') inlineGradient = 'linear-gradient(135deg, #0C1B2B, #04090F)';
  else if (card.brand === 'Amex') inlineGradient = 'linear-gradient(135deg, #3A1448, #120518)';
  else if (card.brand === 'Discover') inlineGradient = 'linear-gradient(135deg, #4D0F1D, #1C050A)';

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NeoByte Secure Proxy Card - ${card.accountHolder}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body {
            background-color: #030603;
            color: #ffffff;
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 40px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 90vh;
        }
        .container {
            max-width: 440px;
            width: 100%;
            text-align: center;
        }
        .header {
            margin-bottom: 30px;
        }
        .header h1 {
            font-size: 20px;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #adff2f;
            margin: 0;
            font-weight: 800;
        }
        .header p {
            color: #71717a;
            font-size: 11px;
            margin: 5px 0 0 0;
        }
        .card-mockup {
            width: 100%;
            aspect-ratio: 1.58 / 1;
            border-radius: 20px;
            position: relative;
            box-sizing: border-box;
            padding: 24px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-shadow: 0 10px 30px rgba(173, 255, 47, 0.15);
            border: 1px solid rgba(173, 255, 47, 0.2);
            background: ${card.imageURL ? `url('${card.imageURL}') no-repeat center/cover` : inlineGradient};
            overflow: hidden;
        }
        ${card.imageURL ? `
        .card-mockup::before {
            content: '';
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.6);
            z-index: 1;
        }
        ` : ''}
        .card-row-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            z-index: 2;
        }
        .bank-title {
            text-align: left;
        }
        .bank-title-main {
            font-size: 8px;
            font-family: 'JetBrains Mono', monospace;
            font-weight: 700;
            letter-spacing: 2px;
            color: #adff2f;
        }
        .bank-title-sub {
            font-size: 9px;
            color: #a1a1aa;
            text-transform: uppercase;
        }
        .card-brand {
            font-family: 'JetBrains Mono', monospace;
            font-size: 14px;
            font-weight: 800;
            z-index: 2;
        }
        .card-chip {
            width: 40px;
            height: 30px;
            border-radius: 6px;
            background: linear-gradient(to right, #eab308, #ca8a04);
            border: 1px solid rgba(234, 179, 8, 0.4);
            z-index: 2;
        }
        .card-number {
            font-family: 'JetBrains Mono', monospace;
            font-weight: 700;
            font-size: 18px;
            letter-spacing: 2px;
            text-align: left;
            margin: 10px 0;
            z-index: 2;
            word-spacing: 4px;
        }
        .card-row-bottom {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            font-family: 'JetBrains Mono', monospace;
            font-size: 9px;
            text-transform: uppercase;
            z-index: 2;
            color: #e4e4e7;
        }
        .holder-name {
            font-weight: 700;
            letter-spacing: 1px;
            color: #adff2f;
            text-align: left;
            max-width: 220px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .expiry-cvv {
            display: flex;
            gap: 15px;
            text-align: right;
        }
        .info-panel {
            background-color: #0c0f0c;
            border: 1px solid #1c241c;
            border-radius: 16px;
            padding: 20px;
            margin-top: 30px;
            text-align: left;
        }
        .info-title {
            color: #adff2f;
            font-size: 10px;
            font-family: 'JetBrains Mono', monospace;
            text-transform: uppercase;
            font-weight: 700;
            letter-spacing: 1px;
            margin-bottom: 12px;
            display: block;
        }
        .info-item {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            padding: 10px 0;
            border-bottom: 1px solid #161f16;
        }
        .info-item:last-child {
            border-bottom: none;
        }
        .info-label {
            color: #71717a;
        }
        .info-value {
            font-family: 'JetBrains Mono', monospace;
            font-weight: 700;
            color: #ffffff;
        }
        .info-value.lime {
            color: #adff2f;
        }
        .instructions {
            font-size: 10px;
            color: #52525b;
            margin-top: 24px;
            line-height: 1.6;
            text-align: center;
        }
        .logo-mark {
            display: inline-flex;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background-color: #adff2f;
            color: #000;
            font-weight: 950;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            margin: 30px auto 0 auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>NEOBYTE BANK SECURE DISPATCH</h1>
            <p>High-Fidelity Virtual Private Card Credentials</p>
        </div>

        <div class="card-mockup">
            <div class="card-row-top">
                <div class="bank-title">
                    <div class="bank-title-main">NEOBYTE BANK</div>
                    <div class="bank-title-sub">Proxy Active Node</div>
                </div>
                <div class="card-brand">${card.brand}</div>
            </div>

            <div class="card-chip"></div>

            <div class="card-number">${card.cardNumber}</div>

            <div class="card-row-bottom">
                <div class="holder-name">${card.accountHolder}</div>
                <div class="expiry-cvv">
                    <div>EXP: ${card.expiry}</div>
                    <div>CVV: ${card.cvv}</div>
                </div>
            </div>
        </div>

        <div class="info-panel">
            <span class="info-title">Secure Credentials Spec</span>
            <div class="info-item">
                <span class="info-label">Cardholder</span>
                <span class="info-value">${card.accountHolder}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Spending Limit</span>
                <span class="info-value lime">$${card.limit.toLocaleString()} USD / Month</span>
            </div>
            <div class="info-item">
                <span class="info-label">Private Node ID</span>
                <span class="info-value">NEO-NODE-${card.id.split('-').pop()?.toUpperCase() || card.id.substring(10, 16).toUpperCase()}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Status</span>
                <span class="info-value" style="color: #4ade80;">ACTIVE</span>
            </div>
        </div>

        <div class="instructions">
            This offline HTML document carries the dynamic cryptographic configuration matching your safe prepaid proxy transaction channel. Guard this file securely.
        </div>
        
        <div style="text-align: center;"><div class="logo-mark">N</div></div>
    </div>
</body>
</html>`;
};

interface AdminDashboardProps {
  cards: PrepaidCard[];
  onAddCard: (card: PrepaidCard) => void;
  onDeleteCard: (id: string) => void;
  onUpdateCard?: (card: PrepaidCard) => void;
  purchasedCards?: PurchasedCard[];
  onUpdatePurchasedCard?: (card: PurchasedCard) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  cards,
  onAddCard,
  onDeleteCard,
  onUpdateCard,
  purchasedCards = [],
  onUpdatePurchasedCard,
}) => {
  // Form fields
  const [brand, setBrand] = useState<CardBrand>('Mastercard');
  const [name, setName] = useState('');
  const [price, setPrice] = useState<string>('49.99');
  const [limit, setLimit] = useState<string>('5000');
  const [imageURL, setImageURL] = useState('');
  const [fileName, setFileName] = useState('');
  const [isUploadedImage, setIsUploadedImage] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [description, setDescription] = useState('');
  const [customTags, setCustomTags] = useState('New, Admin Addition');
  const [country, setCountry] = useState('United States');
  const [address, setAddress] = useState('733 Bank Road Corporate HQ');

  // Sub-tab selection state
  const [activeSubTab, setActiveSubTab] = useState<'cards' | 'gateways' | 'orders'>('orders');

  // Gateways configurations state
  const [eversendLink1, setEversendLink1] = useState(() => {
    try {
      const saved = localStorage.getItem('neobyte_eversend_links');
      if (saved) {
        const arr = JSON.parse(saved);
        if (Array.isArray(arr) && arr[0]) return arr[0];
      }
    } catch (e) {}
    return 'https://eversend.me/credittrusts';
  });
  const [eversendLink2, setEversendLink2] = useState(() => {
    try {
      const saved = localStorage.getItem('neobyte_eversend_links');
      if (saved) {
        const arr = JSON.parse(saved);
        if (Array.isArray(arr) && arr[1]) return arr[1];
      }
    } catch (e) {}
    return 'https://eversend.me/paynode55';
  });
  const [eversendLink3, setEversendLink3] = useState(() => {
    try {
      const saved = localStorage.getItem('neobyte_eversend_links');
      if (saved) {
        const arr = JSON.parse(saved);
        if (Array.isArray(arr) && arr[2]) return arr[2];
      }
    } catch (e) {}
    return 'https://eversend.me/securesettlement';
  });

  const [cryptoAddr1, setCryptoAddr1] = useState(() => {
    try {
      const saved = localStorage.getItem('neobyte_crypto_addresses');
      if (saved) {
        const arr = JSON.parse(saved);
        if (Array.isArray(arr) && arr[0]) return arr[0];
      }
    } catch (e) {}
    return '1AvUwag3sbSBmZd16qmQxPc62zPKje4Qrq';
  });
  const [cryptoAddr2, setCryptoAddr2] = useState(() => {
    try {
      const saved = localStorage.getItem('neobyte_crypto_addresses');
      if (saved) {
        const arr = JSON.parse(saved);
        if (Array.isArray(arr) && arr[1]) return arr[1];
      }
    } catch (e) {}
    return 'bc1qxy2kg3ut765rw9hl80p3ca286g281q0748t432';
  });
  const [cryptoAddr3, setCryptoAddr3] = useState(() => {
    try {
      const saved = localStorage.getItem('neobyte_crypto_addresses');
      if (saved) {
        const arr = JSON.parse(saved);
        if (Array.isArray(arr) && arr[2]) return arr[2];
      }
    } catch (e) {}
    return '3Ektv93tcqS8or42zP76pPde122mQxPce2';
  });

  // Editing state
  const [editingCardId, setEditingCardId] = useState<string | null>(null);

  // User Order modification & Dispatch states
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newExpiry, setNewExpiry] = useState('');
  const [newCVV, setNewCVV] = useState('');

  // Web3Forms Automated Email states
  const [web3FormsKey, setWeb3FormsKey] = useState(() => {
    return localStorage.getItem('neobyte_web3forms_key') || '';
  });
  const [enableWeb3Forms, setEnableWeb3Forms] = useState(() => {
    return localStorage.getItem('neobyte_enable_web3forms') === 'true';
  });
  const [testEmail, setTestEmail] = useState('');
  const [testEmailStatus, setTestEmailStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [testEmailError, setTestEmailError] = useState('');

  // Dynamic file download handler
  const handleDownloadHTMLCard = (card: PurchasedCard) => {
    try {
      const htmlContent = generateHTMLCardFile(card);
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${card.accountHolder.replace(/\s+/g, '_')}_neobyte_card.html`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Failed to download card file:', e);
    }
  };

  // Web3Forms API custom dynamic email dispatch
  const sendWeb3FormsEmail = async (toEmail: string, card: PurchasedCard): Promise<boolean> => {
    if (!web3FormsKey.trim()) {
      return false;
    }
    try {
      const getCardBrandImageURL = (brand: CardBrand): string => {
        switch (brand) {
          case 'Mastercard':
            return 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&auto=format&fit=crop&q=80';
          case 'Visa':
            return 'https://images.unsplash.com/photo-1589758438368-0ad531db3366?w=600&auto=format&fit=crop&q=80';
          case 'Amex':
            return 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600&auto=format&fit=crop&q=80';
          case 'Discover':
            return 'https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?w=600&auto=format&fit=crop&q=80';
          default:
            return 'https://images.unsplash.com/photo-1613243555988-441166d4d6fd?w=600&auto=format&fit=crop&q=80';
        }
      };

      const cardDesignImage = card.imageURL || getCardBrandImageURL(card.brand);

      const emailMessage = `Hello ${card.accountHolder},

Your premium virtual prepaid card design has been dispatched and is fully active!

Card Details Assigned:
- Card Model: ${card.name}
- Brand Network: ${card.brand}
- Credit Card Number: ${card.cardNumber}
- Expiration Date: ${card.expiry}
- CVV Code: ${card.cvv}
- Credit Limit: $${card.limit.toLocaleString()} USD / Month

To view your secure card visual design check, open your live dash card list.`;

      const emailHTML = `
<div style="background-color: #030603; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px 20px; text-align: center; border-radius: 20px; max-width: 500px; margin: 0 auto; border: 1px solid #1c241c;">
  <h1 style="color: #adff2f; font-size: 22px; text-transform: uppercase; margin-bottom: 5px; font-weight: 800; letter-spacing: 2px;">NEOBYTE BANK</h1>
  <p style="color: #71717a; font-size: 11px; margin-top: 0; font-family: monospace; letter-spacing: 2px;">HIGH-FIDELITY SECURE ASSET DISPATCH</p>
  
  <div style="margin: 25px auto; width: 100%; border-radius: 16px; overflow: hidden; border: 1px solid rgba(173,255,47,0.3); box-shadow: 0 4px 20px rgba(173,255,47,0.15);">
    <img src="${cardDesignImage}" alt="${card.brand} Design" style="width: 100%; display: block; object-fit: cover;" />
  </div>

  <div style="margin: 20px auto; text-align: left; padding: 0 10px;">
    <p style="color: #e4e4e7; font-size: 14px; margin-bottom: 15px;">Hello <strong>${card.accountHolder}</strong>,</p>
    <p style="color: #a1a1aa; font-size: 13px; line-height: 1.6; margin-top: 0;">Your premium virtual prepaid card is fully activated. Details of your secure asset allocation are listed below:</p>
  </div>
  
  <div style="background-color: #0c0f0c; border: 1px solid #1c241c; border-radius: 12px; padding: 20px; text-align: left; margin: 25px 0;">
    <h3 style="color: #adff2f; font-size: 11px; text-transform: uppercase; border-bottom: 1px solid #1c241c; padding-bottom: 8px; margin-top: 0; font-family: monospace;">Secure Credentials Parameters</h3>
    
    <table style="width: 100%; font-size: 13px; color: #ffffff; border-collapse: collapse;">
      <tr style="border-bottom: 1px solid #161f16;">
        <td style="padding: 10px 0; color: #71717a;">Card Model</td>
        <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #adff2f;">${card.name}</td>
      </tr>
      <tr style="border-bottom: 1px solid #161f16;">
        <td style="padding: 10px 0; color: #71717a;">Brand Network</td>
        <td style="padding: 10px 0; text-align: right; font-weight: bold;">${card.brand}</td>
      </tr>
      <tr style="border-bottom: 1px solid #161f16;">
        <td style="padding: 10px 0; color: #71717a;">Card Number</td>
        <td style="padding: 10px 0; text-align: right; font-family: monospace; font-weight: bold; letter-spacing: 1px; color: #eceef2;">${card.cardNumber}</td>
      </tr>
      <tr style="border-bottom: 1px solid #161f16;">
        <td style="padding: 10px 0; color: #71717a;">Expiration Date</td>
        <td style="padding: 10px 0; text-align: right; font-family: monospace; font-weight: bold;">${card.expiry}</td>
      </tr>
      <tr style="border-bottom: 1px solid #161f16;">
        <td style="padding: 10px 0; color: #71717a;">CVV Code</td>
        <td style="padding: 10px 0; text-align: right; font-family: monospace; font-weight: bold; color: #adff2f;">${card.cvv}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #71717a;">Credit Limit</td>
        <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #adff2f;">$${card.limit.toLocaleString()} USD / Month</td>
      </tr>
    </table>
  </div>
  
  <p style="font-size: 11px; color: #52525b; line-height: 1.6; margin-bottom: 25px; text-align: left; padding: 0 10px;">
    This is an automated transmission from your NeoByte private node servers. Ensure you guard these parameters in a secure location.
  </p>
  
  <div style="font-weight: bold; color: #adff2f; letter-spacing: 3px; font-size: 12px; font-family: monospace; border-top: 1px solid #121912; padding-top: 15px;">NEOBYTE BANK SERVICES</div>
</div>
`;

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: web3FormsKey.trim(),
          name: "NeoByte Asset Dispatch Broker",
          subject: `Your Secure Proxy Virtual Card is Active!`,
          email: toEmail,
          from_name: "NeoByte Bank Automated",
          message: emailMessage,
          html: emailHTML
        })
      });
      const data = await response.json();
      return !!data.success;
    } catch (err) {
      console.error('Web3Forms email dispatch error:', err);
      return false;
    }
  };

  // Handle send test email
  const handleSendTestEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!web3FormsKey.trim()) {
      setTestEmailStatus('error');
      setTestEmailError('Please input a valid free Web3Forms Access Key first.');
      return;
    }
    if (!testEmail.trim() || !testEmail.includes('@')) {
      setTestEmailStatus('error');
      setTestEmailError('Please enter a valid recipient email address.');
      return;
    }

    setTestEmailStatus('sending');
    setTestEmailError('');

    const demoCard: PurchasedCard = {
      id: 'demo-node-999',
      brand: 'Visa',
      name: 'NeoByte Ultimate Elite',
      price: 99.99,
      limit: 25000,
      cardNumber: '4204 9918 3772 1045',
      expiry: '09/31',
      cvv: '745',
      accountHolder: 'DEMO INTEGRATION USER',
      purchaseDate: new Date().toISOString().split('T')[0],
      isFrozen: false,
      status: 'active'
    };

    try {
      const success = await sendWeb3FormsEmail(testEmail.trim(), demoCard);
      if (success) {
        setTestEmailStatus('success');
        setTimeout(() => setTestEmailStatus('idle'), 5000);
      } else {
        setTestEmailStatus('error');
        setTestEmailError('Web3Forms declined verification. Check your Key.');
      }
    } catch (err) {
      setTestEmailStatus('error');
      setTestEmailError('Network link to api.web3forms.com failed.');
    }
  };

  // Interactive feedback state
  const [alertMessage, setAlertMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSaveGateways = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty entries
    const links = [eversendLink1, eversendLink2, eversendLink3].map(l => l.trim()).filter(Boolean);
    const cryptos = [cryptoAddr1, cryptoAddr2, cryptoAddr3].map(c => c.trim()).filter(Boolean);
    
    if (links.length === 0) {
      setAlertMessage({ type: 'error', text: 'You must provide at least one EverSend payment link!' });
      return;
    }
    if (cryptos.length === 0) {
      setAlertMessage({ type: 'error', text: 'You must provide at least one active Bitcoin / Crypto address!' });
      return;
    }
    
    localStorage.setItem('neobyte_eversend_links', JSON.stringify(links));
    localStorage.setItem('neobyte_crypto_addresses', JSON.stringify(cryptos));
    localStorage.setItem('neobyte_web3forms_key', web3FormsKey.trim());
    localStorage.setItem('neobyte_enable_web3forms', String(enableWeb3Forms));
    
    setAlertMessage({ type: 'success', text: 'Gateway pools & email automation configurations successfully updated!' });
    
    setTimeout(() => {
      setAlertMessage(null);
    }, 4500);
  };

  // Drag and Drop files handlers
  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setFileName(file.name);
      setIsUploadedImage(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageURL(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

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

  const handleStartEdit = (card: PrepaidCard) => {
    setEditingCardId(card.id);
    setBrand(card.brand);
    setName(card.name);
    setPrice(card.price.toString());
    setLimit(card.limit.toString());
    setImageURL(card.imageURL || '');
    setFileName(card.isUploadedImage ? 'Uploaded PNG File' : '');
    setIsUploadedImage(!!card.isUploadedImage);
    setDescription(card.description || '');
    setCustomTags(card.tags.join(', '));
    setCountry(card.country || 'United States');
    setAddress(card.address || '733 Bank Road Corporate HQ');

    const formElement = document.getElementById('admin-dashboard-container');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
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

    if (editingCardId) {
      const existing = cards.find(c => c.id === editingCardId);
      const simulatedCardNumber = existing?.cardNumber || `${brandTheme.prefix} ${Math.floor(1000 + Math.random() * 9000).toString()} ${Math.floor(1000 + Math.random() * 9000).toString()} ${Math.floor(1000 + Math.random() * 9000).toString()}`;

      const updatedCard: PrepaidCard = {
        id: editingCardId,
        brand,
        name: name.trim(),
        price: priceNum,
        originalPrice: parseFloat((priceNum * 1.2).toFixed(2)),
        limit: limitNum,
        cardNumber: simulatedCardNumber,
        expiry: existing?.expiry || '12/2030',
        cvv: existing?.cvv || Math.floor(100 + Math.random() * 900).toString(),
        accountHolder: existing?.accountHolder || 'AUTHORIZATION NODE',
        address: address.trim() || 'Central Ledger Substation',
        country: country.trim() || 'Global',
        tags: customTags.split(',').map(t => t.trim()).filter(t => t.length > 0),
        color: brandTheme.color,
        textHighlight: brandTheme.textHighlight,
        description: description.trim() || `Enterprise grade virtual proxy built for flexible checkout options. Auto-assigned with a clean $${limitNum.toLocaleString()} spending threshold.`,
        imageURL: imageURL.trim() || undefined,
        isUploadedImage: isUploadedImage
      };

      if (onUpdateCard) {
        onUpdateCard(updatedCard);
      }
      setAlertMessage({ type: 'success', text: `Success: "${updatedCard.name}" card configuration has been updated successfully!` });
      setEditingCardId(null);
    } else {
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
        isUploadedImage: isUploadedImage
      };

      onAddCard(newCard);
      setAlertMessage({ type: 'success', text: `Success: "${newCard.name}" card configuration has been added to live stock!` });
    }

    // Reset Form Fields
    setName('');
    setPrice('49.99');
    setLimit('5000');
    setImageURL('');
    setFileName('');
    setIsUploadedImage(false);
    setDescription('');
    setCustomTags('New, Admin Addition');
    setCountry('United States');
    setAddress('733 Bank Road Corporate HQ');

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

        {/* Tab Headers */}
        <div className="flex items-center space-x-1 border-b border-[#adff2f]/10 pb-0.5" id="admin-subtabs-header">
          <button
            type="button"
            onClick={() => setActiveSubTab('orders')}
            className={`px-5 py-3 border-b-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'orders'
                ? 'border-[#adff2f] text-[#adff2f] font-black'
                : 'border-transparent text-zinc-500 hover:text-zinc-350'
            }`}
          >
            <CheckSquare className="w-4 h-4 text-lime-400" />
            <span>Orders Dispatch ({purchasedCards.filter(c => c.status === 'awaiting_dispatch').length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('cards')}
            className={`px-5 py-3 border-b-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeSubTab === 'cards'
                ? 'border-[#adff2f] text-white font-black'
                : 'border-transparent text-zinc-500 hover:text-zinc-350'
            }`}
          >
            Virtual Cards Stock
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('gateways')}
            className={`px-5 py-3 border-b-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeSubTab === 'gateways'
                ? 'border-[#adff2f] text-white font-black'
                : 'border-transparent text-zinc-500 hover:text-zinc-350'
            }`}
          >
            Payment Portals Rotation Config
          </button>
        </div>

        {activeSubTab === 'orders' ? (
          <div className="space-y-6 text-left" id="admin-orders-tab">
            
            <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-900 space-y-2">
              <h3 className="text-white text-base font-sans font-extrabold uppercase tracking-widest text-[#adff2f]">
                CLIENT PURCHASE DISPATCH GATEWAY
              </h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Approve newly signed up profiles' payments. Verify upload receipts, assign active card parameters dynamically, and trigger Gmail client linkages or automated clipboard dispatches.
              </p>
            </div>

            {purchasedCards.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center space-y-4 max-w-sm mx-auto bg-zinc-950/60 p-8 rounded-2xl border border-zinc-900">
                <FileText className="w-12 h-12 text-zinc-700 mx-auto" />
                <h3 className="text-white text-sm font-sans font-bold uppercase tracking-wider">
                  No Client Purchases
                </h3>
                <p className="text-xs text-zinc-500 font-sans leading-relaxed">
                  No registered checkout profiles or purchase submissions exist inside local cache.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6" id="orders-cards-stack">
                {purchasedCards.map((order) => {
                  const isPending = order.status === 'awaiting_dispatch';
                  const isEditingThis = editingOrderId === order.id;

                  return (
                    <div 
                      key={order.id} 
                      className={`p-6 rounded-2xl bg-zinc-950 border transition-all ${
                        isPending 
                          ? 'border-yellow-500/20 shadow-[0_0_24px_rgba(234,179,8,0.02)]' 
                          : 'border-zinc-900'
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row gap-6 justify-between items-start">
                        
                        {/* Left: Metadata & Client Details */}
                        <div className="space-y-4 flex-1">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-zinc-900 px-2.5 py-1 text-zinc-400 rounded-lg border border-zinc-850">
                              Order: {order.brand}
                            </span>
                            
                            {isPending ? (
                              <span className="px-2.5 py-1 text-[9px] font-mono font-bold uppercase bg-yellow-500/15 border border-yellow-500/20 text-yellow-500 rounded-lg animate-pulse">
                                awaiting dispatch
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 text-[9px] font-mono font-bold uppercase bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 rounded-lg">
                                active
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
                            <div className="space-y-1">
                              <span className="text-zinc-[550] uppercase block text-zinc-500">Customer Email</span>
                              <span className="text-white font-bold select-all truncate block">{order.ownerEmail || 'manmagic550@yahoo.com'}</span>
                            </div>
                            <div className="space-y-1">
                              <span className="text-zinc-[550] uppercase block text-zinc-500">Account Holder</span>
                              <span className="text-[#adff2f] font-bold block">{order.accountHolder}</span>
                            </div>
                            <div className="space-y-1">
                              <span className="text-zinc-[550] uppercase block text-zinc-500">Date Purchased</span>
                              <span className="text-zinc-300 block">{order.purchaseDate}</span>
                            </div>
                            <div className="space-y-1">
                              <span className="text-zinc-[550] uppercase block text-zinc-500">Retail Price paid</span>
                              <span className="text-zinc-300 block font-bold">${order.price.toFixed(2)} USD</span>
                            </div>
                          </div>

                          <div className="bg-zinc-900/30 p-3.5 border border-zinc-900 rounded-xl space-y-1 text-xs">
                            <span className="text-[10px] uppercase text-zinc-500 font-mono block">Payment Trace info:</span>
                            <p className="text-zinc-300 font-sans italic">{order.paymentMethod || 'Direct secure e-money dispatch'}</p>
                          </div>

                        </div>

                        {/* Middle: Interactive Base64 Screenshot View */}
                        {order.paymentScreenshot && (
                          <div className="w-full sm:w-auto flex-shrink-0 text-left space-y-1 bg-zinc-900/10 p-3 rounded-xl border border-zinc-900/60">
                            <span className="text-[9px] font-mono text-zinc-500 uppercase block tracking-wider">Payments Proof Screenshot</span>
                            <div className="relative group w-24 h-24 bg-black border border-zinc-850 rounded-lg overflow-hidden flex items-center justify-center">
                              <img 
                                src={order.paymentScreenshot} 
                                alt="User provided billing proof" 
                                className="w-full h-full object-cover group-hover:scale-105 transition-all" 
                                referrerPolicy="no-referrer"
                              />
                              <a 
                                href={order.paymentScreenshot} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] uppercase font-mono font-bold transition-all"
                              >
                                View Large
                              </a>
                            </div>
                          </div>
                        )}

                      </div>

                      {/* Editing Actions Block */}
                      <div className="mt-6 pt-6 border-t border-zinc-900">
                        {isEditingThis ? (
                          <div className="space-y-4 bg-zinc-900/20 p-5 border border-zinc-850 rounded-xl p-4">
                            <h4 className="text-white text-xs font-mono uppercase tracking-widest font-black text-[#adff2f]">
                              ACTIVATE & ASSIGN VIRTUAL CREDIT DATA
                            </h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-1">
                                <label className="block text-[10px] font-mono text-zinc-400 uppercase">Credit Card Number</label>
                                <input 
                                  type="text" 
                                  value={newCardNumber} 
                                  onChange={(e) => setNewCardNumber(e.target.value)}
                                  className="w-full p-2 bg-black border border-zinc-800 rounded-lg text-white font-mono text-xs focus:border-[#adff2f]/30"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="block text-[10px] font-mono text-zinc-400 uppercase">Expiration (MM/YY)</label>
                                <input 
                                  type="text" 
                                  placeholder="12/30"
                                  value={newExpiry} 
                                  onChange={(e) => setNewExpiry(e.target.value)}
                                  className="w-full p-2 bg-black border border-zinc-800 rounded-lg text-white font-mono text-xs focus:border-[#adff2f]/30"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="block text-[10px] font-mono text-zinc-400 uppercase">CVV Code</label>
                                <input 
                                  type="text" 
                                  maxLength={4}
                                  value={newCVV} 
                                  onChange={(e) => setNewCVV(e.target.value)}
                                  className="w-full p-2 bg-black border border-zinc-800 rounded-lg text-white font-mono text-xs focus:border-[#adff2f]/30"
                                />
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2.5 pt-2">
                              {enableWeb3Forms && web3FormsKey ? (
                                <button
                                  onClick={async () => {
                                    const updatedCard: PurchasedCard = {
                                      ...order,
                                      cardNumber: newCardNumber.trim() || order.cardNumber,
                                      expiry: newExpiry.trim() || order.expiry,
                                      cvv: newCVV.trim() || order.cvv,
                                      status: 'active'
                                    };
                                    if (onUpdatePurchasedCard) {
                                      onUpdatePurchasedCard(updatedCard);
                                    }
                                    setEditingOrderId(null);
                                    setAlertMessage({
                                      type: 'success',
                                      text: `Dispatching automated secure email with parameters and design preview to ${order.ownerEmail}...`
                                    });

                                    const success = await sendWeb3FormsEmail(order.ownerEmail || 'guest@neobyte.bank', updatedCard);
                                    if (success) {
                                      setAlertMessage({
                                        type: 'success',
                                        text: `Secure Asset Dispatched! Complete card parameters and selected design emailed successfully to ${order.ownerEmail}.`
                                      });
                                    } else {
                                      setAlertMessage({
                                        type: 'error',
                                        text: 'Direct SMTP transmission key declined, but card activated. Download asset below.'
                                      });
                                    }
                                    handleDownloadHTMLCard(updatedCard);
                                  }}
                                  className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-sans font-extrabold text-xs uppercase rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                                >
                                  <Mail className="w-4 h-4 text-black" />
                                  <span>Save & Clean Auto-Dispatch</span>
                                </button>
                              ) : null}

                              <button
                                onClick={() => {
                                  // Update & Open Gmail
                                  const updatedCard: PurchasedCard = {
                                    ...order,
                                    cardNumber: newCardNumber.trim() || order.cardNumber,
                                    expiry: newExpiry.trim() || order.expiry,
                                    cvv: newCVV.trim() || order.cvv,
                                    status: 'active'
                                  };
                                  if (onUpdatePurchasedCard) {
                                    onUpdatePurchasedCard(updatedCard);
                                  }
                                  setEditingOrderId(null);
                                  setAlertMessage({
                                    type: 'success',
                                    text: `Order successfully updated! Opening Gmail composer fallback & triggering HTML Download.`
                                  });

                                  // Offline asset download
                                  handleDownloadHTMLCard(updatedCard);

                                  // Gmail link assembly
                                  const emailBody = `Hello ${order.accountHolder},\n\nYour private virtual credit card proxy is active and ready for use!\n\nHere are your secure credit card parameters:\n- Card Brand: ${order.brand}\n- Card Number: ${newCardNumber}\n- Expiration: ${newExpiry}\n- CVV: ${newCVV}\n- Credit Limit: $${order.limit.toLocaleString()}\n- Purchase Date: ${order.purchaseDate}\n\nThank you for choosing NeoByte Bank private server nodes.\n\nBest Regards,\nNeoByte Bank Administration Team`;
                                  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(order.ownerEmail || 'manmagic@yahoo.com')}&su=${encodeURIComponent('Your Live NeoByte Proxy Credit is Active!')}&body=${encodeURIComponent(emailBody)}`;
                                  window.open(gmailUrl, '_blank');
                                }}
                                className="px-4 py-2 bg-lime-500 hover:bg-lime-400 text-black font-sans font-bold text-xs uppercase rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                              >
                                <Mail className="w-4 h-4" />
                                <span>Save, Open Gmail & Get HTML</span>
                              </button>

                              <button
                                onClick={() => {
                                  // Update & Download HTML & Copy to Clipboard
                                  const updatedCard: PurchasedCard = {
                                    ...order,
                                    cardNumber: newCardNumber.trim() || order.cardNumber,
                                    expiry: newExpiry.trim() || order.expiry,
                                    cvv: newCVV.trim() || order.cvv,
                                    status: 'active'
                                  };
                                  if (onUpdatePurchasedCard) {
                                    onUpdatePurchasedCard(updatedCard);
                                  }
                                  setEditingOrderId(null);
                                  setAlertMessage({
                                    type: 'success',
                                    text: `Order updated, clipboard loaded & HTML downloaded!`
                                  });

                                  handleDownloadHTMLCard(updatedCard);

                                  const emailBody = `Hello ${order.accountHolder},\n\nYour private virtual credit card proxy is active and ready for use!\n\nHere are your secure credit card parameters:\n- Card Brand: ${order.brand}\n- Card Number: ${newCardNumber}\n- Expiration: ${newExpiry}\n- CVV: ${newCVV}\n- Credit Limit: $${order.limit.toLocaleString()}\n- Purchase Date: ${order.purchaseDate}\n\nThank you for choosing NeoByte Bank private server nodes.\n\nBest Regards,\nNeoByte Bank Administration Team`;
                                  navigator.clipboard.writeText(emailBody);
                                }}
                                className="px-4 py-2 bg-[#adff2f]/20 hover:bg-[#adff2f]/30 text-[#adff2f] font-sans font-bold text-xs uppercase rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                              >
                                <CheckSquare className="w-4 h-4" />
                                <span>Save, Copy & Get HTML</span>
                              </button>

                              <button
                                onClick={() => setEditingOrderId(null)}
                                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 font-sans text-xs uppercase rounded-lg transition-all cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
                            <div className="space-y-0.5 text-left font-sans">
                              <span className="text-zinc-[550] uppercase text-zinc-500 text-[10px]">Assigned HTML and parameters</span>
                              <span className="text-white block font-bold font-mono">
                                {order.cardNumber.substring(0,4)} **** **** {order.cardNumber.substring(12,16)} (Exp: {order.expiry} CVV: {order.cvv})
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                              <button
                                onClick={() => handleDownloadHTMLCard(order)}
                                className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-850 text-[#adff2f] text-[10px] font-bold uppercase rounded-lg transition-all cursor-pointer flex items-center gap-1.5 border border-zinc-800"
                                title="Download the secure HTML folder card representation"
                              >
                                <FileText className="w-3.5 h-3.5" />
                                <span>Download HTML File</span>
                              </button>

                              {enableWeb3Forms && web3FormsKey && (
                                <button
                                  onClick={async () => {
                                    setAlertMessage({ type: 'success', text: `Initiating automated dispatch to ${order.ownerEmail}...` });
                                    const success = await sendWeb3FormsEmail(order.ownerEmail || 'guest@neobyte.bank', order);
                                    if (success) {
                                      setAlertMessage({ type: 'success', text: `Selected Card specifications dispatched successfully to ${order.ownerEmail}!` });
                                    } else {
                                      setAlertMessage({ type: 'error', text: 'Auto-dispatch failed. Check Web3Forms key configuration.' });
                                    }
                                  }}
                                  className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-850 text-teal-405 text-teal-400 text-[10px] font-bold uppercase rounded-lg transition-all cursor-pointer flex items-center gap-1.5 border border-zinc-800"
                                  title="Dispatch automated secure email directly via Web3Forms"
                                >
                                  <Mail className="w-3.5 h-3.5" />
                                  <span>Resend Email</span>
                                </button>
                              )}

                              <button
                                onClick={() => {
                                  setEditingOrderId(order.id);
                                  setNewCardNumber(order.cardNumber);
                                  setNewExpiry(order.expiry);
                                  setNewCVV(order.cvv === '***' ? Math.floor(100 + Math.random() * 900).toString() : order.cvv);
                                }}
                                className="px-3 py-1.5 bg-zinc-900 border border-zinc-850 hover:border-zinc-700 text-zinc-300 font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center gap-1.5 text-[10px]"
                              >
                                <Edit className="w-3.5 h-3.5 text-lime-400" />
                                <span>Edit Parameters</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        ) : activeSubTab === 'cards' ? (
          <>
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
                {/* When it's an uploaded image, we don't display standard credit card text overlays because the PNG is in place of the card */}
                {isUploadedImage && imageURL ? (
                  // Overlay to ensure border rounding is flawless
                  <div className="absolute inset-0 bg-transparent z-10" />
                ) : (
                  <>
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
                  </>
                )}
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
                <div className="grid grid-cols-2 py-2 px-3 border-b border-zinc-900">
                  <span className="text-zinc-500">Threshold Limit</span>
                  <span className="text-white font-mono text-right font-bold">${parseInt(limit || '0').toLocaleString()}/Month</span>
                </div>
                <div className="grid grid-cols-2 py-2 px-3">
                  <span className="text-zinc-500">Delivery Speed</span>
                  <span className="text-[#adff2f] font-mono text-right font-bold">Instant Activation</span>
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

              {/* Image Input Selection Block */}
              <div className="space-y-3 pb-2">
                <div className="flex justify-between items-center">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                    Card Graphic / PNG Image
                  </label>
                  <span className="text-[8px] font-mono text-[#adff2f] uppercase font-bold">Displays "in place of the card"</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* File Upload Zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 transition-all text-center cursor-pointer min-h-[110px] ${
                      isDragging
                        ? 'border-[#adff2f] bg-[#122a12]/20'
                        : isUploadedImage
                        ? 'border-emerald-500/50 bg-emerald-950/20'
                        : 'border-zinc-850 hover:border-[#adff2f]/40 bg-zinc-900/40 hover:bg-zinc-900/60'
                    }`}
                    onClick={() => document.getElementById('card-png-upload-element')?.click()}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="card-png-upload-element"
                    />
                    <Image className={`w-5 h-5 mb-1.5 ${isUploadedImage ? 'text-[#adff2f]' : 'text-zinc-500'}`} />
                    <span className="text-[10px] font-sans font-extrabold text-white block">
                      {fileName ? 'PNG Uploaded' : 'Drag & Drop PNG card'}
                    </span>
                    <span className="text-[8px] text-zinc-500 font-mono mt-0.5 truncate max-w-full px-2">
                      {fileName ? fileName : 'or click to browse files'}
                    </span>
                  </div>

                  {/* External URL alternative */}
                  <div className="flex flex-col justify-between p-4 bg-zinc-900/20 border border-zinc-850 rounded-xl space-y-2">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-mono text-zinc-400 block font-bold uppercase">Or Web Image URL</span>
                      <p className="text-[8px] text-zinc-600 leading-normal font-sans">
                        Type or paste a PNG card URL from any external web repository:
                      </p>
                    </div>
                    <input
                      type="url"
                      placeholder="e.g. https://domain.com/card_graphic.png"
                      value={imageURL}
                      onChange={(e) => {
                        setImageURL(e.target.value);
                        if (e.target.value) {
                          // Default to true for any pasted images since users have PNG template URLs ready
                          setIsUploadedImage(true);
                          setFileName('');
                        }
                      }}
                      className="w-full text-[10px] bg-zinc-950 border border-zinc-850 focus:border-[#adff2f]/30 p-2.5 rounded-lg text-white outline-none font-mono placeholder:text-zinc-700 text-left"
                    />
                  </div>
                </div>

                {/* Explicit full graphic overlay toggle */}
                <div className="flex items-center space-x-3 bg-zinc-900/40 p-3 rounded-xl border border-zinc-900">
                  <input
                    type="checkbox"
                    id="toggle-overlay-suppress"
                    checked={isUploadedImage}
                    onChange={(e) => setIsUploadedImage(e.target.checked)}
                    className="accent-[#adff2f] rounded border-zinc-800 bg-zinc-950 text-black focus:ring-0 w-4 h-4 cursor-pointer"
                  />
                  <div className="text-left select-none">
                    <label htmlFor="toggle-overlay-suppress" className="block text-[10px] font-sans font-extrabold text-white uppercase cursor-pointer hover:text-[#adff2f] transition-colors">
                      Full Graphic PNG Mode (Hide standard text, chip & logo overlays)
                    </label>
                    <p className="text-[8px] text-zinc-500 font-mono mt-0.5">
                      Enable this to display your PNG image purely as-designed. Disabling this synthesizes default credit card number, chip, and bank overlays on top of your background.
                    </p>
                  </div>
                </div>

                {imageURL && (
                  <div className="flex items-center justify-between bg-zinc-950 border border-[#adff2f]/10 p-2 rounded-xl text-[10px] text-[#adff2f] font-sans px-3">
                    <span className="flex items-center space-x-1.5 font-mono truncate">
                      <Check className="w-3.5 h-3.5 text-[#adff2f] shrink-0" />
                      <span className="truncate">{fileName ? `PNG File Loaded: ${fileName}` : `Web Image URL Loaded`}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsUploadedImage(false);
                        setImageURL('');
                        setFileName('');
                      }}
                      className="text-[8px] font-mono text-rose-400 hover:text-rose-300 uppercase underline cursor-pointer shrink-0 ml-2"
                    >
                      Clear Image
                    </button>
                  </div>
                )}
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
                className={`w-full py-4 font-sans font-extrabold text-xs tracking-widest uppercase rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer mt-4 ${
                  editingCardId 
                    ? 'bg-amber-400 hover:bg-amber-300 text-black shadow-amber-400/20' 
                    : 'bg-[#adff2f] hover:bg-[#bbf04d] text-black shadow-[#adff2f]/10'
                }`}
              >
                {editingCardId ? (
                  <>
                    <Edit className="w-4 h-4 text-black" />
                    <span>SAVE CARD CONFIGURATION CHANGES</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 text-black" />
                    <span>CONFIRM CARD CONFIGURATION</span>
                  </>
                )}
              </button>

              {editingCardId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingCardId(null);
                    setName('');
                    setPrice('49.99');
                    setLimit('5000');
                    setImageURL('');
                    setFileName('');
                    setIsUploadedImage(false);
                    setDescription('');
                    setCustomTags('New, Admin Addition');
                    setCountry('United States');
                    setAddress('733 Bank Road Corporate HQ');
                  }}
                  className="w-full py-3 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white font-sans font-extrabold text-[10px] tracking-widest uppercase rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer mt-2"
                >
                  <span>CANCEL CARD EDITING</span>
                </button>
              )}

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
                  <th className="pb-3 font-semibold text-right">Operations</th>
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
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleStartEdit(card)}
                          className="p-2 bg-amber-950/20 hover:bg-amber-950/80 border border-amber-900/30 text-amber-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                          title="Edit this card configuration"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteCard(card.id)}
                          className="p-2 bg-red-950/20 hover:bg-red-950/80 border border-red-900/30 text-rose-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                          title="Delete this card configuration"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

          </>
        ) : (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300">
            <form onSubmit={handleSaveGateways} className="bg-zinc-950 p-6 sm:p-10 rounded-2xl border border-zinc-900 space-y-8 text-left max-w-4xl mx-auto">
              
              <div className="flex items-center space-x-2 border-b border-zinc-900 pb-4">
                <Sliders className="w-5 h-5 text-[#adff2f]" />
                <h3 className="text-white text-sm font-sans font-extrabold uppercase tracking-widest">
                  Configure Payment Gateway Rotation Pools
                </h3>
              </div>

              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Enter multiple payment destinations. To support flawless dynamic orchestration, NeoByte automatically selects and rotates these endpoints for purchasing users. The system ensures that the same payment destination does not repeat sequentially or recur for the same customer session.
              </p>

              {/* Eversend Section */}
              <div className="space-y-4">
                <div className="border-b border-zinc-900 pb-1.5 flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-[#adff2f] tracking-wider font-extrabold">&bull; EverSend Links (1 to 3 Options)</span>
                  <span className="text-[10px] text-zinc-500 font-sans italic">Custom web link gateways for Mobile Money</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider">EverSend Channel Link 1 (Primary)</label>
                    <input
                      type="url"
                      required
                      placeholder="e.g. https://eversend.me/..."
                      value={eversendLink1}
                      onChange={(e) => setEversendLink1(e.target.value)}
                      className="w-full text-xs bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl text-white outline-none focus:border-[#adff2f]/30 font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider">EverSend Channel Link 2</label>
                    <input
                      type="url"
                      placeholder="e.g. https://eversend.me/..."
                      value={eversendLink2}
                      onChange={(e) => setEversendLink2(e.target.value)}
                      className="w-full text-xs bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl text-white outline-none focus:border-[#adff2f]/30 font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider">EverSend Channel Link 3</label>
                    <input
                      type="url"
                      placeholder="e.g. https://eversend.me/..."
                      value={eversendLink3}
                      onChange={(e) => setEversendLink3(e.target.value)}
                      className="w-full text-xs bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl text-white outline-none focus:border-[#adff2f]/30 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Cryptocurrency Pool Section */}
              <div className="space-y-4 pt-4">
                <div className="border-b border-zinc-900 pb-1.5 flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-[#adff2f] tracking-wider font-extrabold">&bull; Crypto Wallet Address Pool</span>
                  <span className="text-[10px] text-zinc-500 font-sans italic">Rotated Bitcoin or multi-token addresses</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Bitcoin Address Option 1</label>
                    <input
                      type="text"
                      required
                      placeholder="Primary BTC address"
                      value={cryptoAddr1}
                      onChange={(e) => setCryptoAddr1(e.target.value)}
                      className="w-full text-xs bg-zinc-900 border border-zinc-805 p-2.5 rounded-xl text-white outline-none focus:border-[#adff2f]/30 font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Bitcoin Address Option 2</label>
                    <input
                      type="text"
                      placeholder="Alternative BTC address 2"
                      value={cryptoAddr2}
                      onChange={(e) => setCryptoAddr2(e.target.value)}
                      className="w-full text-xs bg-zinc-900 border border-zinc-805 p-2.5 rounded-xl text-white outline-none focus:border-[#adff2f]/30 font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Bitcoin Address Option 3</label>
                    <input
                      type="text"
                      placeholder="Alternative BTC address 3"
                      value={cryptoAddr3}
                      onChange={(e) => setCryptoAddr3(e.target.value)}
                      className="w-full text-xs bg-zinc-900 border border-zinc-805 p-2.5 rounded-xl text-white outline-none focus:border-[#adff2f]/30 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Web3Forms Integrated Automated Email System Section */}
              <div className="space-y-4 pt-6 border-t border-zinc-900">
                <div className="border-b border-zinc-900 pb-1.5 flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-[#adff2f] tracking-wider font-extrabold flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-lime-400" />
                    <span>&bull; Automated Email Dispatch Configuration (100% Free)</span>
                  </span>
                  <span className="text-[10px] text-zinc-500 font-sans italic">Custom secure credentials and selected design preview</span>
                </div>

                <p className="text-xs text-zinc-400 font-sans leading-relaxed text-left">
                  NeoByte supports <strong>Web3Forms</strong> to provide 100% free automated email integration. This service sends secure plain text emails containing complete card parameters and a beautiful visual design preview link of the card you selected to your clients immediately upon activation with <strong>zero subscription costs</strong>!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-950 p-5 rounded-xl border border-zinc-900 text-left">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-left">
                      <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider text-left">Web3Forms Free Access Key</label>
                      <a href="https://web3forms.com/" target="_blank" rel="noreferrer" className="text-[9px] text-[#adff2f] hover:underline font-mono uppercase flex items-center gap-1 cursor-pointer">
                        Get Free Key <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. 5e064ecf-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                      value={web3FormsKey}
                      onChange={(e) => setWeb3FormsKey(e.target.value)}
                      className="w-full text-xs bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl text-white outline-none focus:border-[#adff2f]/30 font-mono"
                    />
                    <div className="flex items-center space-x-2 pt-1.5 text-left">
                      <input
                        type="checkbox"
                        id="enable-web3-forms-checkbox"
                        checked={enableWeb3Forms}
                        onChange={(e) => setEnableWeb3Forms(e.target.checked)}
                        className="rounded border-zinc-800 bg-zinc-900 text-[#adff2f] focus:ring-[#adff2f]/20 w-4 h-4 cursor-pointer"
                      />
                      <label htmlFor="enable-web3-forms-checkbox" className="text-[11px] text-zinc-300 font-sans cursor-pointer select-none text-left">
                        Enable Automated API Email Send on Dispatch
                      </label>
                    </div>
                  </div>

                  <div className="space-y-3 border-t md:border-t-0 md:border-l border-zinc-900 md:pl-6 pt-4 md:pt-0 text-left">
                    <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider text-left">&bull; Live Test Email API Verification</span>
                    <p className="text-[10px] text-zinc-500 leading-relaxed font-sans text-left">
                      Verify key connectivity by triggering a diagnostic email carrying an active private demo node template.
                    </p>
                    <div className="flex gap-2 text-left">
                      <input
                        type="email"
                        placeholder="test-recipient@domain.com"
                        value={testEmail}
                        onChange={(e) => setTestEmail(e.target.value)}
                        className="flex-1 text-xs bg-zinc-900 border border-zinc-800 p-2 rounded-xl text-white outline-none focus:border-[#adff2f]/30 font-mono"
                      />
                      <button
                        onClick={handleSendTestEmail}
                        disabled={testEmailStatus === 'sending'}
                        className="px-3 py-2 bg-zinc-900 hover:bg-zinc-805 border border-zinc-800 text-zinc-300 hover:text-white font-bold font-mono text-[10px] uppercase rounded-xl cursor-pointer"
                      >
                        {testEmailStatus === 'sending' ? 'Sending...' : 'Test Send'}
                      </button>
                    </div>
                    {testEmailStatus === 'success' && (
                      <p className="text-[10px] text-emerald-400 font-mono font-bold text-left">&bull; Diagnostic test email successfully transferred to api.web3forms.com!</p>
                    )}
                    {testEmailStatus === 'error' && (
                      <p className="text-[10px] text-rose-500 font-mono font-bold text-left">&bull; Error: {testEmailError}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Save Button */}
              <div className="pt-6 border-t border-zinc-900">
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-[#adff2f] hover:bg-[#bbf04d] text-black font-sans font-extrabold text-xs tracking-widest uppercase rounded-xl transition-all shadow-md shrink-0 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Check className="w-4 h-4 text-black" />
                  <span>Update Gateway & Email Configurations</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
