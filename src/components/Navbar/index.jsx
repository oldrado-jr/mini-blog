import { NavLink } from 'react-router-dom';

import { useAuthValue } from '../../context/AuthContext';

import { useAuthentication } from '../../hooks/useAuthentication';

import styles from './styles.module.css';

function Navbar() {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  const isLinkActive = ({ isActive }) => {
    return isActive ? styles.active : '';
  };

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        Mini <span>Blog</span>
      </NavLink>
      <menu className={styles['links-list']}>
        <li>
          <NavLink to="/" className={isLinkActive}>Home</NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink to="/login" className={isLinkActive}>Entrar</NavLink>
            </li>
            <li>
              <NavLink to="/register" className={isLinkActive}>Cadastrar</NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink to="/posts/create" className={isLinkActive}>Novo post</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className={isLinkActive}>Dashboard</NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink to="/about" className={isLinkActive}>Sobre</NavLink>
        </li>
        {user && (
          <li>
            <button onClick={logout}>Sair</button>
          </li>
        )}
      </menu>
    </nav>
  );
}

export default Navbar;
