import React from 'react';

const StepCounter = ({steps, activeStep}) => {


  const renderSteps = () => {
    const arr = [];
    for(let i = 1; i <= steps; i++) {
      
      if(i < steps) {
        arr.push(
          <React.Fragment
             key={i} >
            <div className={activeStep >= i ? 'step active' : 'step'}>{i}</div>
            <div className={activeStep > i ? 'step__bar active' : 'step__bar'}></div>
          </React.Fragment>
          
        )
      }
     

      if(i === steps) {
        arr.push(
          <React.Fragment key={i}>
            <div className={activeStep >= i ? 'step active' : 'step'}>{i}</div>
          </React.Fragment>
        )
      
      }
    }
    return arr;
  }
  return ( 
    <div className='step-counter'>
      <p className="step-counter__counter-heading">Step: {activeStep} of {steps}</p>
      <div className='steps-wrapper'>
        {renderSteps()}
      </div>
    </div>
   );
}
 
export default StepCounter;