import { Link } from 'react-router-dom';
import { Brain, Stethoscope, ScissorsSquareDashedBottom, TestTube, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12">
      <div className="space-y-6 max-w-4xl mx-auto animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-omni-cyan/30 bg-omni-cyan/10 text-omni-cyan text-sm font-medium mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-omni-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-omni-cyan"></span>
          </span>
          Next-Gen Diagnostics
        </div>
        
        <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight">
          Unified Multimodal <br/>
          <span className="text-omni-teal text-glow-teal">Diagnostic Platform</span>
        </h1>
        
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          AI-driven analysis for Chest X-Rays, Brain CTs, and MRIs. Delivering instantaneous, explainable, and highly accurate results to support radiologists worldwide.
        </p>
        
        <div className="pt-8">
          <Link to="/analyze" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-mono font-bold text-omni-dark bg-omni-teal rounded-full hover:bg-omni-cyan transition-all glow-teal hover:scale-105 active:scale-95">
            Launch Platform <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl pt-12">
        <div className="glass-panel p-8 flex flex-col items-center border-[rgba(0,180,216,0.3)] hover:border-omni-cyan transition-colors">
          <div className="h-14 w-14 rounded-xl bg-omni-cyan/20 flex items-center justify-center mb-6">
            <TestTube className="h-8 w-8 text-omni-cyan" />
          </div>
          <h3 className="text-xl font-bold mb-2">Chest X-Ray</h3>
          <p className="text-gray-400">Detect Pneumonia, TB, and Pleural Effusion with extreme precision.</p>
        </div>
        
        <div className="glass-panel p-8 flex flex-col items-center border-[rgba(255,214,10,0.3)] hover:border-omni-yellow transition-colors">
          <div className="h-14 w-14 rounded-xl bg-omni-yellow/20 flex items-center justify-center mb-6">
            <Brain className="h-8 w-8 text-omni-yellow" />
          </div>
          <h3 className="text-xl font-bold mb-2">Brain CT</h3>
          <p className="text-gray-400">Rapid classification of Hemorrhages, Fractures, and Lesions.</p>
        </div>
        
        <div className="glass-panel p-8 flex flex-col items-center border-[rgba(255,51,102,0.3)] hover:border-omni-red transition-colors">
          <div className="h-14 w-14 rounded-xl bg-omni-red/20 flex items-center justify-center mb-6">
            <ScissorsSquareDashedBottom className="h-8 w-8 text-omni-red" />
          </div>
          <h3 className="text-xl font-bold mb-2">Brain MRI</h3>
          <p className="text-gray-400">Advanced Tumor detection, Glioma typing, and Segmentation.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
