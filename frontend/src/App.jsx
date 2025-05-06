import { useCallback, useState } from "react";
import "./App.css";
import { AuthContext } from "./shared/context/AuthContext";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./shared/components/Navbar";
import Footer from "./shared/components/Footer";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import { Outlet } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = useCallback((userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  }, []);
  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{ user, login, logout, isAuthenticated, setUser }}
      >
        <Router>
          <Routes>
            {isAuthenticated ? (
              <>
                <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
                {/* <Route path="/about" element={<About />} /> */}
                {/* <Route path="/create" element={<Create />} /> */}
                </Route>
              </>
            ) : (
              <>
                <Route path="/" element={<Login />} />
                {/* <Route path="/about" element={<About />} /> */}
              </>
            )}
          </Routes>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

const Layout = (props) => {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
