import { Flex, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import OTPForm from "../../components/Forms/Checker/OTPForm";
import NotaryAddressForm from "../../components/Forms/Notary/NotaryAddressForm";
import NotaryForm from "../../components/Forms/Notary/NotaryForm";
import { getUserStatus } from "../../utils/apiService";

const NHome = () => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("");
  const [Ncountry, setNcountry] = useState("");
  const [Nstate, setNstate] = useState("");
  const [loading, setLoading] = useState(true);

  const email = localStorage.getItem("email");
  useEffect(() => {
    const res = getUserStatus(email);
    res.then((data) => {
      console.log(data);
      const stat = data?.data[0][0];
      setStatus(stat);
      setNcountry(data?.data[0][2]);
      setNstate(data?.data[0][3]);
      setLoading(false);
    });
  }, []);
  return (
    <>
      {console.log(status)}
      {loading ? (
        <>
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
        </>
      ) : (
        <>
          {status === "created" ? (
            <NotaryAddressForm />
          ) : (
            <>
              {data ? (
                <Flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  margin={"auto"}
                  maxW={"1000px"}
                  my={10}
                >
                  <NotaryForm data={data} Ncountry={Ncountry} Nstate={Nstate} />
                </Flex>
              ) : (
                <OTPForm setData={setData} />
              )}
            </>
          )}
        </>
      )}

      {console.log(data)}
    </>
  );
};

export default NHome;
