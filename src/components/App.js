// Import React and ReactDOM libraries
import React from 'react';
import { useState } from 'react';

import Dropdown from './Dropdown';
import Convert from './Convert';

// OPtions for temperature units
const options = [
  {
    label: 'Celsius',
    value: 'c',
    symbol: '°C'
  },
  {
    label: 'Fahrenheit',
    value: 'f',
    symbol: '°F'
  },
  {
    label: 'Kelvin',
    value: 'k',
    symbol: 'K'
  } 
]


// Create a react component
const App = () => {
  // Set state for every variable
  const [input, setInput] = useState('')
  const [tempIn, setTempIn] = useState(options[0])
  const [tempOut, setTempOut] = useState(options[1])
  const [convertData, setConvertData] = useState({
    input,
    tempIn: options[0],
    tempOut: options[1]
  })

  const onSubmit = (e) => {
    // Prevent refresh page upon submit
    e.preventDefault()

    // Pass values to Convert
    setConvertData({
      input,
      tempIn,
      tempOut,
    })
  }

  // Render on screen
  return (
    <div className='ui container shadow'>
      <div className='ui segment'>
        <div >
          {/* Render Form */} 
          <form
            onSubmit={onSubmit}
            className='ui equal width form'
          > 
            {/* Input Box */} 
            <div className="field">
              <label>Degrees</label>
              <input value={input} onChange={(e) => setInput(e.target.value)} />
            </div>

              {/* Initial Temperature Dropdown */}
              <Dropdown 
                options={options}
                selected={tempIn}
                onSelectedChange={setTempIn}
                label="From"
              />
              {/* Converted Temperature Dropdown */}
              <Dropdown 
                options={options}
                selected={tempOut}
                onSelectedChange={setTempOut}
                label="To"
              />

          </form>
          
          {/* Render Results */}
          <div className='ui horizontal divider'> Result </div>
            <Convert 
              temp={input}
              tempIn={tempIn}
              tempOut={tempOut}
            />
        </div>
      </div>
    </div>
    
  ) 
}

export default App;