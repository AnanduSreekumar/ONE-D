import React, { useEffect, useState } from "react";
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
import EditForm from "./forms/Editform";
import FinalForm from "./forms/Finalform";
import PaymentForm from "./forms/Paymentform";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";

const steps = [
  { title: "First", description: "ID Info" },
  { title: "Second", description: "Edit Info" },
  { title: "Third", description: "Final" },
  { title: "Fourth", description: "Payment" },
];

const Create = () => {
  const navigate = useNavigate();

  const [inputList, setInputList] = useState([<Idform />]);

  const onAddBtnClick = (event) => {
    const newInput = Date.now();
    setInputList((v) => [...v, newInput]);
  };
  useEffect(() => {
    const user = localStorage.getItem("email");
    if (!user) {
      navigate("/login");
    }
  }, []);
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div style={{ margin: "7rem" }}>
        <Grid
          style={{ margin: "auto" }}
          templateColumns="repeat(5, 1fr)"
          gap={6}
        >
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

          <GridItem marginLeft={"5rem"} colSpan={3}>
            <Card>
              <CardBody>
                {activeStep == 0 && (
                  <Idform step={activeStep} setActiveStep={setActiveStep} />
                )}
                {activeStep == 1 && (
                  <EditForm step={activeStep} setActiveStep={setActiveStep} />
                )}
                {activeStep == 2 && (
                  <FinalForm step={activeStep} setActiveStep={setActiveStep} />
                )}
                {activeStep == 3 && (
                  <PaymentForm
                    step={activeStep}
                    setActiveStep={setActiveStep}
                  />
                )}
                {/* <Stack margin={5} spacing={6} direction={["column", "row"]}>
                  <Button
                    rightIcon={<AddIcon />}
                    colorScheme="teal"
                    variant="outline"
                    w={"full"}
                    mx={"5"}
                    onClick={onAddBtnClick}
                  >
                    Add another file
                  </Button>
                </Stack> */}

                <Stack margin={5} spacing={6} direction={["column", "row"]}>
                  <Button
                    w="50%"
                    onClick={() =>
                      setActiveStep(
                        activeStep > 0 ? activeStep - 1 : activeStep
                      )
                    }
                  >
                    Back
                  </Button>
                  <Button
                    colorScheme="teal"
                    w="50%"
                    onClick={() =>
                      setActiveStep(
                        activeStep < 4 ? activeStep + 1 : activeStep
                      )
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
    </motion.div>
  );
};

export default Create;
