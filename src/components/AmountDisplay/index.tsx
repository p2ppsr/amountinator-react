import React, { useState, useEffect } from 'react'
import { CurrencyConverter } from 'amountinator'
import useAsyncEffect from 'use-async-effect'

interface FormatOptions {
  decimalPlaces?: number
  useCommas?: boolean
  useUnderscores?: boolean
}

interface AmountDisplayProps {
  children: string
  formatOptions?: FormatOptions
}

const AmountDisplay: React.FC<AmountDisplayProps> = ({ children, formatOptions }) => {
  const [displayAmount, setDisplayAmount] = useState<string>('')
  let currencyConverter = new CurrencyConverter()

  useAsyncEffect(async () => {
    await currencyConverter.initialize()
  }, [])

  useAsyncEffect(async () => {
    console.log('rerender')
    const finalAmountToDisplay = await currencyConverter.convertCurrency(children as string, formatOptions)
    setDisplayAmount(finalAmountToDisplay)
  }, [children, currencyConverter.exchangeRates, formatOptions]) // Exchange rates not a state variable?

  return (
    <div>
      {displayAmount}
    </div>
  )
}
export default AmountDisplay