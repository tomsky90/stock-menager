import React, { useState} from 'react';

const StepCounter = (steps) => {

  const [step, setStep] = useState (1)


  const renderSteps = () => {
    const arr = [];
    for(let i = 1; i <= steps.steps; i++) {
      
      if(i < steps.steps) {
        arr.push(
          <React.Fragment
             key={i} >
            <div className={step === i ? 'step active' : 'step'}>{i}</div>
            <div className={step === i ? 'step__bar active' : 'step__bar'}></div>
          </React.Fragment>
          
        )
      }
     

      if(i === steps.steps) {
        arr.push(
          <React.Fragment key={i}>
            <div className={step === i ? 'step active' : 'step'}>{i}</div>
          </React.Fragment>
        )
      
      }
    }
    return arr;
  }
  return ( 
    <div className='step-counter'>
      <p className="step-counter__counter-heading">Step: {steps.steps} of 2</p>
      <div className='steps-wrapper'>
        {renderSteps()}
      </div>
      {console.log(steps)}
    </div>
   );
}
 
export default StepCounter;