import os
import io
import cv2
import numpy as np
import base64
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import torch
import torchvision.transforms as transforms
from PIL import Image
import random

app = FastAPI(title="OmniScan AI - Inference Service")

# Allow CORS for the Node JS backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dummy/Lightweight Inference Logic
# To ensure the demo runs efficiently without massive downloads, we simulate the model execution
# while still doing real tensor transformations and OpenCV image manipulations.

def load_image_into_numpy_array(data):
    npimg = np.frombuffer(data, np.uint8)
    frame = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    return frame

def generate_gradcam_overlay(image: np.ndarray) -> str:
    """
    Generates a simulated Grad-CAM heatmap and overlays it on the image.
    Returns a Base64 string of the final image.
    """
    # Resize standard
    img_resized = cv2.resize(image, (224, 224))
    
    # Create a dummy activation map (heatmap) focus
    heatmap = np.zeros((224, 224), dtype=np.float32)
    center_x, center_y = random.randint(90, 130), random.randint(80, 140)
    std = random.randint(30, 50)
    
    for i in range(224):
        for j in range(224):
            # 2D Gaussian
            val = np.exp(-((i - center_y)**2 + (j - center_x)**2) / (2.0 * std**2))
            heatmap[i, j] = val
            
    heatmap = np.uint8(255 * heatmap)
    
    # Apply JET colormap
    heatmap_color = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
    
    # Overlay on original image
    superimposed_img = heatmap_color * 0.4 + img_resized * 0.6
    superimposed_img = np.clip(superimposed_img, 0, 255).astype(np.uint8)
    
    # Encode to base64
    _, buffer = cv2.imencode('.jpg', superimposed_img)
    img_base64 = base64.b64encode(buffer).decode('utf-8')
    
    return f"data:image/jpeg;base64,{img_base64}"

def preprocess_image(image_bytes: bytes):
    """Real preprocessing using PyTorch/Torchvision as requested."""
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    tensor = transform(image)
    return tensor

@app.post("/predict/xray")
async def predict_xray(image: UploadFile = File(...)):
    contents = await image.read()
    
    # Preprocessing (Validation that PyTorch is working)
    tensor = preprocess_image(contents)
    
    # Generate Heatmap image using OpenCV
    cv_img = load_image_into_numpy_array(contents)
    heatmap_url = generate_gradcam_overlay(cv_img)
    
    classes = ["Pneumonia", "Tuberculosis", "Pleural Effusion", "Normal"]
    prediction = random.choice(classes[:3]) # bias towards finding something for demo
    confidence = round(random.uniform(0.85, 0.99), 4)
    
    return {
        "prediction": prediction,
        "confidence": confidence,
        "heatmap_url": heatmap_url
    }

@app.post("/predict/ct")
async def predict_ct(image: UploadFile = File(...)):
    contents = await image.read()
    
    tensor = preprocess_image(contents)
    
    cv_img = load_image_into_numpy_array(contents)
    heatmap_url = generate_gradcam_overlay(cv_img)
    
    classes = ["Hemorrhage", "Fracture", "Lesion mapping", "Normal"]
    prediction = random.choice(classes[:3])
    confidence = round(random.uniform(0.81, 0.98), 4)
    
    return {
        "prediction": prediction,
        "confidence": confidence,
        "heatmap_url": heatmap_url
    }

@app.post("/predict/mri")
async def predict_mri(image: UploadFile = File(...)):
    contents = await image.read()
    
    tensor = preprocess_image(contents)
    
    cv_img = load_image_into_numpy_array(contents)
    heatmap_url = generate_gradcam_overlay(cv_img)
    
    classes = ["Tumor", "Glioma", "Segmentation Anomaly", "Normal"]
    prediction = random.choice(classes[:2])
    confidence = round(random.uniform(0.88, 0.99), 4)
    
    return {
        "prediction": prediction,
        "confidence": confidence,
        "heatmap_url": heatmap_url
    }

if __name__ == "__main__":
    import uvicorn
    # Make sure to run with: uvicorn app:app --reload --port 8000
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
