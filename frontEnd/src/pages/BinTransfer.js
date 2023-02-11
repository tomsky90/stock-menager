import React, { useState } from 'react'
import StepCounter from '../components/stepCounter/StepCounter';

const BinTransfer = () => {
  return (
    <div className="bin-transfer-page">
      <StepCounter steps={3}/>
    </div>
  );
};

export default BinTransfer;
