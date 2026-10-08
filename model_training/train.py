import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import joblib
import os

def create_mock_dataset(filepath):
    # Mock data for house buying prices
    np.random.seed(42)
    n = 1000
    data = {
        'BHK': np.random.randint(1, 5, n),
        'Size': np.random.randint(300, 3000, n),
        'City': np.random.choice(['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata'], n),
        'Property Type': np.random.choice(['Apartment', 'Independent House', 'Villa'], n),
        'Condition': np.random.choice(['New Property', 'Resale'], n),
        'Bathroom': np.random.randint(1, 5, n),
    }
    # Price depends on size, bhk, city, type, and condition
    price_base = data['Size'] * 6000 + data['BHK'] * 1500000
    city_multiplier = {'Mumbai': 3.0, 'Delhi': 2.0, 'Bangalore': 1.8, 'Chennai': 1.5, 'Hyderabad': 1.2, 'Kolkata': 1.0}
    type_multiplier = {'Villa': 1.5, 'Independent House': 1.2, 'Apartment': 1.0}
    condition_multiplier = {'New Property': 1.2, 'Resale': 1.0}
    
    price = [
        price_base[i] * city_multiplier[data['City'][i]] * type_multiplier[data['Property Type'][i]] * condition_multiplier[data['Condition'][i]] + np.random.randint(-500000, 500000) 
        for i in range(n)
    ]
    data['Price'] = price
    
    df = pd.DataFrame(data)
    df.to_csv(filepath, index=False)
    print(f"Created synthetic dataset at {filepath}")

def train_model(dataset_path='House_Price_Dataset.csv', model_path='price_model.joblib'):
    if not os.path.exists(dataset_path):
        print("Dataset not found. Creating a synthetic one for testing purposes...")
        create_mock_dataset(dataset_path)

    print("Loading dataset...")
    df = pd.read_csv(dataset_path)
    
    # Required features based on chat interface
    features = ['BHK', 'Size', 'City', 'Property Type', 'Condition', 'Bathroom']
    target = 'Price'
    
    # Check if features exist
    for f in features + [target]:
        if f not in df.columns:
            raise ValueError(f"Column '{f}' not found in dataset. Please ensure it matches Kaggle format.")
    
    X = df[features]
    y = df[target]

    # Preprocessing pipelines
    numeric_features = ['BHK', 'Size', 'Bathroom']
    numeric_transformer = StandardScaler()

    categorical_features = ['City', 'Property Type', 'Condition']
    categorical_transformer = OneHotEncoder(handle_unknown='ignore')

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, numeric_features),
            ('cat', categorical_transformer, categorical_features)
        ])

    # Append classifier to preprocessing pipeline
    clf = Pipeline(steps=[('preprocessor', preprocessor),
                          ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))])

    print("Training model...")
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    clf.fit(X_train, y_train)
    score = clf.score(X_test, y_test)
    print(f"Model R^2 Score: {score:.4f}")

    joblib.dump(clf, model_path)
    print(f"Model saved to {model_path}")

if __name__ == "__main__":
    train_model()
