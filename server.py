from flask import Flask, send_from_directory, request
import os

app = Flask(__name__)

print("=" * 60)
print("🚀 GDEV-MAIN Website Server")
print("=" * 60)

# Define the exact folder name
ATLAS_FOLDER = "Greg Project - Website Atlas"

# Print debug info
print(f"📁 Current directory: {os.getcwd()}")
print(f"📁 Looking for Atlas folder: '{ATLAS_FOLDER}'")

# Check if folder exists
if os.path.exists(ATLAS_FOLDER):
    print("✅ Atlas folder found!")
else:
    print(f"❌ ERROR: Folder '{ATLAS_FOLDER}' not found!")
    print("   Available folders/files:")
    for item in os.listdir('.'):
        print(f"   • {item}")

# Main website route
@app.route('/')
def main_site():
    print("📄 [GET] / → Serving main index.html")
    return send_from_directory('.', 'index.html')

# Serve main website static files (CSS, JS, images)
@app.route('/<path:filename>')
def serve_main(filename):
    if os.path.exists(filename):
        print(f"📦 [GET] /{filename} → Serving main site file")
        return send_from_directory('.', filename)
    print(f"❌ [GET] /{filename} → File not found")
    return f"File '{filename}' not found", 404

# Atlas Studio main page
@app.route('/atlas-studio')
def atlas_studio():
    print("🎨 [GET] /atlas-studio → Serving Atlas Studio")
    atlas_html_path = os.path.join(ATLAS_FOLDER, 'templates', 'index.html')
    if os.path.exists(atlas_html_path):
        return send_from_directory(os.path.join(ATLAS_FOLDER, 'templates'), 'index.html')
    return f"Atlas Studio HTML not found at: {atlas_html_path}", 404

# Atlas Studio CSS files
@app.route('/atlas-css/<path:filename>')
def atlas_css(filename):
    print(f"🎨 [GET] /atlas-css/{filename} → CSS file")
    css_path = os.path.join(ATLAS_FOLDER, 'static', 'css', filename)
    if os.path.exists(css_path):
        return send_from_directory(os.path.join(ATLAS_FOLDER, 'static', 'css'), filename)
    print(f"❌ CSS not found: {css_path}")
    return f"CSS file '{filename}' not found", 404

# Atlas Studio JavaScript files
@app.route('/atlas-js/<path:filename>')
def atlas_js(filename):
    print(f"🎨 [GET] /atlas-js/{filename} → JS file")
    js_path = os.path.join(ATLAS_FOLDER, 'static', 'js', filename)
    if os.path.exists(js_path):
        return send_from_directory(os.path.join(ATLAS_FOLDER, 'static', 'js'), filename)
    print(f"❌ JS not found: {js_path}")
    return f"JS file '{filename}' not found", 404

# Atlas Studio images
@app.route('/atlas-images/<path:filename>')
def atlas_images(filename):
    print(f"🎨 [GET] /atlas-images/{filename} → Image file")
    img_path = os.path.join(ATLAS_FOLDER, 'static', 'images', filename)
    if os.path.exists(img_path):
        return send_from_directory(os.path.join(ATLAS_FOLDER, 'static', 'images'), filename)
    print(f"❌ Image not found: {img_path}")
    return f"Image '{filename}' not found", 404

# Debug route to check file structure
@app.route('/debug')
def debug():
    result = ["<h1>Server Debug Info</h1>"]
    result.append(f"<p>Current dir: {os.getcwd()}</p>")
    result.append(f"<p>Atlas folder: {ATLAS_FOLDER}</p>")
    
    result.append("<h2>Main directory files:</h2><ul>")
    for item in sorted(os.listdir('.')):
        result.append(f"<li>{item}</li>")
    result.append("</ul>")
    
    if os.path.exists(ATLAS_FOLDER):
        result.append(f"<h2>{ATLAS_FOLDER} contents:</h2>")
        for root, dirs, files in os.walk(ATLAS_FOLDER):
            level = root.replace(ATLAS_FOLDER, '').count(os.sep)
            indent = '&nbsp;' * 4 * level
            result.append(f"{indent}{os.path.basename(root)}/<br>")
            subindent = '&nbsp;' * 4 * (level + 1)
            for file in sorted(files):
                result.append(f"{subindent}{file}<br>")
    
    return "".join(result)

if __name__ == '__main__':
    print("\n🌐 WEBSITE URLs:")
    print("   • Main Website:      http://localhost:8000")
    print("   • Atlas Studio:      http://localhost:8000/atlas-studio")
    print("   • Debug Info:        http://localhost:8000/debug")
    print("\n📝 File requests will be logged below")
    print("=" * 60)
    
    try:
        app.run(debug=True, port=8000, host='0.0.0.0')
    except Exception as e:
        print(f"\n❌ Error starting server: {e}")
        print("\n💡 Troubleshooting:")
        print("   1. Check if port 8000 is already in use")
        print("   2. Try: python server.py")
        print("   3. Make sure Flask is installed: pip install flask")