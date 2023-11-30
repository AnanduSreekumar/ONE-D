import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Text,
} from "@chakra-ui/react";

const AdminStat = ({ title, value, color }) => {
  return (
    <Box
      maxW="sm"
      m={"4"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="4"
      boxShadow="base"
      bg={color}
      height={"200px"}
      width={"200px"}
    >
      <Flex
        height={"full"}
        alignItems={"center"}
        direction={"column"}
        justifyContent={"center"}
      >
        <Text fontSize="md" fontWeight="bold">
          {title}
        </Text>
        <CircularProgress
          size={"100px"}
          thickness="4px"
          value={value}
          color={"teal"}
        >
          <CircularProgressLabel>{value}</CircularProgressLabel>
        </CircularProgress>
      </Flex>
    </Box>
  );
};

export default AdminStat;
