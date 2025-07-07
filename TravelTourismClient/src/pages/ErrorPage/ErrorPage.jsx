
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-br from-sky-100 to-blue-200 p-6 min-h-screen text-center">
      <h1 className="mb-4 font-extrabold text-sky-600 text-8xl">404</h1>
      <h2 className="mb-2 font-bold text-gray-700 text-2xl">Oops! Page Not Found</h2>
      <p className="mb-6 max-w-xl text-gray-600">
        The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/">
        <button className="bg-sky-500 hover:bg-sky-600 px-6 py-3 rounded-md text-white transition">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
