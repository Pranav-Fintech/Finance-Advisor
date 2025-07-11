# 🤖💸AI-Powered Finance Planning Chatbot

A comprehensive full-stack web application that provides personalized financial planning advice, budget allocation recommendations, and real-time market data integration.

## 📋 Features

### 🧠 Core Functionality
- **🧮 Budget Allocation Calculator**: Implements the 50/30/20 rule for optimal budget distribution
- **📈 Investment Advice Engine**: Provides personalized investment recommendations based on risk profiles
- **📊 Real-time Market Data**: Integration with Alpha Vantage and CoinGecko APIs for live financial data
- **💡 Interactive UI**: Clean, responsive design with progress bars and visualizations
- **🧭 Multi-step Workflow**: Guided user experience from income input to investment advice

### ⚙️ Technical Features
- **🧱 Full-Stack Architecture**: React frontend with Flask backend
- **🔗 RESTful API Design**: Well-structured endpoints for all financial operations
- **🌐 External API Integration**: Real-time data from multiple financial data providers
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🛡️ Error Handling**: Comprehensive error handling and user feedback

## 🛠 Technology Stack

### 🎨 Frontend
- **⚛️ React 18**: Modern JavaScript framework for building user interfaces
- **⚡ Vite**: Fast build tool and development server
- **🎨 Tailwind CSS**: Utility-first CSS framework for styling
- **🧩 Shadcn/UI**: High-quality React components
- **🔔 Lucide Icons**: Beautiful icon library

### 🐍 Backend
- **🧪 Flask**: Lightweight Python web framework
- **🔄 Flask-CORS**: Cross-origin resource sharing support
- **🗃️ Flask-SQLAlchemy**: Database ORM (for future user data storage)
- **🌐 Requests**: HTTP library for external API calls

### 📡 External APIs
- **📉 Alpha Vantage**: Stock market data, forex rates, and economic indicators
- **🪙 CoinGecko**: Cryptocurrency prices and market data

## 🔧 API Endpoints

### 💰 Budget Management
- 🧾 `POST /api/budget-allocation` - Calculate budget allocation based on income
- 📘 `GET /api/financial-tips` - Get general financial tips and advice

### 📊 Investment Services
- 🧠 `POST /api/investment-advice` - Get personalized investment recommendations
- 🌍 `GET /api/market-data` - Retrieve comprehensive market summary

### 📈 Market Data
- 🏦 `GET /api/stock-quote/<symbol>` - Get real-time stock quotes
- 💹 `GET /api/crypto-prices` - Get cryptocurrency prices
- 💱 `GET /api/forex-rate` - Get foreign exchange rates

## 💡 Key Features Explained

### 💸 Budget Allocation (50/30/20 Rule)
The application implements the popular 50/30/20 budgeting rule:
- **🏠 50% Needs**: Essential expenses (rent, utilities, groceries, insurance)
- **🎉 30% Wants**: Discretionary spending (entertainment, dining out, hobbies)
- **💰 20% Savings & Investments**: Emergency fund, retirement savings, investments

### 📈 Investment Advice Engine
Provides personalized recommendations based on three risk profiles:

**🟢 Conservative (Low Risk)**
- 🏦 60% Fixed Deposits/Bonds
- 🏛️ 25% Large Cap Stocks
- 🪙 10% Gold/Commodities
- 💵 5% Cash/Emergency Fund

**🟡 Moderate (Medium Risk)**
- 🏛️ 40% Large Cap Stocks
- 📊 20% Mid Cap Stocks
- 🏦 25% Fixed Deposits/Bonds
- 🪙 10% Gold/Commodities
- 🌐 5% Cryptocurrency

**🔴 Aggressive (High Risk)**
- 🏛️ 30% Large Cap Stocks
- 📈 35% Mid/Small Cap Stocks
- 🌐 15% Cryptocurrency
- 🌍 10% International Stocks
- 🏦 10% Fixed Deposits/Bonds

### 🌐 Real-time Market Integration
- **📉 Stock Data**: Live quotes from Alpha Vantage for major stocks (AAPL, GOOGL, MSFT, TSLA, AMZN)
- **🪙 Cryptocurrency**: Real-time prices for Bitcoin, Ethereum, Binance Coin, Cardano, Solana
- **💱 Forex**: USD/INR exchange rates for international investment insights
- **🧠 Market Insights**: Automated analysis and recommendations based on current market conditions

## 🔒 API Rate Limits

### 📉 Alpha Vantage (Free Tier)
- ⏱️ 25 requests per day
- 🔁 5 requests per minute
- 📊 Covers stocks, forex, and commodities

### 🪙 CoinGecko (Free Tier)
- 🆓 No API key required for basic endpoints
- 📈 Rate limits apply but are generous for typical usage



**Built with ❤️ using ⚙️ modern web technologies and ✅ best practices in 🌐 full-stack development.**
