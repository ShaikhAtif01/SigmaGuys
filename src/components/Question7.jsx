// Question7MiniCartWithTheme.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Question5.css";
import "./Question7.css";
// ==================== QUESTION 7 ====================
/*
  Question 7: API Integration & Error Handling
  - Fetch products from API (/api/products or fakestoreapi.com here)
  - Show loading state and error state
  - UI should be user-friendly (spinner, retry button, search)
  
  Answer / Explanation:
  1. Loading state: shows spinner and message while API request is in progress
  2. Error state: displays error message and retry button if API fails
  3. Products list: filtered by search input for better UX
  4. Global state: cartItems managed via Context API (reusable across components)
*/

// ==================== GLOBAL CONTEXT ====================
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const addToCart = useCallback((product) => {
    setCartItems((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  }, []);

  // Update quantity
  const updateQty = useCallback((id, type) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  type === "plus" ? item.quantity + 1 : item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  // Remove single item
  const removeItem = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Calculate total price and quantity
  const totalPrice = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems]
  );
  const totalQty = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );

  return (
    <AppContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQty,
        removeItem,
        totalPrice,
        totalQty,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => useContext(AppContext);

// ==================== HEADER / MINI CART ====================
const HeaderCart = () => {
  const { cartItems, totalQty, totalPrice, updateQty, removeItem } = useApp();
  const [showCart, setShowCart] = useState(false);

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top shadow-sm mb-4"
      style={{
        background: "linear-gradient(to right, #134547 0%, #134547 100%)",
        color: "#fff",
      }}
    >
      <div className="container d-flex justify-content-between align-items-center pt-0 pb-0">
        <h4 className="navbar-brand text-white">🛒 API Store</h4>
        <div className="position-relative">
          <button
            className="btn btn-light position-relative"
            onClick={() => setShowCart((prev) => !prev)}
          >
            Cart
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {totalQty}
            </span>
          </button>

          {/* Mini Cart Dropdown */}
          {showCart && (
            <div
              className="card shadow p-3"
              style={{
                width: "300px",
                position: "absolute",
                right: 0,
                top: "120%",
                zIndex: 1000,
                backgroundColor: "#e8f0f0",
              }}
            >
              <h6 className="mb-2">🛍️ Cart Items</h6>
              {cartItems.length === 0 ? (
                <p className="text-muted">Your cart is empty.</p>
              ) : (
                <div>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between align-items-center mb-2"
                    >
                      <div>
                        {item.title}
                        <div className="d-flex align-items-center mt-1 gap-1">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => updateQty(item.id, "minus")}
                          >
                            -
                          </button>
                          <span className="fw-bold">{item.quantity}</span>
                          <button
                            className="btn btn-sm btn-outline-success"
                            onClick={() => updateQty(item.id, "plus")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div>
                        <strong>${item.price * item.quantity}</strong>
                        <button
                          className="btn btn-sm btn-danger ms-2"
                          onClick={() => removeItem(item.id)}
                        >
                          x
                        </button>
                      </div>
                    </div>
                  ))}
                  <hr />
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total:</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// ==================== PRODUCT CARD ====================
const ProductCard = ({ product }) => {
  const { cartItems, addToCart, updateQty } = useApp();
  const exist = cartItems.find((item) => item.id === product.id);
  const qty = exist ? exist.quantity : 0;

  return (
    <div className="col-12 col-sm-6 col-md-4 mb-4">
      <div
        className="card h-100 shadow-sm product-card"
        style={{ borderTop: "4px solid #134547" }}
      >
        <img
          src={product.image}
          alt={product.title}
          className="card-img-top p-3"
          style={{ height: "200px", objectFit: "contain" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text fw-bold text-success mt-auto">
            ${product.price}
          </p>
          {qty > 0 ? (
            <div className="d-flex justify-content-center align-items-center gap-2 mt-2">
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => updateQty(product.id, "minus")}
              >
                −
              </button>
              <span className="fw-bold">{qty}</span>
              <button
                className="btn btn-outline-success btn-sm"
                onClick={() => updateQty(product.id, "plus")}
              >
                +
              </button>
            </div>
          ) : (
            <button
              className="btn w-100 mt-2"
              style={{
                background:
                  "linear-gradient(to right, #134547 0%, #134547 100%)",
                color: "#fff",
              }}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
const Question7 = () => {
  // Local state for API products, loading, error, search
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://fakestoreapi.com/products"); // API endpoint
      if (!res.ok) throw new Error("Failed to fetch products!");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products by search
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppProvider>
      <HeaderCart />

      <div className="container my-3">
        {/* ==================== Search Bar ==================== */}
        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              borderTopLeftRadius: "25px",
              borderBottomLeftRadius: "25px",
              border: "1px solid #134547",
              padding: "10px 15px",
            }}
          />
          <button
            className="btn"
            onClick={() => {}}
            style={{
              background: "linear-gradient(to right, #134547 0%, #134547 100%)",
              color: "#fff",
              borderTopRightRadius: "25px",
              borderBottomRightRadius: "25px",
              padding: "10px 20px",
            }}
          >
            Search
          </button>
        </div>

        {/* ==================== Loading State ==================== */}
        {loading && (
          <div className="text-center my-4">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="text-secondary mt-2">
              Fetching products, please wait...
            </p>
          </div>
        )}

        {/* ==================== Error State ==================== */}
        {error && (
          <div className="text-center my-4">
            <div className="alert alert-danger">{error}</div>
            <button className="btn btn-warning" onClick={fetchProducts}>
              Retry
            </button>
          </div>
        )}

        {/* ==================== Products List ==================== */}
        <div className="row">
          {!loading &&
            !error &&
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

          {!loading && !error && filteredProducts.length === 0 && (
            <p className="text-center text-muted">No products found.</p>
          )}
        </div>
      </div>
    </AppProvider>
  );
};

export default Question7;
