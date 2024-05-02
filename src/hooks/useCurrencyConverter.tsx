// import { useState, useEffect } from 'react'
// import { CurrencyConverter } from 'amountinator'

// export function useCurrencyConverter() {
//   const [converter, setConverter] = useState<CurrencyConverter | null>(null)
//   const [isInitialized, setInitialized] = useState(false)
//   const [error, setError] = useState<Error | null>(null)

//   useEffect(() => {
//     const initConverter = async () => {
//       try {
//         const instance = await CurrencyConverter.createInstance()
//         setConverter(instance)
//         setInitialized(true)
//       } catch (err: any) {
//         setError(err)
//         console.error("Failed to initialize CurrencyConverter:", err)
//       }
//     }

//     if (!converter) {
//       initConverter()
//     }
//   }, [converter])

//   return { converter, isInitialized, error }
// }
