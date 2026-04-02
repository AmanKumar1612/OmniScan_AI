import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import UploadAnalyze from './pages/UploadAnalyze';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-omni-cyan/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-omni-teal/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10"></div>

        <Navbar />
        
        <main className="flex-1 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyze" element={<UploadAnalyze />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
