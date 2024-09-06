import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as LogoIcon } from '../assets/logo.svg';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className='px-4 py-8 flex justify-center'>
      <div className="flex w-full max-w-[1200px] items-end rounded-full justify-between px-12 py-4 bg-white shadow-[0_0_20px_0_rgba(97,95,225,0.3)] outline-[1px] outline-primary-500 font-title">
        <div className="flex items-center">
          <span className="font-bold text-xl"><LogoIcon onClick={() => navigate("/")} className='cursor-pointer'/></span>
        </div>
        <nav className="flex items-center space-x-6">
          {/* 네비게이션 링크 */}
          <Link to="/" className="hover:text-primary-500 hover:font-700">UTM 빌더</Link>
          <Link to="/metabuild" className="hover:text-primary-500 hover:font-700">메타태그 빌더</Link>
          <Link to="/contact" className="hover:text-primary-500 hover:font-700">무엇이 필요하신가요?</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;