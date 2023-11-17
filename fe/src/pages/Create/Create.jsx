import React, { useState } from "react";
import Flow from "./Flow";
import {
  Card,
  CardBody,
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Grid,
  GridItem,
  Button,
  Stack,
} from "@chakra-ui/react";
import Idform from "./forms/Idform";
import Fileform from "./forms/Fileform";

const steps = [
  { title: "First", description: "ID Info" },
  { title: "Second", description: "File upload" },
  { title: "Third", description: "Edit Info" },
  { title: "Fourth", description: "Final" },
];

const Create = () => {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  return (
    <div style={{ margin: "7rem" }}>
      <Grid style={{ margin: "auto" }} templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem colSpan={1}>
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
        </GridItem>

        <GridItem marginLeft={"10rem"} colSpan={3}>
          <Card>
            <CardBody>
              {activeStep == 0 && <Idform />}
              {activeStep == 1 && <Fileform />}
              {activeStep == 2 && <Fileform />}
              {activeStep == 3 && <Fileform />}
              {activeStep == 4 && <Fileform />}
              <Stack margin={5} spacing={6} direction={["column", "row"]}>
                <Button
                  w="50%"
                  onClick={() =>
                    setActiveStep(activeStep > 0 ? activeStep - 1 : activeStep)
                  }
                >
                  Back
                </Button>
                <Button
                  colorScheme="teal"
                  w="50%"
                  onClick={() =>
                    setActiveStep(activeStep < 4 ? activeStep + 1 : activeStep)
                  }
                >
                  Next
                </Button>
              </Stack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </div>
  );
};

export default Create;
