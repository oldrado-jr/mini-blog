import { Link } from 'react-router-dom';

import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

function Dashboard() {
  const { user } = useAuthValue();
  const { uid } = user;

  const { documents: posts, loading } = useFetchDocuments('posts', null, uid);

  if (loading) {
    return <p>Carregando...</p>;
  }

  const deletePost = (id) => { };

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
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {posts && posts.map(({ id, title }) => (
              <tr key={id}>
                <td>{title}</td>
                <td>
                  <Link to={`/posts/${id}`} className="btn btn-outline">
                    Ver
                  </Link>
                  <Link to={`/posts/edit/${id}`} className="btn btn-outline">
                    Editar
                  </Link>
                  <button
                    type="button"
                    className="btn btn-outline btn-danger"
                    onClick={() => deletePost(id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
