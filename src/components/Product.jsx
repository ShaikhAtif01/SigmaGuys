import React, { useState, useEffect, useCallback, memo } from "react";
import "./Product.css";

// =======================
// Performance Optimization
// =======================
const ProductCard = memo(({ product, addToCart }) => {
  return (
    <div className="card product-card m-2 shadow-sm">
      <div className="product-image-wrapper">
        <img
          src={product.image}
          className="card-img-top product-image"
          alt={product.title}
        />
        <button
          className="btn btn-theme add-to-cart-btn"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
      <div className="card-body text-center">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">${product.price}</p>
        <button
          className="btn btn-sm btn-success mt-2"
          onClick={() => addToCart(product)}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
});

const Product = ({ user, onLogout }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);

  // API fetch
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Add to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const prevQty = prev[product.id]?.quantity || 0;
      return { ...prev, [product.id]: { ...product, quantity: prevQty + 1 } };
    });
  };

  const increment = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: { ...prev[id], quantity: prev[id].quantity + 1 },
    }));
  };

  const decrement = (id) => {
    setCart((prev) => {
      const qty = prev[id].quantity - 1;
      if (qty <= 0) {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }
      return { ...prev, [id]: { ...prev[id], quantity: qty } };
    });
  };

  const renderSkeletons = () => {
    return Array(6)
      .fill(0)
      .map((_, idx) => (
        <div
          key={idx}
          className="card product-card m-2 shadow-sm skeleton-card"
        >
          <div className="skeleton-image"></div>
          <div className="card-body text-center">
            <div className="skeleton-text mb-2"></div>
            <div className="skeleton-text short"></div>
          </div>
        </div>
      ));
  };

  return (
    <div className="container mt-5 pt-5">
      {/* User Info, Logout & Cart Button */}
      <div className="d-flex justify-content-end align-items-center mb-4">
        <span className="me-3">
          Welcome, <strong>{user.username}</strong>
        </span>
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => setShowCart(!showCart)}
        >
          Cart ({Object.keys(cart).length})
        </button>
        <button className="btn btn-outline-danger" onClick={onLogout}>
          Logout
        </button>
      </div>

      <h2 className="mb-4">Products Page</h2>

      {/* Loading */}
      {loading && <div className="d-flex flex-wrap">{renderSkeletons()}</div>}

      {/* Error */}
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {/* Product List */}
      {!loading && !error && (
        <div className="d-flex flex-wrap justify-content-start">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))
          ) : (
            <p className="text-center">No products available.</p>
          )}
        </div>
      )}

      {/* Cart Panel */}
      {showCart && Object.keys(cart).length > 0 && (
        <div className="cart-panel position-fixed top-0 end-0 h-100 bg-light shadow p-3">
          <h5>My Cart</h5>
          <button
            className="btn btn-sm btn-outline-secondary mb-2"
            onClick={() => setShowCart(false)}
          >
            Close
          </button>
          {Object.values(cart).map((item) => (
            <div
              key={item.id}
              className="d-flex justify-content-between align-items-center mb-2"
            >
              <span className="flex-grow-1">{item.title}</span>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-sm btn-outline-secondary me-1"
                  onClick={() => decrement(item.id)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="btn btn-sm btn-outline-secondary ms-1"
                  onClick={() => increment(item.id)}
                >
                  +
                </button>
              </div>
              <span className="ms-2">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between fw-bold">
            <span>Total:</span>
            <span>
              $
              {Object.values(cart)
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
