import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";

import { db } from '../firebase/config';

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  const isCancelled = () => {
    if (cancelled) {
      return;
    }
  };

  const createUser = async (data) => {
    isCancelled();

    setLoading(true);
    setError(null);

    try {
      const { displayName, email, password } = data;

      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(user, {
        displayName
      });

      return user;
    } catch (err) {
      let systemErrorMessage;

      if (err.message.includes('Password')) {
        systemErrorMessage = 'A senha precisa conter pelo menos 6 caracteres.';
      } else if (err.message.includes('email-already')) {
        systemErrorMessage = 'E-mail já cadastrado.';
      } else {
        systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde.';
      }

      setError(systemErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  // logout - sign out
  const logout = () => {
    isCancelled();
    signOut(auth);
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
  };
};
