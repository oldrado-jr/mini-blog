import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";

import styles from './styles.module.css';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [formError, setFormError] = useState('');

  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument('posts');
  const { loading, error } = response;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    if (formError) {
      return;
    }

    // split tags into an array
    const tagsList = tags.split(',').map((tag) => tag.trim().toLowerCase());

    const { uid, displayName } = user;

    await insertDocument({
      title,
      image,
      body,
      tagsList,
      uid,
      createdBy: displayName,
    });

    navigate('/');
  };

  return (
    <div className={styles['create-post']}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
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
        {!loading && <button className="btn">Cadastrar</button>}
        {loading && <button className="btn" disabled>Aguarde...</button>}
        {error && <p className="error">{error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}

export default CreatePost;
