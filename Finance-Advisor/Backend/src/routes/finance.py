from flask import Blueprint, jsonify, request
from src.services.market_data import MarketDataService

finance_bp = Blueprint('finance', __name__)
market_service = MarketDataService()

@finance_bp.route('/budget-allocation', methods=['POST'])
def calculate_budget():
    try:
        data = request.get_json()
        monthly_income = data.get('monthly_income', 0)
        
        if monthly_income <= 0:
            return jsonify({'error': 'Invalid monthly income'}), 400
        
        # Apply 50/30/20 rule
        needs = monthly_income * 0.5
        wants = monthly_income * 0.3
        savings = monthly_income * 0.2
        
        budget_allocation = {
            'monthly_income': monthly_income,
            'allocations': {
                'needs': {
                    'amount': needs,
                    'percentage': 50,
                    'description': 'Essential expenses like rent, utilities, groceries, insurance'
                },
                'wants': {
                    'amount': wants,
                    'percentage': 30,
                    'description': 'Entertainment, dining out, hobbies, non-essential shopping'
                },
                'savings_investments': {
                    'amount': savings,
                    'percentage': 20,
                    'description': 'Emergency fund, retirement savings, investments'
                }
            },
            'recommendations': [
                f"Build an emergency fund of ₹{needs * 6:,.0f} (6 months of essential expenses)",
                f"Consider investing ₹{savings * 0.7:,.0f} in equity mutual funds for long-term growth",
                f"Keep ₹{savings * 0.3:,.0f} in fixed deposits or liquid funds for short-term goals"
            ]
        }
        
        return jsonify(budget_allocation)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@finance_bp.route('/investment-advice', methods=['POST'])
def get_investment_advice():
    try:
        data = request.get_json()
        investment_amount = data.get('investment_amount', 0)
        risk_profile = data.get('risk_profile', 'moderate')
        
        if investment_amount <= 0:
            return jsonify({'error': 'Invalid investment amount'}), 400
        
        # Get personalized investment recommendations with market data
        recommendations = market_service.get_investment_recommendations(risk_profile, investment_amount)
        
        return jsonify(recommendations)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@finance_bp.route('/market-data', methods=['GET'])
def get_market_data():
    try:
        # Get comprehensive market summary
        market_summary = market_service.get_market_summary()
        return jsonify(market_summary)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@finance_bp.route('/stock-quote/<symbol>', methods=['GET'])
def get_stock_quote(symbol):
    try:
        quote = market_service.get_stock_quote(symbol.upper())
        if quote:
            return jsonify(quote)
        else:
            return jsonify({'error': 'Stock not found or API limit reached'}), 404
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@finance_bp.route('/crypto-prices', methods=['GET'])
def get_crypto_prices():
    try:
        coins = request.args.get('coins', '').split(',') if request.args.get('coins') else None
        crypto_data = market_service.get_crypto_prices(coins)
        return jsonify(crypto_data)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@finance_bp.route('/forex-rate', methods=['GET'])
def get_forex_rate():
    try:
        from_currency = request.args.get('from', 'USD')
        to_currency = request.args.get('to', 'INR')
        
        rate_data = market_service.get_forex_rates(from_currency, to_currency)
        if rate_data:
            return jsonify(rate_data)
        else:
            return jsonify({'error': 'Forex rate not found or API limit reached'}), 404
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@finance_bp.route('/financial-tips', methods=['GET'])
def get_financial_tips():
    tips = [
        {
            "category": "Budgeting",
            "tip": "Follow the 50/30/20 rule: 50% for needs, 30% for wants, 20% for savings and investments.",
            "priority": "high"
        },
        {
            "category": "Emergency Fund",
            "tip": "Build an emergency fund covering 6-12 months of essential expenses before investing.",
            "priority": "high"
        },
        {
            "category": "Investing",
            "tip": "Start investing early to benefit from compound interest. Even small amounts can grow significantly over time.",
            "priority": "medium"
        },
        {
            "category": "Diversification",
            "tip": "Don't put all your eggs in one basket. Diversify across asset classes and sectors.",
            "priority": "medium"
        },
        {
            "category": "Debt Management",
            "tip": "Pay off high-interest debt (like credit cards) before investing in lower-return assets.",
            "priority": "high"
        },
        {
            "category": "Tax Planning",
            "tip": "Utilize tax-saving instruments like ELSS, PPF, and NPS to reduce your tax burden.",
            "priority": "medium"
        }
    ]
    
    return jsonify({"tips": tips})

