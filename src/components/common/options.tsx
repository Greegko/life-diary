import * as React from 'react';

interface OptionsProperties<T> {
  value: T;
  options: T[];
  label?: (value: T) => string;
  valueChange: (value: T) => void;
}

import './option.scss';
export function Options<T>(props: OptionsProperties<T>) {
  return (
    <div className="options">
      {props.options.map((option, i) => (
        <span
          key={i}
          className={"options__option" + (props.value === option ? " options__option--selected" : "")}
          onClick={() => props.valueChange(option)}
        >
          {props.label ? props.label(option) : option}
        </span>
      ))}
    </div>
  );
}
