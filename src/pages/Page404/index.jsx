import { Link } from 'react-router-dom';

import styles from './styles.module.css';

function Page404() {
  return (
    <div className={styles['page-404']}>
      <h2>Ops!</h2>
      <p>Parece que esta não é a página que você procurava!</p>
      <Link to="/" className="btn">Voltar para Home</Link>
    </div>
  );
}

export default Page404;
