import React, { useState } from 'react'
import { CurrencyConverter } from 'amountinator'
import useAsyncEffect from 'use-async-effect'
import { Tooltip, Typography } from '@mui/material'

interface FormatOptions {
  decimalPlaces?: number
  useCommas?: boolean
  useUnderscores?: boolean
}

interface AmountDisplayProps {
  paymentAmount: number | string
  formatOptions?: FormatOptions
}

const AmountDisplay = ({ paymentAmount, formatOptions }: AmountDisplayProps) => {
  const [displayAmount, setDisplayAmount] = useState<{
    formattedAmount: string;
    hoverText?: string | undefined;
  }>({
    formattedAmount: ''
  })
  const currencyConverter = new CurrencyConverter()

  useAsyncEffect(async () => {
    try {
      await currencyConverter.initialize()
      const convertedAmount = await currencyConverter.convertAmount(paymentAmount, formatOptions)
      setDisplayAmount(convertedAmount)
    } catch (error) {
      console.error('Failed to convert amount:', error)
      // setDisplayAmount('Error')
    }
  }, [paymentAmount, formatOptions])

  return (
    <Tooltip title={displayAmount.hoverText}>
      <Typography>{displayAmount.formattedAmount}</Typography>
    </Tooltip>
  )
}
export default AmountDisplay