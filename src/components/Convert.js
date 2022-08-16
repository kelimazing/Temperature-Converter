import React, { useState, useEffect } from "react";
import Big from 'big.js';

// Convert constants in the formula to Big objects
var K = new Big(273.15)
var F = new Big(1.8)

const Convert = ({ temp, tempIn, tempOut }) => {
  const [result, setResult] = useState('')

  // Define doConversion to be used in handleConversion
  const doConversion = (value, tempIn, tempOut) =>  {
    // Convert value to Big Object
    var v = new Big(value)

    // For each case of tempIn use a ternary expression to provide the conversion formulas.  Use big.js to prevent floating point error
    switch(tempIn.value) {
      // Celsius
      case "c":
        setResult(`${tempOut.value === "k" ? v.plus(K).valueOf() : v.times(F).plus(32).valueOf()} ${tempOut.symbol}`)
        break;
      // Kelvin
      case "k":
        setResult(`${tempOut.value === "c" ? v.minus(K).valueOf() : v.minus(K).times(F).plus(32).valueOf() } ${tempOut.symbol}`)
        break;
      // Fahrenheit
      case "f":
        setResult(`${tempOut.value === "c" ? v.minus(32).div(1.8).valueOf() : v.minus(32).div(1.8).plus(K).valueOf() } ${tempOut.symbol}`)
        break;      
      // If user manipulates input other than the given options
      default:
        setResult('Invalid temperature units')
      
    }
  }

  useEffect(() => {
    const handleConversion = () => {
      // Convert temp to number
      var inputValue = temp * 1
      
      // If input is not a number or starts with a whitespace
      if (isNaN(temp) || Array.from(temp)[0] === ' ') {
        setResult('Input must be a valid number')
      }

      // If tempIn and tempOut are the same
      else if (tempIn === tempOut) {
        setResult(`${inputValue} ${tempOut.symbol}`)
      } 
      
      // Otherwise proceed with conversion
      else {
        doConversion(inputValue, tempIn, tempOut)
      }
    };

    // If input exists and does not start with "-", ".", or "-."
    if (temp && temp !== "-" && temp !== '.' && temp !== '-.') {
      handleConversion();
    } 
    // Set result back to default
    else {
      setResult('')
    }
    
  }, [temp, tempIn, tempOut])
  
  


  return result !== '' ? 
    <div>
      <h2 className="ui header">
        {result}
      </h2>
    </div> :
    null;
}

export default Convert;