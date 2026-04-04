from app import preprocess_image, load_image_into_numpy_array, generate_gradcam_overlay
from PIL import Image
import io

img = Image.new('RGB', (100, 100), color='red')
img_byte_arr = io.BytesIO()
img.save(img_byte_arr, format='JPEG')
img_bytes = img_byte_arr.getvalue()

try:
    print("Testing PyTorch setup...")
    t = preprocess_image(img_bytes)
    print("PyTorch successful. Shape:", t.shape)
    
    print("Testing OpenCV setup...")
    cv_img = load_image_into_numpy_array(img_bytes)
    out = generate_gradcam_overlay(cv_img)
    print("OpenCV successful. Output prefix:", out[:30])
except Exception as e:
    import traceback
    traceback.print_exc()
