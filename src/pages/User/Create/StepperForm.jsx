import {
  Box,
  Card,
  CardBody,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
} from "@chakra-ui/react";
import React from "react";

const StepperForm = ({ steps, activeStep }) => {
  return (
    <>
      <Card>
        <CardBody>
          <Stepper
            colorScheme="teal"
            index={activeStep}
            orientation="vertical"
            height="400px"
            gap="0"
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box flexShrink="0">
                  <StepTitle>{step.description}</StepTitle>
                  <StepDescription>{step.title}</StepDescription>
                </Box>

                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </CardBody>
      </Card>
    </>
  );
};

export default StepperForm;
