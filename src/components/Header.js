import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="header">
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
    </header>
  );
}

export default Header;
