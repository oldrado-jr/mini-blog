import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

import { AuthProvider } from './context/AuthContext';
import { useAuthentication } from './hooks/useAuthentication';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';

import './App.css';

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const isLoadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (isLoadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <AuthProvider value={user}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
