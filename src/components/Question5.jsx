// AppQuestions.jsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  memo,
} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Question5.css";

// ==================== QUESTION 5 & 6 ====================
/*
  Question 5: State Management
  - Explain the difference between local component state and global application state.
  - When to use each.
  - Example: Managing global state with Context API.

  Answer / Explanation:
  1. Local state: managed inside a single component using useState or useReducer.
     - Example: form input, toggle visibility, counters inside a component.
     - Use when data is specific to one component only.
  2. Global state: shared across multiple components.
     - Example: cartItems, auth user info, theme.
     - Use when multiple components need access to the same data.
  3. Context API: simple way to manage global state without Redux.
     - Here, AppContext provides cartItems and user info globally (lines 8-61).

  Question 6: Performance Optimization
  - Problem: React app re-renders too frequently.
  - Techniques to optimize:
      1. React.memo – prevent re-rendering if props don’t change.
      2. useCallback – memoize functions so they don’t re-create on every render.
      3. useMemo – memoize expensive calculations.
      4. (Extra) splitting components, lazy loading, avoiding anonymous functions in JSX.
*/

// ==================== GLOBAL CONTEXT ====================
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Global user state (Question 5)
  const [cartItems, setCartItems] = useState([]); // Global cart state (Question 5)

  // ==================== ADD TO CART ====================
  /*
    - Function to add items to cart.
    - Uses useCallback to prevent unnecessary re-renders (Question 6)
  */
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

  // ==================== UPDATE QUANTITY ====================
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

  const removeAll = () => setCartItems([]);

  return (
    <AppContext.Provider
      value={{ user, setUser, cartItems, addToCart, updateQty, removeAll }}
    >
      {children}
    </AppContext.Provider>
  );
};

// ==================== CUSTOM HOOK ====================
const useApp = () => useContext(AppContext);

// ==================== HEADER COMPONENT ====================
const Header = () => {
  const { user, cartItems, updateQty, removeAll, setUser } = useApp();
  const [showCart, setShowCart] = useState(false);

  const handleLogout = () => {
    setUser(null);
    removeAll();
  };

  const totalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm mb-4 bg-white">
      <div className="container d-flex justify-content-between align-items-center pt-0 pb-0">
        <h4 className="navbar-brand">🛒 My eCommerce</h4>
        <div className="d-flex align-items-center gap-3 position-relative">
          <button
            className="btn btn-outline-primary position-relative"
            onClick={() => setShowCart((prev) => !prev)}
          >
            Cart
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {totalQty}
            </span>
          </button>

          {user ? (
            <>
              <span>Welcome, {user.username}</span>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <span className="text-muted">Not logged in</span>
          )}

          {showCart && (
            <div
              className="card shadow position-absolute p-3"
              style={{
                top: "50px",
                right: "0",
                width: "350px",
                maxHeight: "400px",
                overflowY: "auto",
                zIndex: 999,
                borderRadius: "10px",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6>🛍️ Shopping Cart</h6>
                {cartItems.length > 0 && (
                  <button className="btn btn-sm btn-danger" onClick={removeAll}>
                    Remove All
                  </button>
                )}
              </div>

              {cartItems.length === 0 ? (
                <p className="text-muted">No items in cart.</p>
              ) : (
                <ul className="list-group">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            borderRadius: "5px",
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <strong>{item.name}</strong>
                          <div className="d-flex align-items-center mt-1">
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => updateQty(item.id, "minus")}
                            >
                              -
                            </button>
                            <span className="mx-2 fw-bold">
                              {item.quantity}
                            </span>
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => updateQty(item.id, "plus")}
                            >
                              +
                            </button>
                          </div>
                          <small>${item.price} each</small>
                        </div>
                      </div>
                      <div className="fw-bold">
                        ${item.price * item.quantity}
                      </div>
                    </li>
                  ))}
                  <li className="list-group-item d-flex justify-content-between fw-bold">
                    Total: <span>${totalPrice}</span>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// ==================== LOGIN FORM ====================
const LoginForm = ({ onLogin }) => {
  const { setUser } = useApp();
  const [username, setUsername] = useState(""); // Local state example (Question 5)
  const [password, setPassword] = useState(""); // Local state example

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) return alert("Enter username and password");
    setUser({ username }); // Updates global state
    onLogin();
  };

  return (
    <form
      className="card p-4 shadow-sm mb-4"
      onSubmit={handleLogin}
      style={{ maxWidth: "400px", width: "100%" }}
    >
      <h4 className="mb-3 text-center">Login</h4>
      <input
        className="form-control mb-2"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="form-control mb-3"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-primary w-100">Login</button>
    </form>
  );
};

// ==================== PRODUCT CARD ====================
const ProductCard = memo(({ product }) => {
  /*
    React.memo prevents unnecessary re-renders (Question 6 optimization)
    - Component only re-renders if props change
  */
  const { cartItems, addToCart, updateQty } = useApp();
  const existingItem = cartItems.find((item) => item.id === product.id);
  const quantity = existingItem ? existingItem.quantity : 0;

  return (
    <div className="card mb-3 shadow-sm w-100" style={{ transition: "0.3s" }}>
      <img
        src={product.image}
        alt={product.name}
        className="card-img-top"
        style={{ borderRadius: "5px", objectFit: "cover", height: "180px" }}
      />
      <div className="card-body text-center">
        <h6 className="card-title">{product.name}</h6>
        <p className="text-success fw-bold">${product.price}</p>
        {quantity > 0 ? (
          <div className="d-flex align-items-center justify-content-center gap-2">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => updateQty(product.id, "minus")}
            >
              -
            </button>
            <span className="fw-bold">{quantity}</span>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => updateQty(product.id, "plus")}
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="btn btn-primary w-100"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
});

// ==================== DASHBOARD ====================
const Dashboard = () => {
  const { user } = useApp();
  const products = [
    {
      id: 1,
      name: "Laptop",
      price: 1000,
      image:
        "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
    },
    {
      id: 2,
      name: "Headphones",
      price: 200,
      image:
        "https://media.istockphoto.com/id/1409084101/photo/headphones-isolated-on-a-white-background.jpg?s=612x612&w=0&k=20&c=mencTPkIXEL0qRiid_JvPilONMyz6XseVB7st3vC1bI=",
    },
    {
      id: 3,
      name: "Smartphone",
      price: 500,
      image:
        "https://images.unsplash.com/photo-1573148195900-7845dcb9b127?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
    },
    {
      id: 4,
      name: "Keyboard",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1628676633339-81fc485c635c?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
    },
  ];

  if (!user) return null;

  return (
    <div className="container mb-5">
      <div className="row g-4 justify-content-center">
        {products.map((p) => (
          <div
            key={p.id}
            className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

// ==================== MAIN APP ====================
const AppQuestions = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <AppProvider>
      <Header />
      <div className="d-flex flex-column align-items-center">
        {!loggedIn && <LoginForm onLogin={() => setLoggedIn(true)} />}
        <Dashboard />
      </div>
    </AppProvider>
  );
};

export default AppQuestions;

/*
  ==================== QUESTION 5 & 6 SUMMARY ====================
  Question 5 (State Management):
    - Local state: username/password input in LoginForm (lines 147-148)
    - Global state: user, cartItems in AppContext (lines 14-16)
    - Context API used to manage global state (lines 8-61)
  Question 6 (Performance Optimization):
    - Techniques: React.memo, useCallback (lines 151-156, 26-36)
    - React.memo used in ProductCard to prevent unnecessary re-renders
    - useCallback used in addToCart and updateQty to memoize functions
    - Result: reduces re-rendering, improves performance
*/
