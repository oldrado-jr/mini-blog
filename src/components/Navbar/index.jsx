import { NavLink } from 'react-router-dom';

import styles from './styles.module.css';

function Navbar() {
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
        <li>
          <NavLink to="/about" className={isLinkActive}>Sobre</NavLink>
        </li>
      </menu>
    </nav>
  );
}

export default Navbar;
