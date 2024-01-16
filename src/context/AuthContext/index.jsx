import { createContext, useContext } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export function AuthProvider({ children, value }) {
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.any,
};

export function useAuthValue() {
  return useContext(AuthContext);
}
