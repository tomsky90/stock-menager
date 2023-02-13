import React, { useState } from 'react'
import StepCounter from '../components/stepCounter/StepCounter';

const BinTransfer = () => {
  const [activeStep, setActiveStep] = useState(1)
  return (
    <div className="bin-transfer-page">
      <StepCounter steps={3} activeStep={activeStep}/>
    </div>
  );
};

export default BinTransfer;
