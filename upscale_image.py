import cv2
from cv2 import dnn_superres
import os
import urllib.request
import argparse
import sys

"""
Image Upscaling Utility using OpenCV Super Resolution (AI).
Requires: opencv-contrib-python
Install via: pip install opencv-contrib-python
"""

def download_model(model_path, url):
    if not os.path.exists(model_path):
        print(f"Downloading EDSR model to {model_path}...")
        try:
            urllib.request.urlretrieve(url, model_path)
            print("Download complete.")
        except Exception as e:
            print(f"Failed to download model: {e}")
            sys.exit(1)

def upscale_image(input_path, output_path, scale=4):
    # We use EDSR (Enhanced Deep Residual Networks) which provides excellent quality.
    model_name = "EDSR"
    model_path = f"{model_name}_x{scale}.pb"
    
    # Official OpenCV repository for EDSR models
    model_url = f"https://github.com/Saafke/EDSR_Tensorflow/raw/master/models/EDSR_x{scale}.pb"
    
    download_model(model_path, model_url)

    print(f"Loading {model_name} model (Scale: x{scale})...")
    try:
        sr = dnn_superres.DnnSuperResImpl_create()
        sr.readModel(model_path)
        sr.setModel(model_name.lower(), scale)
    except AttributeError:
        print("Error: 'dnn_superres' not found. Please ensure you have 'opencv-contrib-python' installed.")
        print("Run: pip install opencv-contrib-python")
        sys.exit(1)

    print(f"Reading image: {input_path}")
    image = cv2.imread(input_path)
    if image is None:
        print(f"Error: Could not read image at {input_path}")
        sys.exit(1)

    print("Upscaling image... (this may take a minute depending on image size and hardware)")
    result = sr.upsample(image)

    print(f"Saving upscaled image to: {output_path}")
    cv2.imwrite(output_path, result)
    print("Upscaling complete!")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        parser = argparse.ArgumentParser(description="Upscale an image using OpenCV AI Super Resolution (EDSR)")
        parser.add_argument("input", help="Path to the input image")
        parser.add_argument("-o", "--output", help="Path to save the upscaled image (default: upscaled_output.png)", default="upscaled_output.png")
        parser.add_argument("-s", "--scale", type=int, choices=[2, 3, 4], default=4, help="Upscale factor: 2, 3, or 4 (default: 4)")
        
        args = parser.parse_args()
        upscale_image(args.input, args.output, args.scale)
    else:
        print("\n=== OpenCV AI Image Upscaler ===")
        input_file = input("Enter the path to the image file: ").strip()
        
        # Remove surrounding quotes if dragged and dropped into terminal
        if (input_file.startswith('"') and input_file.endswith('"')) or (input_file.startswith("'") and input_file.endswith("'")):
            input_file = input_file[1:-1]

        if not os.path.exists(input_file):
            print(f"Error: File '{input_file}' not found.")
            sys.exit(1)

        scale_input = input("Select upscale factor (2, 3, or 4) [default 4]: ").strip()
        scale = 4
        if scale_input in ['2', '3', '4']:
            scale = int(scale_input)
        elif scale_input != "":
            print("Invalid scale factor. Defaulting to 4.")

        # Auto-generate output filename based on input
        base, ext = os.path.splitext(input_file)
        default_output = f"{base}_upscaled_x{scale}{ext}"
        
        output_file = input(f"Enter output file path [default: {default_output}]: ").strip()
        if output_file == "":
            output_file = default_output

        upscale_image(input_file, output_file, scale)
