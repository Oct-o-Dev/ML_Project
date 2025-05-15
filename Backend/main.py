from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from catboost import CatBoostRegressor
import pickle
import pandas as pd
from typing import Literal

# Initialize FastAPI app
app = FastAPI(title="Sales Prediction API")

# Load the model and feature names
model = CatBoostRegressor()
model.load_model("Sales_Predictor.cbm")
with open("feature_names.pkl", "rb") as f:
    feature_names = pickle.load(f)

# Define Pydantic model for input validation
class SalesInput(BaseModel):
    Item_Weight: float = Field(..., ge=0, description="Weight in kg")
    Item_Fat_Content: Literal["Low Fat", "Regular"] = Field(..., description="Fat content")
    Item_Visibility: float = Field(..., ge=0, le=1, description="Fraction of display area (0–1)")
    Item_Type: Literal[
        "Breads", "Breakfast", "Baking Goods", "Canned", "Dairy", "Frozen Foods",
        "Fruits and Vegetables", "Hard Drinks", "Health and Hygiene", "Household",
        "Meat", "Others", "Seafood", "Snack Foods", "Soft Drinks", "Starchy Foods"
    ] = Field(..., description="Type of item")
    Item_MRP: float = Field(..., ge=0, description="Maximum retail price in INR")
    Outlet_Identifier: Literal[
        "OUT010", "OUT013", "OUT017", "OUT018", "OUT019",
        "OUT027", "OUT035", "OUT045", "OUT046", "OUT049"
    ] = Field(..., description="Outlet ID")
    Outlet_Establishment_Year: int = Field(..., ge=1900, le=2025, description="Year outlet was founded")
    Outlet_Size: Literal["Small", "Medium", "High", "Unknown"] = Field(..., description="Outlet size")
    Outlet_Location_Type: Literal["Tier 1", "Tier 2", "Tier 3"] = Field(..., description="Location type")
    Outlet_Type: Literal[
        "Grocery Store", "Supermarket Type1", "Supermarket Type2", "Supermarket Type3"
    ] = Field(..., description="Outlet type")

# Prediction endpoint
@app.post("/predict", response_model=dict)
async def predict_sales(data: SalesInput):
    try:
        # Convert input to DataFrame
        input_dict = data.dict()
        input_df = pd.DataFrame([input_dict], columns=feature_names)

        # Ensure categorical features are treated as strings
        categorical_features = [
            "Item_Fat_Content", "Item_Type", "Outlet_Identifier",
            "Outlet_Size", "Outlet_Location_Type", "Outlet_Type"
        ]
        for col in categorical_features:
            if col in input_df.columns:
                input_df[col] = input_df[col].astype(str)

        # Make prediction
        prediction = model.predict(input_df)[0]

        # Return prediction as a string
        return {"prediction": f"Predicted Sales: {prediction:.2f}"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction error: {str(e)}")

# Health check endpoint
@app.get("/")
async def root():
    return {"message": "Sales Prediction API is running"}