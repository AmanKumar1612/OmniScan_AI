import { Info } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-3xl mx-auto glass-panel p-8 mt-10">
      <div className="flex items-center gap-3 mb-6">
        <Info className="w-8 h-8 text-omni-teal" />
        <h2 className="text-3xl font-display font-bold">About OmniScan AI</h2>
      </div>
      
      <div className="space-y-6 text-gray-300 leading-relaxed">
        <p>
          <strong className="text-white">OmniScan AI</strong> is a Unified Multimodal Diagnostic Platform designed to alleviate the critical radiologist shortage worldwide, particularly in developing regions.
        </p>
        
        <p>
          By combining advanced Deep Learning models with Explainable AI (XAI) such as Grad-CAM, OmniScan provides instant, highly accurate diagnostic suggestions across three primary modalities:
        </p>
        
        <ul className="list-disc pl-6 space-y-2 text-omni-teal">
          <li><span className="text-gray-300">Chest X-Ray (Pneumonia, TB)</span></li>
          <li><span className="text-gray-300">Brain CT (Hemorrhage, Fracture)</span></li>
          <li><span className="text-gray-300">Brain MRI (Tumor, Glioma)</span></li>
        </ul>

        <div className="mt-8 p-4 rounded-xl bg-omni-teal/10 border border-omni-teal/20">
          <h3 className="text-white font-semibold mb-2">Technical Implementation</h3>
          <p className="text-sm">
            Powered by a Fast/API and PyTorch backend bridging state-of-the-art vision models, managed through an Express/Node.js gateway, and beautifully visualized on a modern React.js frontend tailored with custom Tailwind CSS.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
