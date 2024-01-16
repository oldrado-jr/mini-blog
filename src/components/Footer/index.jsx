import styles from './styles.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <h3>Escreva sobre o que você tem interesse!</h3>
      <p>Mini Blog &copy; {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
