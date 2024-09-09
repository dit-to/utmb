import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as LogoIcon } from '../assets/logo.svg';
import { ReactComponent as MenuIcon } from '../assets/ico-menu.svg';

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 모바일 메뉴 상태 관리

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // 모바일 메뉴 토글
  };

  return (
    <header className="px-4 py-8 flex justify-center">
      <div className="flex w-full max-w-[1200px] items-center md:items-end rounded-full justify-between px-6 md:px-12 py-4 bg-white shadow-[0_0_20px_0_rgba(97,95,225,0.3)] outline-[1px] outline-primary-500 font-title">
        <div className="flex items-center">
          <LogoIcon onClick={() => navigate("/")} className="cursor-pointer h-[24px]" />
        </div>
        {/* 데스크탑 환경에서는 내비게이션 링크 표시, 모바일에서는 햄버거 메뉴 아이콘 표시 */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-primary-500 hover:font-700">
            UTM 빌더
          </Link>
          <Link to="/metabuild" className="hover:text-primary-500 hover:font-700">
            메타태그 빌더
          </Link>
          <Link to="/contact" className="hover:text-primary-500 hover:font-700">
            무엇이 필요하신가요?
          </Link>
        </nav>
        {/* 모바일 환경에서는 햄버거 메뉴 아이콘 표시 */}
        <div className="md:hidden flex items-center">
          <MenuIcon onClick={handleMenuToggle} />
        </div>
      </div>
      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-lg p-4 md:hidden z-50">
          <nav className="flex flex-col items-start space-y-4">
            <Link to="/" onClick={handleMenuToggle} className="hover:text-primary-500">
              UTM 빌더
            </Link>
            <Link to="/metabuild" onClick={handleMenuToggle} className="hover:text-primary-500">
              메타태그 빌더
            </Link>
            <Link to="/contact" onClick={handleMenuToggle} className="hover:text-primary-500">
              무엇이 필요하신가요?
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;