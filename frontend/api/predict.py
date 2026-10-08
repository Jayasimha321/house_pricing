from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os

app = Flask(__name__)
# Enable CORS for local development (Vercel will host both on same domain)
CORS(app)

# Resolve path dynamically for Vercel
current_dir = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(current_dir, 'price_model.joblib')

def get_model():
    if os.path.exists(MODEL_PATH):
        return joblib.load(MODEL_PATH)
    return None

@app.route('/api/predict', methods=['POST'])
def predict():
    model = get_model()
    if not model:
        return jsonify({'error': 'Model not trained yet. Please run train.py first.'}), 500
        
    data = request.json
    try:
        input_data = pd.DataFrame([{
            'BHK': int(data.get('bhk', 1)),
            'Size': float(data.get('size', 1000)),
            'City': data.get('city', 'Mumbai'),
            'Property Type': data.get('property_type', 'Apartment'),
            'Condition': data.get('condition', 'Resale'),
            'Bathroom': int(data.get('bathroom', 1))
        }])
        
        prediction = model.predict(input_data)[0]
        
        return jsonify({
            'success': True,
            'predicted_price': round(prediction, 2)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Vercel needs the application instance to be named `app`
if __name__ == '__main__':
    app.run(debug=True, port=5000)
