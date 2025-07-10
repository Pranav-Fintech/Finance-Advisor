import { useState } from 'react'
import IncomeInput from './components/IncomeInput.jsx'
import BudgetDisplay from './components/BudgetDisplay.jsx'
import InvestmentAdvice from './components/InvestmentAdvice.jsx'
import './App.css'

function App() {
  const [currentStep, setCurrentStep] = useState('income') // 'income', 'budget', 'investment'
  const [budgetData, setBudgetData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleIncomeSubmit = async (income) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/budget-allocation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ monthly_income: income }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to calculate budget allocation')
      }
      
      const data = await response.json()
      setBudgetData(data)
      setCurrentStep('budget')
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to calculate budget. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToIncome = () => {
    setCurrentStep('income')
    setBudgetData(null)
  }

  const handleGetInvestmentAdvice = () => {
    setCurrentStep('investment')
  }

  const handleBackToBudget = () => {
    setCurrentStep('budget')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="container mx-auto">
        {currentStep === 'income' && (
          <IncomeInput onIncomeSubmit={handleIncomeSubmit} />
        )}
        
        {currentStep === 'budget' && budgetData && (
          <BudgetDisplay 
            budgetData={budgetData}
            onBack={handleBackToIncome}
            onGetInvestmentAdvice={handleGetInvestmentAdvice}
          />
        )}

        {currentStep === 'investment' && budgetData && (
          <div>
            <div className="mb-6">
              <button
                onClick={handleBackToBudget}
                className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                ← Back to Budget
              </button>
            </div>
            <InvestmentAdvice 
              savingsAmount={budgetData.allocations.savings_investments.amount}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
