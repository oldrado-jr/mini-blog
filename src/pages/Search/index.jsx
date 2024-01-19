import { Link } from 'react-router-dom';

import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';

import PostDetail from '../../components/PostDetail';

import styles from './styles.module.css';

function Search() {
  const query = useQuery();
  const search = query.get('q');

  const { documents: posts } = useFetchDocuments('posts', search);

  return (
    <div className={styles['search-container']}>
      <h2>Search</h2>
      <div>
        {posts && posts.length === 0 && (
          <div className="no-posts">
            <p>
              Não foram encontrados posts a partir da sua busca...
            </p>
            <Link to="/" className="btn btn-dark">
              Voltar
            </Link>
          </div>
        )}
        {posts && posts.map((post) => (
          <PostDetail key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Search;
