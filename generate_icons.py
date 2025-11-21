from PIL import Image
import os

def make_square(image_path, output_path, size):
    try:
        img = Image.open(image_path)
        img = img.convert("RGBA")
        
        # Calculate dimensions
        width, height = img.size
        new_size = max(width, height)
        
        # Create new square image with transparent background
        new_img = Image.new("RGBA", (new_size, new_size), (0, 0, 0, 0))
        
        # Paste original image in center
        paste_x = (new_size - width) // 2
        paste_y = (new_size - height) // 2
        new_img.paste(img, (paste_x, paste_y))
        
        # Resize to target size
        new_img = new_img.resize((size, size), Image.Resampling.LANCZOS)
        
        # Save
        new_img.save(output_path)
        print(f"Created {output_path} ({size}x{size})")
        
    except Exception as e:
        print(f"Error processing {image_path}: {e}")

# Paths
source_logo = "public/easysats-logo.png"
output_dir = "public/icons"

# Ensure output directory exists
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Generate icons
make_square(source_logo, f"{output_dir}/icon-192.png", 192)
make_square(source_logo, f"{output_dir}/icon-512.png", 512)
make_square(source_logo, f"{output_dir}/icon-1024.png", 1024)
