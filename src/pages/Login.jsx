import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f0f0f] p-4 absolute inset-0 z-50">
      <div className="w-full max-w-md bg-[#212121] border border-yt-gray rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-8 bg-yt-red rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
          </div>
          <h1 className="text-2xl font-semibold text-white">Sign in</h1>
          <p className="text-yt-lightgray mt-2">to continue to YouTube</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 bg-transparent border border-yt-gray rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 bg-transparent border border-yt-gray rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={!email || !password}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            Sign in
          </button>
          
          <button
            type="button"
            onClick={() => {
              login('guest@youtube.com', 'guest');
              navigate('/');
            }}
            className="w-full bg-[#3f3f3f] hover:bg-[#4f4f4f] text-white font-medium py-3 rounded-lg transition-colors mt-2"
          >
            Guest Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-yt-lightgray">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
