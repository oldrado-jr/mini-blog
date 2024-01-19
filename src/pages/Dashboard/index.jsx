import { Link } from 'react-router-dom';

import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

function Dashboard() {
  const { user } = useAuthValue();
  const { uid } = user;

  const { documents: posts } = useFetchDocuments('posts', null, uid);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>
      {posts && posts.length === 0 ? (
        <div>
          <p>Não foram encontrados posts</p>
          <Link to="/posts/create" className="btn">
            Criar primeiro post
          </Link>
        </div>
      ) : (
        <div>
          {posts && posts.map(({ id, title }) => (
            <div key={id}>
              <h3>{title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
