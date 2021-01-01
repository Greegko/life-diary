import React from 'react';

interface StepperProperties {
  children: any;
  onChange: (step: number) => void;
  smallStep?: number;
  bigStep?: number;
}

import './stepper.scss';
export const Stepper = ({ children, onChange, smallStep, bigStep }: StepperProperties) => (
  <span>
    {bigStep && <span className="stepper__adjuster" onClick={() => onChange(-bigStep)}>{"<<"}</span>}
    {smallStep && <span className="stepper__adjuster" onClick={() => onChange(-smallStep)}>{"<"}</span>}

    <span className="stepper__value">
      {children}
    </span>

    {smallStep && <span className="stepper__adjuster" onClick={() => onChange(smallStep)}>{">"}</span>}
    {bigStep && <span className="stepper__adjuster" onClick={() => onChange(bigStep)}>{">>"}</span>}
  </span>
);
