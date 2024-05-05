import * as React from 'react';
import flattenChildren from 'react-keyed-flatten-children';

// Create radio contexts
const RadioGroupContext = React.createContext()
const RadioItemContext = React.createContext()

// Export radio context hooks
export const useRadioGroupContext = () => React.useContext(RadioGroupContext)
export const useRadioItemContext = () => React.useContext(RadioItemContext)

export default function RadioGroup({
  value,
  onChange = () => {},
  children,
  className,
  ...props
}) {
  const items = flattenChildren(children)

  return (
    <RadioGroupContext.Provider value={{ value, items, onChange }}>
      <div role="radiogroup" className={className} {...props}>
        {items.map((child, index) => (
          <RadioItemContext.Provider key={index} value={index}>
            {child}
          </RadioItemContext.Provider>
        ))}
      </div>
    </RadioGroupContext.Provider>
  )
}