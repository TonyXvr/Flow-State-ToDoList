import React from 'react';
import TronLogo from './TronLogo';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <TronLogo />
      <h1 className="text-4xl font-tr2n text-tron-glow tron-glow-text tracking-wider">
        FLOW<span className="text-tron-text">STATE</span>
      </h1>
      <p className="mt-2 text-tron-dim">Stay in the flow with your tasks</p>
    </header>
  );
};

export default Header;
