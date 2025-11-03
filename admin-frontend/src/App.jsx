// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardBlogs from './pages/DashboardBlogs';
import AddBlog from './pages/AddBlog';
import EditBlog from './pages/EditBlog';
import DashboardQuotes from './pages/DashboardQuotes';
import AddQuote from './pages/AddQuote';
import EditQuote from './pages/EditQuote';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/" element={<PrivateRoute><Layout/></PrivateRoute>}>
          {/* Blogs */}
          <Route path="dashboard"          element={<DashboardBlogs />} />
          <Route path="dashboard/edit/:id" element={<EditBlog />} />
          <Route path="add"                element={<AddBlog />} />

          {/* Quotes */}
          <Route path="quotes"             element={<DashboardQuotes />} />
          <Route path="quotes/add"         element={<AddQuote />} />
          <Route path="quotes/edit/:id"    element={<EditQuote />} />
        </Route>
      </Routes>
    </Router>
  );
}
