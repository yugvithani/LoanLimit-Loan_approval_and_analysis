from flask import Flask, request, jsonify
import pandas as pd
import joblib
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

# Load models and encoders
model = joblib.load('best_model.pkl')
label_encoders = pickle.load(open('label_encoders.pkl', 'rb'))
training_columns = joblib.load('training_columns.pkl')

# Load loan approval models and encoders
loan_model = joblib.load('loan_approval_model.pkl')
loan_label_encoders = pickle.load(open('loan_label_encoders.pkl', 'rb'))
loan_scaler = joblib.load('loan_scaler.pkl')
loan_training_columns = joblib.load('loan_training_columns.pkl')

# Required fields for original prediction
required_fields = [
    'LoanAmount', 'LoanTerm', 'CreditScore', 'Age', 'Income', 'Education',
    'EmploymentType', 'MaritalStatus', 'HasMortgage', 'HasDependents',
    'LoanPurpose', 'HasCoSigner', 'MonthsEmployed', 'NumCreditLines', 'InterestRate'
]

# Required fields for loan approval prediction
loan_required_fields = [
    'salary', 'person_home_ownership', 'credit_score', 'person_emp_length', 
    'loan_int_rate', 'loan_amount', 'age', 'loan_intent', 'loan_term', 
    'no_of_dependants'
]

@app.route('/analyze', methods=['POST'])
def predict():
    try:
        # Get CSV file
        file = request.files.get('file')
        if file is None:
            return jsonify({'error': 'CSV file is required with name `file`'}), 400
        
        file.stream.seek(0)
        try:
            transactions = pd.read_csv(file)
        except Exception:
            return jsonify({'error': 'Failed to parse CSV file'}), 400
        
        if not {'date', 'amount', 'type', 'category'}.issubset(transactions.columns):
            return jsonify({'error': 'CSV must have columns: date, amount, type, category'}), 400

        # Calculate DTI Ratio
        total_income = transactions[transactions['type'].str.lower() == 'credit']['amount'].sum()
        total_expense = transactions[transactions['type'].str.lower() == 'debit']['amount'].sum()
        if total_income == 0:
            return jsonify({'error': 'Total income cannot be zero for DTI calculation'}), 400
        dti_ratio = total_expense/total_income
        print("dti ratio = ", dti_ratio)

        # Extract input fields for original prediction
        form_data = request.form.to_dict()
        missing = [f for f in required_fields if f not in form_data]
        if missing:
            return jsonify({'error': f'Missing form fields: {", ".join(missing)}'}), 400

        # Combine input data for original prediction
        input_data = {**form_data, 'DTIRatio': dti_ratio}

        # Convert to DataFrame
        input_df = pd.DataFrame([input_data])

        # Type conversion for original prediction
        input_df['LoanAmount'] = input_df['LoanAmount'].astype(float)
        input_df['LoanTerm'] = input_df['LoanTerm'].astype(int)
        input_df['CreditScore'] = input_df['CreditScore'].astype(int)
        input_df['Age'] = input_df['Age'].astype(int)
        input_df['Income'] = input_df['Income'].astype(float)
        input_df['MonthsEmployed'] = input_df['MonthsEmployed'].astype(int)
        input_df['NumCreditLines'] = input_df['NumCreditLines'].astype(int)
        input_df['InterestRate'] = input_df['InterestRate'].astype(float)
        input_df['DTIRatio'] = input_df['DTIRatio'].astype(float)

        # Label Encoding for categoricals for original prediction
        for col in label_encoders:
            if col in input_df:
                input_df[col] = label_encoders[col].transform(input_df[col])

        # Align input with training columns for original prediction
        input_df = input_df.reindex(columns=training_columns, fill_value=0)

        # Make prediction for original prediction
        prediction = model.predict(input_df)[0]
        print("prediction : ", prediction)

        # Make prediction and get probability of class 1
        probabilities = model.predict_proba(input_df)  # Returns an array of probabilities for each class
        prob_class_1 = probabilities[0][1]  # Get the probability of class 1 (positive class)
        print(f"Probability of class 1 (positive class): {prob_class_1}")

        # Risk logic for original prediction
        risk_percent = int(round(prob_class_1 * 100, 2))
        print("risk percentages : ", risk_percent)
        if risk_percent < 30:
            risk_level = 'Low'
        elif risk_percent < 70:
            risk_level = 'Medium'
        else:
            risk_level = 'High'

        # Breakdown income/spending for original prediction
        monthly_data = (
            transactions.copy()
            .assign(date=pd.to_datetime(transactions['date']))
            .assign(month=lambda df: df['date'].dt.to_period('M').astype(str))
            .groupby(['month', 'type'])['amount']
            .sum()
            .unstack(fill_value=0)
            .rename(columns=lambda x: x.lower())
            .rename(columns={'credit': 'total_saved', 'debit': 'total_spent'})
            .reset_index()
            .rename(columns={'month': 'year_month'})
        )

        avg_income = round(monthly_data['total_saved'].mean(), 2)
        avg_spent = round(monthly_data['total_spent'].mean(), 2)

        income_breakdown = (
            transactions[transactions['type'].str.lower() == 'credit']
            .groupby('category')['amount'].sum()
        )
        income_total = income_breakdown.sum()
        income_breakdown = [
            {'name': cat, 'value': round((amt / income_total) * 100, 2)}
            for cat, amt in income_breakdown.items()
        ]

        spending_breakdown = (
            transactions[transactions['type'].str.lower() == 'debit']
            .groupby('category')['amount'].sum()
        )
        spend_total = spending_breakdown.sum()
        spending_breakdown = [
            {'name': cat, 'value': round((amt / spend_total) * 100, 2)}
            for cat, amt in spending_breakdown.items()
        ]

        # Response for original prediction
        response = {
            'riskPercentage': risk_percent,
            'riskLevel': risk_level,
            'monthlyData': monthly_data.to_dict(orient='records'),
            'incomeBreakdown': income_breakdown,
            'spendingBreakdown': spending_breakdown,
            'avgMonthlyIncome': avg_income,
            'avgMonthlySpending': avg_spent
        }

        return jsonify(response)

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/loan-approval-predict', methods=['POST'])
def loan_approval_predict():
    try:
        # Get JSON data for loan approval prediction
        data = request.get_json()
        missing = [f for f in loan_required_fields if f not in data]
        if missing:
            return jsonify({'error': f'Missing fields: {", ".join(missing)}'}), 400

        # Convert to DataFrame for loan prediction
        input_data = {**data}
        input_df = pd.DataFrame([input_data])

        # Type conversion for loan prediction
        input_df['salary'] = input_df['salary'].astype(float)
        input_df['credit_score'] = input_df['credit_score'].astype(int)
        input_df['person_emp_length'] = input_df['person_emp_length'].astype(int)
        input_df['loan_int_rate'] = input_df['loan_int_rate'].astype(float)
        input_df['loan_amount'] = input_df['loan_amount'].astype(float)
        input_df['age'] = input_df['age'].astype(int)
        input_df['loan_term'] = input_df['loan_term'].astype(int)
        input_df['no_of_dependants'] = input_df['no_of_dependants'].astype(int)

        # Label Encoding for categoricals in loan prediction
        for col in loan_label_encoders:
            if col in input_df:
                input_df[col] = loan_label_encoders[col].transform(input_df[col])

        # Align input with loan training columns
        input_df = input_df.reindex(columns=loan_training_columns, fill_value=0)

        # Scale features for loan prediction
        input_df_scaled = loan_scaler.transform(input_df)

        # Make prediction for loan approval
        prob_class_1 = loan_model.predict_proba(input_df_scaled)[0][1]
        print(f"Loan Approval Probability (Class 1): {prob_class_1}")

        return jsonify({
            'confidence_score': round(prob_class_1 * 100, 2)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# if __name__ == '__main__':
#     app.run(debug=True)

if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=5000)

