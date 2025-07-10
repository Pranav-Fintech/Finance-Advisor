import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Home, ShoppingBag, PiggyBank, ArrowLeft } from 'lucide-react'

const BudgetDisplay = ({ budgetData, onBack, onGetInvestmentAdvice }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const chartData = [
    { name: 'Needs', value: budgetData.allocations.needs.amount, color: '#ef4444' },
    { name: 'Wants', value: budgetData.allocations.wants.amount, color: '#f59e0b' },
    { name: 'Savings & Investments', value: budgetData.allocations.savings_investments.amount, color: '#10b981' }
  ]

  const COLORS = ['#ef4444', '#f59e0b', '#10b981']

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Your Budget Plan</h1>
        <div></div>
      </div>

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-green-600">
            {formatCurrency(budgetData.monthly_income)}
          </CardTitle>
          <CardDescription>Monthly Income</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Budget Breakdown</CardTitle>
            <CardDescription>Recommended allocation based on the 50/30/20 rule</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <Home className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">Needs</p>
                    <p className="text-sm text-gray-500">{budgetData.allocations.needs.percentage}%</p>
                  </div>
                </div>
                <p className="font-bold">{formatCurrency(budgetData.allocations.needs.amount)}</p>
              </div>
              <Progress value={budgetData.allocations.needs.percentage} className="h-2" />
              <p className="text-sm text-gray-600">{budgetData.allocations.needs.description}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium">Wants</p>
                    <p className="text-sm text-gray-500">{budgetData.allocations.wants.percentage}%</p>
                  </div>
                </div>
                <p className="font-bold">{formatCurrency(budgetData.allocations.wants.amount)}</p>
              </div>
              <Progress value={budgetData.allocations.wants.percentage} className="h-2" />
              <p className="text-sm text-gray-600">{budgetData.allocations.wants.description}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <PiggyBank className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Savings & Investments</p>
                    <p className="text-sm text-gray-500">{budgetData.allocations.savings_investments.percentage}%</p>
                  </div>
                </div>
                <p className="font-bold">{formatCurrency(budgetData.allocations.savings_investments.amount)}</p>
              </div>
              <Progress value={budgetData.allocations.savings_investments.percentage} className="h-2" />
              <p className="text-sm text-gray-600">{budgetData.allocations.savings_investments.description}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visual Breakdown</CardTitle>
            <CardDescription>Your budget allocation at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {budgetData.recommendations && budgetData.recommendations.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">Financial Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {budgetData.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2 text-blue-700">
                  <span className="text-blue-500 mt-1">•</span>
                  {recommendation}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-green-800">Ready to Invest?</h3>
            <p className="text-green-700">
              You have {formatCurrency(budgetData.allocations.savings_investments.amount)} available for savings and investments. 
              Get personalized investment recommendations based on your risk profile.
            </p>
            <Button 
              onClick={onGetInvestmentAdvice}
              className="bg-green-600 hover:bg-green-700"
            >
              Get Investment Advice
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BudgetDisplay

