# 🤖 AI-Powered Financial Planning Chatbot


## A full-stack AI chatbot that helps users with personalized financial planning, budget recommendations, and live market insights. 💸📊

✨ Key Features
💡 Financial Intelligence
💰 Budget Calculator: Applies the 50/30/20 rule for income distribution
📈 Investment Advice: Suggests portfolios based on risk levels
🧠 Live Market Data: Fetches stock, forex, and crypto data via APIs
🧭 Guided Workflow: Simple multi-step interface for financial setup


## 🧱 Technical Architecture
🖼️ Frontend: React 18, Tailwind CSS, Vite, Shadcn/UI
🔧 Backend: Flask, Flask-CORS, SQLAlchemy (future), Requests
🌐 APIs: Alpha Vantage & CoinGecko


## 🔗 API Endpoints Overview
📊 Budget & Tips
POST /api/budget-allocation – Calculates income distribution
GET /api/financial-tips – General financial advice


📈 Investment & Market
POST /api/investment-advice – Custom investment strategies
GET /api/market-data – Overall market summary
GET /api/stock-quote/<symbol> – Real-time stock prices
GET /api/crypto-prices – Live crypto data
GET /api/forex-rate – Currency exchange info


## 💸 Financial Models Used
📏 50/30/20 Budget Rule
50% Needs – Rent, groceries, insurance
30% Wants – Travel, dining, entertainment
20% Savings – Emergency funds, investments


## 🎯 Investment Strategy by Risk Type
🟢 Conservative – Bonds, FDs, large-cap stocks
🟡 Moderate – Large/mid-cap stocks, crypto, gold
🔴 Aggressive – High exposure to stocks, crypto, global assets

## 📉 API Rate Limits
Alpha Vantage
  25 daily / 5 per minute (Free Tier)
CoinGecko
  No API key required
  Free-tier friendly usage

## 🚀 Roadmap & Enhancements
# 🧭 Product Features

  🔒 User authentication & data storage
  
  📊 Investment portfolio tracking
  
  📚 Financial literacy content
  
  📱 Native mobile apps (iOS & Android)
  
  🗣️ AI-powered chatbot (NLP-based)
  

# 🧪 Technical Enhancements

  🗃️ PostgreSQL & Redis
  
  🔐 JWT Authentication
  
  🚥 CI/CD + Testing Suite
  
  📟 Monitoring & Logging
  
