import { Flex, Heading, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import AdminStat from "../../components/AdminStat";
import LogTable from "../../components/LogTable";
import { getAdminStats } from "../../utils/apiService";

const AHome = () => {
  const email = localStorage.getItem("email");
  const role = "admin";
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAdminStats(email, role);
        console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Stack w={"1000px"} m={"auto"} p={"20"}>
          <Flex
            m={"auto"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <AdminStat
              title={"Total Users"}
              value={data?.total_users}
              color="red.300"
            />
            <AdminStat
              title={"Total Notaries"}
              value={data?.total_notary}
              color="blue.300"
            />
            <AdminStat
              title={"Total Checkers"}
              value={data?.total_checker}
              color="pink.300"
            />
          </Flex>
          <Heading mt={4}>Disputes</Heading>
          <LogTable color={"blue"} email={email} role="admin" />
        </Stack>
      </motion.div>
    </>
  );
};

export default AHome;
