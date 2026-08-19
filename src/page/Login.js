import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    navigate(from, { replace: true });
  };

  return (
    <div className="login-page">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="아이디" defaultValue="test" />
        <input type="password" placeholder="비밀번호" defaultValue="1234" />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login;
