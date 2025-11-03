import { Outlet, Link, useNavigate } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 text-white flex flex-col p-4 space-y-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <Link to="/dashboard"    className="hover:text-gray-300">All Blogs</Link>
        <Link to="/add"          className="hover:text-gray-300">Add Blog</Link>
        {/* New Quotes link */}
        <Link to="/quotes"       className="hover:text-gray-300">Manage Quotes</Link>
        <button onClick={logout} className="mt-auto bg-red-500 px-4 py-2 rounded">
          Logout
        </button>
      </div>
      <div className="flex-1 p-6 overflow-auto bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
