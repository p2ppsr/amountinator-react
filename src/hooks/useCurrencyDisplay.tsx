import { useState, useEffect } from 'react'
import { CurrencyConverter } from 'amountinator'
import useAsyncEffect from 'use-async-effect'

interface FormatOptions {
  decimalPlaces?: number
  useCommas?: boolean
  useUnderscores?: boolean
}

const useCurrencyDisplay = (amount: string | number, formatOptions?: FormatOptions) => {
  const [displayAmount, setDisplayAmount] = useState<string>('')
  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const currencyConverter = new CurrencyConverter()

  useEffect(() => {

    // Initialize the currency converter
    const initialize = async () => {
      try {
        await currencyConverter.initialize()
        setIsInitialized(true)
      } catch (err) {
        setError(err as Error)
      }
    }

    initialize()

    // TODO: Clean up
  }, [])

  useAsyncEffect(async () => {
    if (isInitialized) {
      try {
        const finalAmountToDisplay = await currencyConverter.convertCurrency(amount.toString(), formatOptions)
        setDisplayAmount(finalAmountToDisplay)
      } catch (err) {
        setError(err as Error)
      }
    }
  }, [amount, formatOptions, isInitialized])

  return { displayAmount, error }
}
export default useCurrencyDisplay