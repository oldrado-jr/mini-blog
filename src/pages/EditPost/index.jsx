import { useParams } from 'react-router-dom';

import { useFetchDocument } from '../../hooks/useFetchDocument';

import PostForm from '../../components/PostForm';

import styles from './styles.module.css';

function EditPost() {
  const { id } = useParams();
  const { document: post } = useFetchDocument('posts', id);

  return (
    <div className={styles['edit-post']}>
      {post && (
        <>
          <h2>Editando post: {post && post.title}</h2>
          <p>Altere os dados do post como desejar.</p>
          <PostForm id={id} post={post} />
        </>
      )}
    </div>
  );
}

export default EditPost;
