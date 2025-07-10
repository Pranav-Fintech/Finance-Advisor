import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { DollarSign } from 'lucide-react'

const IncomeInput = ({ onIncomeSubmit }) => {
  const [income, setIncome] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const incomeValue = parseFloat(income)
    
    if (isNaN(incomeValue) || incomeValue <= 0) {
      alert('Please enter a valid income amount')
      return
    }
    
    setIsLoading(true)
    await onIncomeSubmit(incomeValue)
    setIsLoading(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <DollarSign className="w-6 h-6 text-green-600" />
        </div>
        <CardTitle className="text-2xl font-bold">Welcome to Your Finance Assistant</CardTitle>
        <CardDescription>
          Let's start by understanding your monthly income to create a personalized budget plan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Income (₹)
            </label>
            <Input
              id="income"
              type="number"
              placeholder="Enter your monthly income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full"
              min="0"
              step="0.01"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Calculating...' : 'Calculate Budget'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default IncomeInput

