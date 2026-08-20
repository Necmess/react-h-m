import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import { API_URL } from "../api";

function ProductAll() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim().toLowerCase();

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const filteredProducts = query
    ? products.filter((product) => product.title.toLowerCase().includes(query))
    : products;

  return (
    <div>
      <Header />
      {query && (
        <p className="search-result-info">
          "{searchParams.get("q")}" 검색 결과 {filteredProducts.length}건
        </p>
      )}
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-card">
            <div className="product-thumb">
              <img src={product.img} alt={product.title} />
              {product.new && <span className="badge new">NEW</span>}
            </div>
            <p className="title">{product.title}</p>
            <p className="price">{product.price.toLocaleString()}원</p>
            {product.choice && <p className="conscious">Conscious choice</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductAll;
