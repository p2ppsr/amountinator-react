import React, { useState, useEffect } from 'react'
import { CurrencyConverter } from 'amountinator'
import useAsyncEffect from 'use-async-effect'

interface FormatOptions {
  decimalPlaces?: number
  useCommas?: boolean
  useUnderscores?: boolean
}

interface AmountDisplayProps {
  children: string | number
  formatOptions?: FormatOptions
}

const AmountDisplay = ({ children, formatOptions }: AmountDisplayProps) => {
  const [displayAmount, setDisplayAmount] = useState<string>('')
  let currencyConverter = new CurrencyConverter()

  useAsyncEffect(async () => {
    try {
      await currencyConverter.initialize()
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error)
    }
  }, [])

  useAsyncEffect(async () => {
    try {
      const finalAmountToDisplay = await currencyConverter.convertCurrency(children, formatOptions)
      setDisplayAmount(finalAmountToDisplay)
    } catch (error) {
      console.error('Could not convert amount:', error)
    }
  }, [children])

  return (
    <div>
      {displayAmount}
    </div>
  )
}
export default AmountDisplay