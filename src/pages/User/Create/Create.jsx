import {
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Spinner,
  useSteps,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditForm from "../../../components/Forms/User/forms/Editform";
import FinalForm from "../../../components/Forms/User/forms/Finalform";
import Idform from "../../../components/Forms/User/forms/Idform";
import PaymentForm from "../../../components/Forms/User/forms/Paymentform";
import { getUserStatus } from "../../../utils/apiService";
import StepperForm from "./StepperForm";

const steps = [
  { title: "First", description: "ID Info" },
  { title: "Second", description: "Edit Info" },
  { title: "Third", description: "Final" },
  { title: "Fourth", description: "Payment" },
];

const Create = () => {
  const navigate = useNavigate();
  let user = localStorage.getItem("email");
  const [textData, setTextData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  useEffect(() => {
    const res = getUserStatus(user);
    res.then((data) => {
      console.log(data);
      const stat = data?.data[0][0];
      if (stat === "created") {
        setActiveStep(0);
        setLoading(false);
      }
      if (stat === "upload") {
        setActiveStep(1);
        setLoading(false);
      }
      if (stat === "data_updated") {
        setActiveStep(2);
        setLoading(false);
      }
      if (stat === "payment") {
        setActiveStep(3);
        setLoading(false);
      } else {
        navigate("/dashboard");
        setLoading(false);
      }
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
            <StepperForm steps={steps} activeStep={activeStep} />
          </GridItem>

          <GridItem marginLeft={"5rem"} colSpan={3}>
            <Card>
              <CardBody>
                {loading ? (
                  <Flex
                    justifyContent={"center"}
                    alignItems={"center"}
                    height={"400px"}
                  >
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="teal.500"
                      size="xl"
                    />
                  </Flex>
                ) : (
                  <>
                    {activeStep == 0 && (
                      <Idform
                        step={activeStep}
                        setActiveStep={setActiveStep}
                        setTextData={setTextData}
                      />
                    )}
                    {activeStep == 1 && (
                      <EditForm
                        step={activeStep}
                        setActiveStep={setActiveStep}
                        textData={textData}
                      />
                    )}
                    {activeStep == 2 && (
                      <FinalForm
                        step={activeStep}
                        setActiveStep={setActiveStep}
                      />
                    )}
                    {activeStep == 3 && (
                      <PaymentForm
                        step={activeStep}
                        setActiveStep={setActiveStep}
                      />
                    )}
                  </>
                )}

                {/* <Stack margin={5} spacing={6} direction={["column", "row"]}>
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
                </Stack> */}
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </div>
    </motion.div>
  );
};

export default Create;
