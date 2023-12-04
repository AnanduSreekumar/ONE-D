import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminTable from "../../components/AdminTable";
import {
  Flex,
  Heading,
  Stack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import AdminStat from "../../components/AdminStat";
import { motion } from "framer-motion";

const AHome = () => {
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
            <AdminStat title={"Total Users"} value={345} color="red.300" />
            <AdminStat title={"Total Users"} value={345} color="blue.300" />
            <AdminStat title={"Total Users"} value={345} color="pink.300" />
          </Flex>
          <Heading mt={4}>Disputes</Heading>
          <AdminTable />
        </Stack>
      </motion.div>
    </>
  );
};

export default AHome;
