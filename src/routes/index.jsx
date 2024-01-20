import { Navigate, Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CreatePost from '../pages/CreatePost';
import EditPost from '../pages/EditPost';
import Dashboard from '../pages/Dashboard';
import Search from '../pages/Search';
import Post from '../pages/Post';
import Page404 from '../pages/Page404';

function AppRoutes({ user }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/search" element={<Search />} />
      <Route path="/posts">
        <Route
          path="edit/:id"
          element={user ? <EditPost /> : <Navigate to="/login" />}
        />
        <Route
          path="create"
          element={user ? <CreatePost /> : <Navigate to="/login" />}
        />
        <Route path=":id" element={<Post />} />
      </Route>
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" />}
      />
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

AppRoutes.propTypes = {
  user: PropTypes.object,
};

export default AppRoutes;
