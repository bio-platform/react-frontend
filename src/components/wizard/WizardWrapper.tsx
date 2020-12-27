import { Stepper, Step, StepLabel } from '@material-ui/core';
import React, { useState } from 'react';

export const WizardWrapper = () => {
    const [activeStep, setActiveStep] = useState(0);


    return (
        <Stepper activeStep={activeStep}>
            <Step key={'1'}>
                <StepLabel>step 1</StepLabel>
            </Step>
            <Step key={'2'}>
                <StepLabel>step 2</StepLabel>
            </Step>
        </Stepper>
    )
}