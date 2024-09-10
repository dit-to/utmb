import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as LogoIcon } from '../assets/logo.svg';
import { ReactComponent as MenuIcon } from '../assets/ico-menu.svg';
import { ReactComponent as CloseIcon } from '../assets/ico-close.svg';

const Header = () => {
  const [menuClass, setMenuClass] = useState('translate-x-full');
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const location = useLocation();

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // 모바일 메뉴 토글
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      setMenuClass('translate-x-0');
    } else {
      setMenuClass('translate-x-full');
    }
  }, [isMobileMenuOpen]);

  const isActive = (path) => {
    return location.pathname === path ? 'text-primary-500 font-700' : '';
  };

  return (
    <header className="px-4 py-8 flex justify-center">
      <div className="flex w-full max-w-[1200px] items-center md:items-end rounded-full justify-between px-6 md:px-12 py-3 md:py-4 bg-white shadow-[0_0_20px_0_rgba(97,95,225,0.3)] outline-[1px] outline-primary-500 font-title">
        <div className="flex items-center">
          <LogoIcon onClick={() => navigate("/")} className="cursor-pointer h-[20px] md:h-[24px]" />
        </div>
        {/* 데스크탑 환경에서는 내비게이션 링크 표시, 모바일에서는 햄버거 메뉴 아이콘 표시 */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className={`hover:text-primary-500 hover:font-700 ${isActive('/')}`}>
            UTM 빌더
          </Link>
          <Link to="/metabuild" className={`hover:text-primary-500 hover:font-700 ${isActive('/metabuild')}`}>
            메타태그 빌더
          </Link>
          <Link to="/contact" className={`hover:text-primary-500 hover:font-700 ${isActive('/contact')}`}>
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
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleMenuToggle}></div>
          <div className={`fixed inset-y-0 right-0 w-64 bg-white px-6 py-8 md:hidden z-50 transition-transform duration-300 ease-in-out transform ${menuClass} translate-x-0 shadow-lg`}>
            <div className="flex justify-end items-center mb-10">
              <CloseIcon onClick={handleMenuToggle} className="cursor-pointer" />
            </div>
            <nav className="flex flex-col items-start space-y-6 font-title text-lg">
              <Link to="/" onClick={handleMenuToggle} className={`active:text-primary-500 ${isActive('/')}`}>
                UTM 빌더
              </Link>
              <Link to="/metabuild" onClick={handleMenuToggle} className={`active:text-primary-500 ${isActive('/metabuild')}`}>
                메타태그 빌더
              </Link>
              <Link to="/contact" onClick={handleMenuToggle} className={`active:text-primary-500 ${isActive('/contact')}`}>
                무엇이 필요하신가요?
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;