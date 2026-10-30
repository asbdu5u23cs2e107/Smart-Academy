import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 'fsd',
      title: 'Full Stack Development',
      trainer: 'John David',
      duration: '6 Months',
      rating: 4.9,
      price: 30000,   
      image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'react-adv',
      title: 'React Advanced',
      trainer: 'Priya',
      duration: '2 Months',
      rating: 4.8,
      price: 10000,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80',
    }
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(5000); // Predefined default discount of ₹5,000

  const addToCart = (course) => {
    if (!cartItems.find(item => item.id === course.id)) {
      setCartItems([...cartItems, course]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const applyCoupon = (code) => {
    setCouponCode(code);
    if (code.toUpperCase() === 'SMART5000') {
      setDiscount(5000);
      return true;
    } else {
      setDiscount(0);
      return false;
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setCouponCode('');
    setDiscount(0);
  };

  const totalOriginalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
  const finalPrice = Math.max(0, totalOriginalPrice - discount);

  return (
    <CartContext.Provider value={{
      cartItems,
      couponCode,
      discount,
      totalOriginalPrice,
      finalPrice,
      addToCart,
      removeFromCart,
      applyCoupon,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
