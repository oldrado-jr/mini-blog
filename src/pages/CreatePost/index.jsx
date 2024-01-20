import PostForm from '../../components/PostForm';

import styles from './styles.module.css';

function CreatePost() {
  return (
    <div className={styles['create-post']}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
      <PostForm />
    </div>
  );
}

export default CreatePost;
