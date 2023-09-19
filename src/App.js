import './App.css';
import CurrencyInput from './CurrencyInput.js'
import {useState,useEffect} from "react";
import axios from 'axios';
import {format} from 'date-fns'

function App() {

  //api from https://apilayer.com/marketplace/fixer-api?utm_source=apilayermarketplace&utm_medium=featured
  const apiKey= "nzAdMlQdAK2dzKy3TRUCWUAPyRiUXqRD";
  const API=`https://api.apilayer.com/fixer/latest?base=USD&apikey=${apiKey}`;

  //useState of currency rate in exchange comes from api
  const [currencyRate,setCurrencyRates]= useState([]);

  //initial value of two input fields
  const [amountOne,setAmountOne] = useState(1);
  const [amountTwo,setAmountTwo] = useState(1);

  //initial value of selector currency fields
  const [currencyOne,setCurrencyOne] = useState("USD");
  const [currencyTwo,setCurrencyTwo] = useState("JOD");

  //get api using axios
  useEffect(()  =>  {
    axios
    .get(API)
    .then((response)=>setCurrencyRates(response.data.rates))
    .catch((error)=>{
      console.log(error)
      setCurrencyRates(null);
    });

  },[]); 

  //method of determine number of digits to display
  const currencyFixed = (num) =>  {
     return num.toFixed(3);
  }
  //method of counting amount of field two based on changing in currency of field one "amount one"

  const handleAmountOneChange = (amountOne) => {
     setAmountTwo(
      currencyFixed( (amountOne*currencyRate[currencyTwo]) / currencyRate[currencyOne])
     );
  //update amount one
     setAmountOne(amountOne);

  }
  //method of counting amount of field one based on changing in currency of field two "amount two"
  const handleAmountTwoChange = (amountTwo) => {
    setAmountOne(

      currencyFixed(  (amountTwo*currencyRate[currencyOne]) / currencyRate[currencyTwo])

    )
    //update amount two
    setAmountTwo(amountTwo);

  }
//method of cunting amount of field two based on changing of currency one
  const handleCurrencyOneChange = (currencyOne) =>{ 

    setAmountTwo(
      currencyFixed(  (amountOne*currencyRate[currencyTwo]) / currencyRate[currencyOne])
    )

    setCurrencyOne(currencyOne)
  }
  //method of cunting amount of field one based on changing of currency two

  const handleCurrencyTWoChange = (currencyTwo) => {

    setAmountOne(
      currencyFixed(  (amountTwo*currencyRate[currencyOne]) / currencyRate[currencyTwo])
    )
  //update currency value
    setCurrencyTwo(currencyTwo)
  }

//using currencyRate depancy  
  useEffect(() => {
    
  if(!!currencyRate)
  handleAmountOneChange(1)
  },[currencyRate])
  //is loading 

  if(currencyRate.length===0)
  return<p>is Loading...</p>

  //wrong error
  if(!currencyRate)
  return<p>something went wrong!!</p>

   return (
    <div >
         <h1>
           Currency Converter
        </h1>
        <p>
          {currencyOne} equals  {currencyFixed( amountTwo/amountOne)} {currencyTwo}
        </p>
        <p>
          {format(new Date(), "dd/MM/yyy hh:mm a")}
        </p>
        <CurrencyInput amount={amountOne} 
        currency={currencyOne}
        //convert object to array
         currencies={Object.keys(currencyRate)}
         onAmountChange={handleAmountOneChange}
         onCurrencyChange={handleCurrencyOneChange}/>

        <CurrencyInput amount={amountTwo}
         currency={currencyTwo}
         currencies={Object.keys(currencyRate)}
          onAmountChange={handleAmountTwoChange}
         onCurrencyChange={handleCurrencyTWoChange}/>
    
    </div>
  );
}

export default App;
