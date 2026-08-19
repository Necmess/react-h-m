import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = [
  { label: "전체", filter: null },
  { label: "신상품", filter: "new" },
  { label: "추천상품", filter: "choice" },
];

function Header() {
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const activeFilter = searchParams.get("filter");

  return (
    <header className="header">
      <div className="header-top">
        <Link to="/" className="logo">
          H&M
        </Link>
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
      <nav className="nav">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === "/" && activeFilter === item.filter;
          return (
            <Link
              key={item.label}
              to={item.filter ? `/?filter=${item.filter}` : "/"}
              className={`nav-link${isActive ? " active" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

export default Header;
