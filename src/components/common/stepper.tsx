import React from 'react';

interface StepperProperties {
  value: any;
  onChange: (value: number) => void;
  smallStep?: number;
  bigStep?: number;
}

import './stepper.scss';
export const Stepper = ({ value, onChange, smallStep = 5, bigStep = 30 }: StepperProperties) => (
  <span>
    <span className="stepper__adjuster" onClick={() => onChange(-bigStep)}>{"<<"}</span>
    <span className="stepper__adjuster" onClick={() => onChange(-smallStep)}>{"<"}</span>

    <span className="stepper__value">
      {value}
    </span>

    <span className="stepper__adjuster" onClick={() => onChange(smallStep)}>{">"}</span>
    <span className="stepper__adjuster" onClick={() => onChange(bigStep)}>{">>"}</span>
  </span>
);
