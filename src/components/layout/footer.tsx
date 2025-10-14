'use client';
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex items-center justify-center py-6 border-t border-gray-800 bg-[#16151d] text-gray-400 text-sm">
      © {currentYear} AdaPerp. All rights reserved.
    </footer>
  );
};

export default Footer;