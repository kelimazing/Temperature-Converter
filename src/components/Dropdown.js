import React, { useState, useEffect, useRef} from "react";

const Dropdown = ({ options, selected, onSelectedChange, label }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(); 
  
  useEffect(() => {
    const onBodyClick = (event) => {
      // ref.current returns the DOM that has the ref property
      if (ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };

    document.body.addEventListener("click", onBodyClick, { capture: true });
 
    return () => {
      document.body.removeEventListener("click", onBodyClick, { capture: true });
    };
  }, []);

  
  const renderedOptions = options.map((option) => {
    if (option.value === selected.value) {
      return null;
    }

    return (
      <div 
      key={option.value} 
      className="item"
      onClick={() => onSelectedChange(option)}

      >
        {option.label}
      </div>
    )
  })

  return (
    <React.Fragment>
        <div className="field">
          <label className="label">{label}</label>
          <div
            ref={ref} 
            className={`ui selection dropdown ${open ? 'visible active' : ''}`}
            onClick={() => {setOpen(!open)}}
          >
            <i className="dropdown icon"></i>
            <div className="text">{selected.label}</div>
            <div className={`menu ${open ? 'visible transition' : ''}`}>
              {renderedOptions}
            </div>
          </div>
      </div>
      {/* <hr/> */}
      {/* <h1 style={{ color: `${selected.value}` }}>This Color is {selected.label}</h1> */}
    </React.Fragment>
     
  )
}

export default Dropdown;