from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/submit_contact', methods=['POST'])
def submit_contact():
    data = request.json
    # In production, you would save this to a database
    print(f"Contact form submitted: {data}")
    return jsonify({
        'success': True,
        'message': 'Thank you for your message! We will contact you soon.'
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)