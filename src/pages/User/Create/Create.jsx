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
import Idform from "../../../components/Forms/User/forms/Idform";
import Fileform from "../../../components/Forms/User/forms/Fileform";
import EditForm from "../../../components/Forms/User/forms/EditForm";
import FinalForm from "../../../components/Forms/User/forms/Finalform";
import PaymentForm from "../../../components/Forms/User/forms/PaymentForm";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";
const steps = [
  { title: "First", description: "ID Info" },
  { title: "Second", description: "Edit Info" },
  { title: "Third", description: "Final" },
  { title: "Fourth", description: "Payment" },
];

const Create = () => {
  const navigate = useNavigate();
  let formData = new FormData();
  let user = localStorage.getItem("email");
  formData.append("email", user);
  const [status, setstatus] = useState("");
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  useEffect(() => {
    axios
      .post(
        "https://22e9-2601-646-a080-7c60-50bd-2cd8-1841-9296.ngrok-free.app/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          // window.location.reload();
          // window.location = "/files";
          console.log(response);
          setstatus(response.data.data[0][0]);
          console.log(status);
          if (status === "created") {
            setActiveStep(0);
          }
          if (status === "upload") {
            setActiveStep(1);
          }
          if (status === "data_updated") {
            setActiveStep(2);
          }
          if (
            status !== "created" &&
            status !== "upload" &&
            status !== "data_updated"
          ) {
            // return navigate("/dashboard");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const user = localStorage.getItem("email");
    if (!user) {
      navigate("/login");
    }
  }, []);

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
