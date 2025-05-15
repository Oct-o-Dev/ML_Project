# 📊 Sales Prediction App

An end-to-end mobile application that predicts sales for retail items using machine learning. Users can input product and outlet details, and the app returns the expected sales value.

### 🔗 Live Backend Endpoint

> https://sales-predictor-5kqf.onrender.com/predict

---

## 🚀 Features

- 📱 **Mobile App UI** built using React Native  
- ⚙️ **Machine Learning model (CatBoost)** trained on retail data  
- 🌐 **FastAPI Backend** serving the trained model through a REST API  
- 📦 **Form-based input interface** with dropdowns and validation  
- 🔍 Real-time **prediction of sales** based on multiple features  

---

## 🧠 Machine Learning

- Model: **CatBoost Regressor**
- Trained on retail data with features like:
  - Item Weight, MRP, Visibility
  - Fat Content, Item Type
  - Outlet Identifier, Size, Location, Establishment Year, and Type
- Saved as: `Sales_Predictor.cbm`
- Feature names stored in: `feature_names.pkl`

---

## 🏗️ Tech Stack

| Layer       | Technology       |
|-------------|------------------|
| Frontend    | React Native     |
| Backend     | FastAPI          |
| ML Model    | CatBoost         |
| API Calls   | Axios            |
| Hosting     | Render           |

---

## 📱 React Native UI

- Clean form with inputs for:
  - Text fields: Weight, MRP, Visibility, Year
  - Dropdowns: Fat Content, Item Type, Outlet details
- Handles validations and formatting
- Sends API request to backend using `axios.post`
- Displays predicted sales in-app

---

## ⚙️ FastAPI Backend

- Uses Pydantic for input validation
- Loads CatBoost model from `.cbm` file
- Accepts JSON requests
- Returns prediction as a formatted string
- Includes root health-check route

---

## 📂 Project Structure

```
root/
│
├── backend/
│   ├── main.py                 # FastAPI app
│   ├── Sales_Predictor.cbm     # Trained CatBoost model
│   └── feature_names.pkl       # Ordered feature names list
│
├── frontend/
│   └── PriceForm.js            # React Native form component
│
└── README.md                   # This file
```

---

## 🧪 How to Run Locally

### Backend (FastAPI)

```bash
cd backend
pip install fastapi uvicorn catboost pydantic pandas
uvicorn main:app --reload
```

### Frontend (React Native)

```bash
cd frontend
npm install
npx react-native run-android   # or run-ios
```

---

## 📬 Sample API Request

**POST** `/predict`

```json
{
  "Item_Weight": 9.3,
  "Item_Fat_Content": "Low Fat",
  "Item_Visibility": 0.045,
  "Item_Type": "Snack Foods",
  "Item_MRP": 249.8,
  "Outlet_Identifier": "OUT027",
  "Outlet_Establishment_Year": 1999,
  "Outlet_Size": "Medium",
  "Outlet_Location_Type": "Tier 2",
  "Outlet_Type": "Supermarket Type1"
}
```

**Response**

```json
{
  "prediction": "Predicted Sales: 3450.28"
}
```

---

## 📌 Future Improvements

- Add user authentication
- Store prediction history
- Improve model accuracy with more data
- Upload CSV file for bulk predictions

---

## 🧑‍💻 Author

> 👋 Built with ❤️ by [Abhineet , Jay Shah , Kaushal Pawar]  
> 📧 Contact: [abhineetk213@gmail.com]  
> 📍 NIT Surat | Electronics & Communication Engineering

