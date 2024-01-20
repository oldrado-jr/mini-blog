import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

import { AuthProvider } from './context/AuthContext';
import { useAuthentication } from './hooks/useAuthentication';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import AppRoutes from './routes';

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
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <AppRoutes user={user} />
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
