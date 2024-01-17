import { Link } from "react-router-dom";

import styles from './styles.module.css';

function About() {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o Mini <span>Blog</span>
      </h2>
      <p>
        Este projeto consiste em um blog feito com React no frontend e Firebase no backend.
      </p>
      <p>
        <strong>
          Certifique-se de desativar o bloqueador de anúncios ao manipular os posts.
        </strong>
      </p>
      <Link to="/posts/create" className="btn">Criar post</Link>
    </div>
  );
}

export default About;
