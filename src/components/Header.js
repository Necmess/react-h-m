import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CATEGORIES = ["여성", "Divided", "남성", "신생아/유아", "아동", "H&M HOME", "Sale", "지속가능성"];

function Header() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(query.trim() ? `/?q=${encodeURIComponent(query.trim())}` : "/");
  };

  return (
    <header className="header">
      <div className="header-top">
        <button
          className="hamburger"
          onClick={() => setMenuOpen(true)}
          aria-label="메뉴 열기"
        >
          ☰
        </button>
        <Link to="/" className="logo">
          H&M
        </Link>
        <div className="header-actions">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="제품검색"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="icon-btn" aria-label="검색">
              🔍
            </button>
          </form>
          {isLoggedIn ? (
            <button className="auth-btn" onClick={logout}>
              로그아웃
            </button>
          ) : (
            <Link to="/login" className="auth-btn">
              로그인
            </Link>
          )}
        </div>
      </div>

      <nav className="nav">
        {CATEGORIES.map((label) => (
          <Link key={label} to="/" className="nav-link">
            {label}
          </Link>
        ))}
      </nav>

      {menuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="메뉴 닫기"
            >
              ×
            </button>
            {CATEGORIES.map((label) => (
              <Link
                key={label}
                to="/"
                className="mobile-nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
