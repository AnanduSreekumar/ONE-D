import { Box, Flex, Text, Avatar, Badge, Heading } from "@chakra-ui/react";
import Card_id from "../../components/Card_id";
import AdminTable from "../../components/AdminTable";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AdminUserDetail = () => {
  const navigate = useNavigate();

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
      <Box
        m={"30px auto"}
        maxW={"1000px"}
        p={4}
        shadow="md"
        borderWidth="1px"
        borderRadius="md"
      >
        <Flex justifyContent={"space-between"} alignItems="center" mb={4}>
          <Flex>
            <Avatar
              size="md"
              name="John Doe"
              src="https://www.catholicsingles.com/wp-content/uploads/2020/06/blog-header-3.png"
              mr={4}
            />
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                John Doe
              </Text>
              <Text fontSize="sm" color="gray.500">
                Express User
              </Text>
            </Box>
          </Flex>
          <Box>
            <Text fontSize="md" fontWeight="bold">
              Email:
            </Text>
            <Text fontSize="sm">johndoe@example.com</Text>
          </Box>
          <Flex
            direction={"column"}
            alignItems={"start"}
            justifyContent={"center"}
          >
            <Text fontSize="md" fontWeight="bold">
              Type:
            </Text>
            <Badge colorScheme="blue" variant="subtle" fontSize="sm">
              Express
            </Badge>
          </Flex>
          {/* Add other details here */}
          <Box>
            <Text fontSize="md" fontWeight="bold">
              Other Details:
            </Text>
            <Text fontSize="sm">Add other details here</Text>
          </Box>
        </Flex>
        <Flex justifyContent={"center"} alignItems="center">
          <Card_id />
        </Flex>
        <Heading mt={4} ml={4}>
          Disputes
        </Heading>
        <Flex justifyContent={"center"} px={"4"} alignItems="center" mb={4}>
          <AdminTable />
        </Flex>
      </Box>
    </motion.div>
  );
};

export default AdminUserDetail;
