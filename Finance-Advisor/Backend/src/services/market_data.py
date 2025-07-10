import requests
import json
from typing import Dict, List, Optional
import os

class MarketDataService:
    def __init__(self):
        # Alpha Vantage API key (free tier: 25 requests/day)
        self.alpha_vantage_key = os.getenv('ALPHA_VANTAGE_API_KEY', 'demo')
        self.alpha_vantage_base_url = 'https://www.alphavantage.co/query'
        
        # CoinGecko API (free tier: no API key required for basic endpoints)
        self.coingecko_base_url = 'https://api.coingecko.com/api/v3'
        
    def get_stock_quote(self, symbol: str) -> Optional[Dict]:
        """Get current stock quote from Alpha Vantage"""
        try:
            params = {
                'function': 'GLOBAL_QUOTE',
                'symbol': symbol,
                'apikey': self.alpha_vantage_key
            }
            
            response = requests.get(self.alpha_vantage_base_url, params=params, timeout=10)
            data = response.json()
            
            if 'Global Quote' in data:
                quote = data['Global Quote']
                return {
                    'symbol': quote.get('01. symbol', symbol),
                    'price': float(quote.get('05. price', 0)),
                    'change': float(quote.get('09. change', 0)),
                    'change_percent': quote.get('10. change percent', '0%').replace('%', ''),
                    'volume': int(quote.get('06. volume', 0)),
                    'latest_trading_day': quote.get('07. latest trading day', ''),
                    'source': 'Alpha Vantage'
                }
        except Exception as e:
            print(f"Error fetching stock quote for {symbol}: {e}")
            return None
    
    def get_crypto_prices(self, coins: List[str] = None) -> Dict:
        """Get cryptocurrency prices from CoinGecko"""
        if coins is None:
            coins = ['bitcoin', 'ethereum', 'binancecoin', 'cardano', 'solana']
        
        try:
            coins_str = ','.join(coins)
            url = f"{self.coingecko_base_url}/simple/price"
            params = {
                'ids': coins_str,
                'vs_currencies': 'usd,inr',
                'include_24hr_change': 'true',
                'include_market_cap': 'true'
            }
            
            response = requests.get(url, params=params, timeout=10)
            data = response.json()
            
            formatted_data = {}
            for coin_id, coin_data in data.items():
                formatted_data[coin_id] = {
                    'name': coin_id.replace('-', ' ').title(),
                    'price_usd': coin_data.get('usd', 0),
                    'price_inr': coin_data.get('inr', 0),
                    'change_24h': coin_data.get('usd_24h_change', 0),
                    'market_cap': coin_data.get('usd_market_cap', 0),
                    'source': 'CoinGecko'
                }
            
            return formatted_data
        except Exception as e:
            print(f"Error fetching crypto prices: {e}")
            return {}
    
    def get_forex_rates(self, from_currency: str = 'USD', to_currency: str = 'INR') -> Optional[Dict]:
        """Get forex rates from Alpha Vantage"""
        try:
            params = {
                'function': 'CURRENCY_EXCHANGE_RATE',
                'from_currency': from_currency,
                'to_currency': to_currency,
                'apikey': self.alpha_vantage_key
            }
            
            response = requests.get(self.alpha_vantage_base_url, params=params, timeout=10)
            data = response.json()
            
            if 'Realtime Currency Exchange Rate' in data:
                rate_data = data['Realtime Currency Exchange Rate']
                return {
                    'from_currency': rate_data.get('1. From_Currency Code', from_currency),
                    'to_currency': rate_data.get('3. To_Currency Code', to_currency),
                    'exchange_rate': float(rate_data.get('5. Exchange Rate', 0)),
                    'last_refreshed': rate_data.get('6. Last Refreshed', ''),
                    'source': 'Alpha Vantage'
                }
        except Exception as e:
            print(f"Error fetching forex rates: {e}")
            return None
    
    def get_market_summary(self) -> Dict:
        """Get a comprehensive market summary"""
        summary = {
            'stocks': {},
            'crypto': {},
            'forex': {},
            'last_updated': None
        }
        
        # Get popular stock quotes
        popular_stocks = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN']
        for stock in popular_stocks[:2]:  # Limit to 2 to stay within API limits
            quote = self.get_stock_quote(stock)
            if quote:
                summary['stocks'][stock] = quote
        
        # Get crypto prices
        crypto_data = self.get_crypto_prices()
        summary['crypto'] = crypto_data
        
        # Get USD to INR rate
        forex_rate = self.get_forex_rates()
        if forex_rate:
            summary['forex']['USD_INR'] = forex_rate
        
        return summary
    
    def get_investment_recommendations(self, risk_profile: str, investment_amount: float) -> Dict:
        """Generate investment recommendations based on current market data"""
        recommendations = {
            'risk_profile': risk_profile,
            'investment_amount': investment_amount,
            'allocations': [],
            'market_insights': []
        }
        
        # Get current market data
        market_data = self.get_market_summary()
        
        # Define allocation strategies based on risk profile
        if risk_profile.lower() == 'conservative':
            allocations = [
                {'asset_class': 'Fixed Deposits/Bonds', 'percentage': 60, 'amount': investment_amount * 0.6},
                {'asset_class': 'Large Cap Stocks', 'percentage': 25, 'amount': investment_amount * 0.25},
                {'asset_class': 'Gold/Commodities', 'percentage': 10, 'amount': investment_amount * 0.1},
                {'asset_class': 'Cash/Emergency Fund', 'percentage': 5, 'amount': investment_amount * 0.05}
            ]
        elif risk_profile.lower() == 'moderate':
            allocations = [
                {'asset_class': 'Large Cap Stocks', 'percentage': 40, 'amount': investment_amount * 0.4},
                {'asset_class': 'Mid Cap Stocks', 'percentage': 20, 'amount': investment_amount * 0.2},
                {'asset_class': 'Fixed Deposits/Bonds', 'percentage': 25, 'amount': investment_amount * 0.25},
                {'asset_class': 'Gold/Commodities', 'percentage': 10, 'amount': investment_amount * 0.1},
                {'asset_class': 'Cryptocurrency', 'percentage': 5, 'amount': investment_amount * 0.05}
            ]
        else:  # aggressive
            allocations = [
                {'asset_class': 'Large Cap Stocks', 'percentage': 30, 'amount': investment_amount * 0.3},
                {'asset_class': 'Mid/Small Cap Stocks', 'percentage': 35, 'amount': investment_amount * 0.35},
                {'asset_class': 'Cryptocurrency', 'percentage': 15, 'amount': investment_amount * 0.15},
                {'asset_class': 'International Stocks', 'percentage': 10, 'amount': investment_amount * 0.1},
                {'asset_class': 'Fixed Deposits/Bonds', 'percentage': 10, 'amount': investment_amount * 0.1}
            ]
        
        recommendations['allocations'] = allocations
        
        # Add market insights based on current data
        insights = []
        
        # Crypto insights
        if market_data['crypto']:
            btc_change = market_data['crypto'].get('bitcoin', {}).get('change_24h', 0)
            if btc_change > 5:
                insights.append("Bitcoin is up significantly today (+{:.1f}%). Consider taking profits if you're overexposed to crypto.".format(btc_change))
            elif btc_change < -5:
                insights.append("Bitcoin is down significantly today ({:.1f}%). This might be a good buying opportunity for long-term investors.".format(btc_change))
        
        # Stock insights
        if market_data['stocks']:
            for symbol, data in market_data['stocks'].items():
                change_pct = float(data.get('change_percent', '0').replace('%', ''))
                if change_pct > 3:
                    insights.append(f"{symbol} is performing well today (+{change_pct:.1f}%). Monitor for potential profit-taking opportunities.")
        
        # Forex insights
        if market_data['forex'].get('USD_INR'):
            usd_inr_rate = market_data['forex']['USD_INR']['exchange_rate']
            if usd_inr_rate > 85:
                insights.append(f"USD/INR is at {usd_inr_rate:.2f}. Consider international diversification as rupee is weakening.")
        
        if not insights:
            insights.append("Markets are relatively stable today. Stick to your long-term investment strategy.")
        
        recommendations['market_insights'] = insights
        recommendations['market_data'] = market_data
        
        return recommendations

