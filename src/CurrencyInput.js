
const CurrencyInput=({amount,currency,currencies,onAmountChange,onCurrencyChange})=> {

  return (
    <div>
        <div>
            <input value={amount} onChange={(e=>onAmountChange(e.target.value))}/>
            <select value={currency} onChange={(e=>onCurrencyChange(e.target.value))}>
             {currencies.map(currency=>
              (
              <option value={currency}>{currency}</option>
              )
            )}
            </select>
        
        </div>
    </div>
  )
}

export default CurrencyInput