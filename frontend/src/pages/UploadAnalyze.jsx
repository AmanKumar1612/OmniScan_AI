import { useState } from 'react';
import axios from 'axios';
import { Upload, FileImage, Loader2, ThermometerSun, BrainCircuit, Activity } from 'lucide-react';

const UploadAnalyze = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [modality, setModality] = useState('xray');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null); // Reset previous results
      setError('');
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please select an image first.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('modality', modality);

    try {
      // NOTE: Update port if backend runs elsewhere. 
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Analysis failed. Make sure backend and AI service are running.');
    } finally {
      setLoading(false);
    }
  };

  const modalityConfig = {
    xray: { name: 'Chest X-Ray', color: 'text-omni-cyan', border: 'border-omni-cyan', icon: <Activity className="w-5 h-5 text-omni-cyan"/> },
    ct: { name: 'Brain CT', color: 'text-omni-yellow', border: 'border-omni-yellow', icon: <BrainCircuit className="w-5 h-5 text-omni-yellow"/> },
    mri: { name: 'Brain MRI', color: 'text-omni-red', border: 'border-omni-red', icon: <ThermometerSun className="w-5 h-5 text-omni-red"/> }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-display font-bold">Image Diagnostics Engine</h2>
        <p className="text-gray-400 mt-2">Upload medical scans for instant AI-powered analysis.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Side: Upload & Config */}
        <div className="glass-panel p-6 space-y-6 flex flex-col">
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Select Modality</label>
            <div className="grid grid-cols-3 gap-3">
              {Object.keys(modalityConfig).map((key) => (
                <button
                  key={key}
                  onClick={() => { setModality(key); setResult(null); }}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                    modality === key 
                      ? `${modalityConfig[key].border} bg-white/10 glow-${modalityConfig[key].color.split('-')[2]}` 
                      : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                  }`}
                >
                  {modalityConfig[key].icon}
                  <span className={`mt-2 text-sm font-medium ${modality === key ? modalityConfig[key].color : 'text-gray-400'}`}>
                    {modalityConfig[key].name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">Upload Scan ({modalityConfig[modality].name})</label>
            <div className="h-64 border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center bg-black/20 hover:bg-white/5 transition-colors relative overflow-hidden group">
              {preview ? (
                <img src={preview} alt="Preview" className="h-full w-full object-contain p-2" />
              ) : (
                <div className="flex flex-col items-center text-center p-6 space-y-3">
                  <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-gray-400 group-hover:text-omni-teal transition-colors" />
                  </div>
                  <p className="text-sm text-gray-400">Drag & drop or click to browse</p>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={!file || loading}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              !file || loading 
                ? 'bg-white/10 text-gray-500 cursor-not-allowed' 
                : 'bg-omni-teal text-omni-dark hover:bg-omni-cyan glow-teal'
            }`}
          >
            {loading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Processing AI Interfacing...</>
            ) : (
              <><BrainCircuit className="w-5 h-5" /> Analyze Scan</>
            )}
          </button>
        </div>

        {/* Right Side: Results */}
        <div className="glass-panel p-6 flex flex-col min-h-[500px]">
          <h3 className="text-xl font-display font-semibold mb-4 border-b border-white/10 pb-4 flex items-center gap-2">
            <FileImage className="text-omni-teal" /> Analysis Report
          </h3>
          
          {result ? (
            <div className="flex flex-col h-full space-y-6">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Prediction</p>
                  <p className={`text-2xl font-bold ${modalityConfig[modality].color}`}>
                    {result.prediction}
                  </p>
                </div>
                <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Confidence</p>
                  <p className="text-2xl font-bold text-white">
                    {(result.confidence * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="flex-1 bg-black/30 rounded-xl border border-white/5 p-4 flex flex-col relative overflow-hidden">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Grad-CAM XAI Heatmap</p>
                <div className="flex-1 rounded-lg overflow-hidden flex items-center justify-center border border-white/10 bg-black">
                  <img 
                    src={result.heatmap_url} 
                    alt="Grad-CAM Heatmap" 
                    className="max-h-[300px] object-contain"
                  />
                  {/* Scanning line effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-omni-teal/20 to-transparent h-10 w-full animate-[scan_3s_ease-in-out_infinite]"></div>
                </div>
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 text-center space-y-4 opacity-50">
              <Activity className="w-16 h-16 text-gray-500" />
              <p className="text-gray-400 max-w-xs">Upload a scan and click Analyze to view the AI-generated report and heatmaps here.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default UploadAnalyze;
