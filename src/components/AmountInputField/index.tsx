import React, { useState, useCallback } from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { CurrencyConverter } from 'amountinator'
import useAsyncEffect from 'use-async-effect'

const AmountInputField = ({ onSatoshisChange }) => {
  const [amount, setAmount] = useState('')
  const [currencySymbol, setCurrencySymbol] = useState('$')
  const currencyConverter = new CurrencyConverter()

  useAsyncEffect(async () => {
    try {
      await currencyConverter.initialize()
      setCurrencySymbol(currencyConverter.getCurrencySymbol())
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error)
    }
  }, [])

  const handleAmountChange = useCallback(async (event) => {
    const input = event.target.value.replace(/[^0-9.]/g, '')
    if (input !== amount) {
      setAmount(input)
      try {
        const satoshis = await currencyConverter.convertToSatoshis(input)
        onSatoshisChange(satoshis)
      } catch (error) {
        console.error('Error converting currency:', error)
      }
    }
  }, [])

  return (
    <TextField
      label="Enter Amount"
      variant="outlined"
      value={amount}
      onChange={handleAmountChange}
      InputProps={{
        startAdornment: <InputAdornment position="start">{currencySymbol}</InputAdornment>
      }}
      sx={{ backgroundColor: 'white' }}
      fullWidth
    />
  )
}
export default AmountInputField