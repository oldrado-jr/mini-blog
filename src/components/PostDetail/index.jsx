import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

function PostDetail({ post }) {
  const { id, title, image, tagsList, createdBy } = post;

  return (
    <div className={styles['post-detail']}>
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p className={styles['created-by']}>{createdBy}</p>
      <div className={styles.tags}>
        {tagsList.map((tag) => (
          <p key={tag}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
      <Link to={`/posts/${id}`} className="btn btn-outline">
        Ler
      </Link>
    </div>
  );
}

PostDetail.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostDetail;
