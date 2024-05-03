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
    // Note: Handle errors at a higher layer!
    await currencyConverter.initialize()
  }, [])

  useAsyncEffect(async () => {
    // Note: Handle errors at a higher layer!
    const finalAmountToDisplay = await currencyConverter.convertCurrency(children, formatOptions)
    setDisplayAmount(finalAmountToDisplay)
  }, [children])

  return (
    <div>
      {displayAmount}
    </div>
  )
}
export default AmountDisplay