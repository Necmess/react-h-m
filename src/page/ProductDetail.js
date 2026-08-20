import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../api";

function ProductDetail() {
  const { id } = useParams();
  const { isLoggedIn } = useAuth();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");

  useEffect(() => {
    if (!isLoggedIn) return;
    fetch(`${API_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id, isLoggedIn]);

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: `/product/${id}` }} replace />;
  }

  if (!product) {
    return (
      <div>
        <Header />
        <p className="loading">로딩중...</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="detail-card">
        <img src={product.img} alt={product.title} className="detail-img" />
        <div className="detail-info">
          <h2>{product.title}</h2>
          <p className="detail-price">₩ {product.price}</p>
          {product.choice && <p className="conscious">Conscious choice</p>}
          <select
            className="size-select"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="" disabled>
              사이즈 선택
            </option>
            {product.size.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button className="add-btn" disabled={!size}>
            추가
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
