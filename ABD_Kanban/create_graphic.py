from PIL import Image, ImageDraw, ImageFont
import os

# Create a dark background image
width = 1080
height = 1080
background_color = (10, 10, 20)  # very dark blue
image = Image.new('RGB', (width, height), background_color)
draw = ImageDraw.Draw(image)

# Define colors
gold = (255, 215, 0)
sapphire = (15, 82, 186)
white = (255, 255, 255)

# Partner names
partners = [
    "EasySats (Host)",
    "African Bitcoin Hub / ABC Hub (Host)",
    "ConnectUs (Logistics Partner)",
    "Joker's Pizzeria (Venue Partner)"
]

# Try to load a font, fallback to default
try:
    # Use a bold font for headers
    font = ImageFont.truetype("Arial Bold", 48)
    small_font = ImageFont.truetype("Arial", 36)
except IOError:
    font = ImageFont.load_default()
    small_font = ImageFont.load_default()

# Layout: 2x2 grid
margin = 100
cell_width = (width - 2*margin) // 2
cell_height = (height - 2*margin) // 2

for i, partner in enumerate(partners):
    row = i // 2
    col = i % 2
    x0 = margin + col * cell_width
    y0 = margin + row * cell_height
    x1 = x0 + cell_width
    y1 = y0 + cell_height
    
    # Draw a thin border or accent line
    # Draw a small lightning bolt in gold? We'll just use text color.
    # Center the text in the cell
    text = partner
    # Use font that fits
    # Calculate text size
    text_bbox = draw.textbbox((0,0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    text_x = x0 + (cell_width - text_width) // 2
    text_y = y0 + (cell_height - text_height) // 2
    
    # Draw text with gold color
    draw.text((text_x, text_y), text, fill=gold, font=font)
    
    # Optional: add a small sapphire accent (like a dot or line)
    # For simplicity, draw a small circle at the top left of each cell
    accent_size = 10
    accent_x = x0 + 10
    accent_y = y0 + 10
    draw.ellipse([accent_x, accent_y, accent_x+accent_size, accent_y+accent_size], fill=sapphire)

# Save the image
output_path = "/Users/fromthejump/Desktop/BigBossRabbit/EasyHub/ABD_Kanban/partner_lockup.png"
image.save(output_path)
print(f"Image saved to {output_path}")
