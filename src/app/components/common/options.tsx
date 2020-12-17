import { without } from 'ramda';
import React, { useCallback } from 'react';

interface BaseOptionProperties<T> {
  options: T[];
  multipleOptions?: boolean;
  label?: (value: T) => string;
}

interface SingleOptionProperties<T> extends BaseOptionProperties<T> {
  value?: T;
  multipleOptions?: false;
  onValueChange: (value: T) => void;
}

interface MultipeOptionsProperties<T> extends BaseOptionProperties<T> {
  value?: T[];
  multipleOptions: true;
  onValueChange: (value: T[]) => void;
}

type OptionsProperties<T> = MultipeOptionsProperties<T> | SingleOptionProperties<T>;

import './option.scss';

export function Options<T>(props: OptionsProperties<T>) {
  if (props.multipleOptions === true) {
    const setOption = useCallback((toggleOption: T) => {
      const values = props.value || [];
      if (values.includes(toggleOption)) {
        props.onValueChange(without([toggleOption], values));
      } else {
        props.onValueChange([...values, toggleOption]);
      }
    }, [props.value]);

    return <OptionsDisplay {...props} setOption={setOption} />;
  } else {
    return <OptionsDisplay {...props} value={props.value ? [props.value] : []} setOption={(value: T) => props.onValueChange(value)} />;
  }
}

interface OptionsDisplayProperties<T> extends BaseOptionProperties<T> {
  value?: T[];
  setOption: (value: T) => void;
}

function OptionsDisplay<T>(props: OptionsDisplayProperties<T>) {
  return (
    <div className="options">
      {props.options.map((option, i) => (
        <span
          key={i}
          className={"options__option" + (props.value && props.value.includes(option) ? " options__option--selected" : "")}
          onClick={() => props.setOption(option)}
        >
          {props.label ? props.label(option) : option}
        </span>
      ))}
    </div>
  );
}
