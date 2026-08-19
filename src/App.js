import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProductAll from "./page/ProductAll";
import Login from "./page/Login";
import ProductDetail from "./page/ProductDetail";

//1. 전체상품 페이지, 로그인, 상품상세 페이지
//2. 전체 상품페이지에서는 전체 상품을 볼 수 있다.
//3. 로그인 버튼을 누르게 되면 로그인 페이지가 나온다
//4. 상품 디테일을 눌렀으나 로그인이 안 되어 있을경우 로그인 페이지가 먼저 나온다.
//5. 로그인이 되어 있을 경웅에는 상품 디테일 페이지를 볼 수 있다.
//6. 로그아웃 버튼을 클릭하면 로그아웃이 된다.
//7.로그아웃이 되면 상품 디테일 페이지를 볼 수 없다. 다시 로그인 페이지가 보인다.
//8. 로그인을 하면 로그아웃이 보이고 로그아웃을 하면 로그인이 보인다.

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<ProductAll />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
