import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useInsertDocument } from '../../hooks/useInsertDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import { useAuthValue } from '../../context/AuthContext';

import styles from './styles.module.css';

function PostForm({ id, post }) {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [formError, setFormError] = useState('');

  const { user } = useAuthValue();
  const { insertDocument, response: insertResponse } = useInsertDocument('posts');
  const { updateDocument, response: updateResponse } = useUpdateDocument('posts');

  const response = id ? updateResponse : insertResponse;
  const { loading, error } = response;

  const navigate = useNavigate();

  const validateForm = () => {
    setFormError('');

    // validate the image URL
    try {
      new URL(image);
    } catch (error) {
      setFormError('A imagem precisa ser uma URL.');
    }

    // check all form values
    if (!(title && image && tags && body)) {
      setFormError('Por favor, preencha todos os campos!');
    }
  };

  const saveDocument = async () => {
    // split tags into an array
    const tagsList = tags.split(',').map((tag) => tag.trim().toLowerCase());

    let navigateTo;

    // check if the form is handling an update or an insertion
    if (id) {
      const data = {
        title,
        image,
        body,
        tagsList,
      };

      await updateDocument(id, data);

      navigateTo = '/dashboard';
    } else {
      const { uid, displayName } = user;

      const data = {
        title,
        image,
        body,
        tagsList,
        uid,
        createdBy: displayName,
      };

      await insertDocument(data);

      navigateTo = '/';
    }

    // navigate to another page after action is executed
    navigate(navigateTo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateForm();

    if (formError) {
      return;
    }

    await saveDocument();
  };

  useEffect(() => {
    if (!post) {
      return;
    }

    const { title, image, body, tagsList } = post;

    setTitle(title);
    setImage(image);
    setBody(body);

    const joinedTags = tagsList.join(', ');
    setTags(joinedTags);
  }, [post]);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Título:</span>
        <input
          type="text"
          name="title"
          required
          placeholder="Pense num bom título..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        <span>URL da imagem:</span>
        <input
          type="url"
          name="image"
          required
          placeholder="Insira uma URL da imagem que representa o seu post"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </label>
      {post && (
        <>
          <p className={styles['preview-title']}>
            Preview da imagem atual:
          </p>
          <img
            className={styles['image-preview']}
            src={post.image}
            alt={post.title}
          />
        </>
      )}
      <label>
        <span>Conteúdo:</span>
        <textarea
          name="body"
          required
          placeholder="Insira o conteúdo do post"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </label>
      <label>
        <span>Tags:</span>
        <input
          type="text"
          name="tags"
          required
          placeholder="Insira as tags separadas por vírgula"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </label>
      {!loading && <button className="btn">Salvar</button>}
      {loading && <button className="btn" disabled>Aguarde...</button>}
      {error && <p className="error">{error}</p>}
      {formError && <p className="error">{formError}</p>}
    </form>
  );
}

PostForm.propTypes = {
  id: PropTypes.string,
  post: PropTypes.object,
};

export default PostForm;
