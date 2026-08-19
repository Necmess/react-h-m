import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../api";

function ProductDetail() {
  const { id } = useParams();
  const { isLoggedIn } = useAuth();
  const [product, setProduct] = useState(null);

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
      <div className="product-detail">
        <img src={product.img} alt={product.title} />
        <div className="detail-info">
          <div className="badges">
            {product.new && <span className="badge new">NEW</span>}
            {product.choice && <span className="badge choice">CHOICE</span>}
          </div>
          <h2>{product.title}</h2>
          <p className="price">{product.price.toLocaleString()}원</p>
          <div className="sizes">
            {product.size.map((s) => (
              <button key={s} className="size-btn">
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
