
import React, { useState } from 'react';
import { CheckoutForm } from './components/CheckoutForm';
import { OrderSummary } from './components/OrderSummary';
import { CartItem } from './types';

const MOCK_CART: CartItem[] = [
  {
    id: '1',
    name: 'Premium Leather Briefcase',
    price: 249.00,
    quantity: 1,
    image: 'https://picsum.photos/seed/briefcase/300/300',
    variant: 'Cognac Brown'
  },
  {
    id: '2',
    name: 'Minimalist Wrist Watch',
    price: 185.00,
    quantity: 1,
    image: 'https://picsum.photos/seed/watch/300/300',
    variant: 'Space Grey'
  }
];

const App: React.FC = () => {
  const [cart] = useState<CartItem[]>(MOCK_CART);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleCheckout = async (data: any) => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setOrderComplete(true);
    console.log('Order processed:', data);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Thank you for your order!</h2>
          <p className="text-gray-600">Your order #ORD-77421 has been placed successfully. We've sent a confirmation email to your inbox.</p>
          <button 
            onClick={() => setOrderComplete(false)}
            className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 py-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">LUXECOMMERCE</span>
          </div>
          <div className="hidden sm:flex items-center text-sm font-medium text-gray-500 gap-8">
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">1</span>
              <span className="text-indigo-600">Checkout</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs">2</span>
              <span>Review</span>
            </span>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 xl:col-span-8">
            <CheckoutForm onSubmit={handleCheckout} isProcessing={isProcessing} />
          </div>

          {/* Right Column: Order Summary (Sticky) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-28">
              <OrderSummary items={cart} />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 text-center text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2024 LuxeCommerce. All rights reserved. Secure encrypted checkout.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
