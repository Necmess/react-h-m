import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import { API_URL } from "../api";

function ProductAll() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter");

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const filteredProducts = products.filter((product) => {
    if (filter === "new") return product.new;
    if (filter === "choice") return product.choice;
    return true;
  });

  return (
    <div>
      <Header />
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-card">
            <div className="product-thumb">
              <img src={product.img} alt={product.title} />
              <div className="badges">
                {product.new && <span className="badge new">NEW</span>}
                {product.choice && <span className="badge choice">CHOICE</span>}
              </div>
            </div>
            <p className="title">{product.title}</p>
            <p className="price">{product.price.toLocaleString()}원</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductAll;
