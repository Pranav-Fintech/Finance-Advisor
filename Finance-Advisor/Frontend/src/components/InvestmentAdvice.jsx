import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'

export default function InvestmentAdvice({ savingsAmount }) {
  const [investmentData, setInvestmentData] = useState(null)
  const [riskProfile, setRiskProfile] = useState('moderate')
  const [loading, setLoading] = useState(false)

  const getInvestmentAdvice = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/investment-advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          investment_amount: savingsAmount,
          risk_profile: riskProfile
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        setInvestmentData(data)
      } else {
        console.error('Failed to get investment advice')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRiskColor = (profile) => {
    switch (profile) {
      case 'conservative': return 'text-green-600'
      case 'moderate': return 'text-yellow-600'
      case 'aggressive': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            Investment Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="risk-profile">Risk Profile</Label>
            <select
              id="risk-profile"
              value={riskProfile}
              onChange={(e) => setRiskProfile(e.target.value)}
              className="w-full p-2 border rounded-md mt-1"
            >
              <option value="conservative">Conservative (Low Risk)</option>
              <option value="moderate">Moderate (Medium Risk)</option>
              <option value="aggressive">Aggressive (High Risk)</option>
            </select>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">
              Available for Investment: ₹{savingsAmount?.toLocaleString() || '0'}
            </p>
            <Button 
              onClick={getInvestmentAdvice}
              disabled={loading || !savingsAmount}
              className="w-full"
            >
              {loading ? 'Getting Advice...' : 'Get Investment Advice'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {investmentData && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className={`text-lg ${getRiskColor(investmentData.risk_profile)}`}>
                {investmentData.risk_profile.charAt(0).toUpperCase() + investmentData.risk_profile.slice(1)} Portfolio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investmentData.allocations?.map((allocation, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{allocation.asset_class}</span>
                      <span className="text-sm text-gray-600">
                        {allocation.percentage}% (₹{allocation.amount?.toLocaleString()})
                      </span>
                    </div>
                    <Progress value={allocation.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {investmentData.market_insights && investmentData.market_insights.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Market Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {investmentData.market_insights.map((insight, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">{insight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {investmentData.market_data && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Live Market Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Crypto Data */}
                  {investmentData.market_data.crypto && Object.keys(investmentData.market_data.crypto).length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Cryptocurrencies</h4>
                      <div className="space-y-2">
                        {Object.entries(investmentData.market_data.crypto).slice(0, 3).map(([coin, data]) => (
                          <div key={coin} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="font-medium">{data.name}</span>
                            <div className="text-right">
                              <div className="text-sm">₹{data.price_inr?.toLocaleString()}</div>
                              <div className={`text-xs ${data.change_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {data.change_24h >= 0 ? '+' : ''}{data.change_24h?.toFixed(2)}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stock Data */}
                  {investmentData.market_data.stocks && Object.keys(investmentData.market_data.stocks).length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Stocks</h4>
                      <div className="space-y-2">
                        {Object.entries(investmentData.market_data.stocks).map(([symbol, data]) => (
                          <div key={symbol} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="font-medium">{symbol}</span>
                            <div className="text-right">
                              <div className="text-sm">${data.price?.toFixed(2)}</div>
                              <div className={`text-xs ${data.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {data.change >= 0 ? '+' : ''}{data.change_percent}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Forex Data */}
                {investmentData.market_data.forex?.USD_INR && (
                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">USD/INR Exchange Rate</span>
                      <span className="text-lg font-bold">
                        ₹{investmentData.market_data.forex.USD_INR.exchange_rate?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}

