import { Link, useLocation } from 'react-router-dom';
import { Activity } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Analyze', path: '/analyze' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-omni-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <Activity className="h-8 w-8 text-omni-teal group-hover:text-omni-cyan transition-colors drop-shadow-[0_0_10px_rgba(0,180,216,0.6)]" />
              <span className="font-display font-bold text-xl tracking-wide">
                OmniScan <span className="font-light text-omni-teal text-glow-teal">AI</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? 'text-omni-teal border-b-2 border-omni-teal bg-white/5'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
