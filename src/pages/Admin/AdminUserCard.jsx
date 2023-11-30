import { Box, Text, Image, Badge } from "@chakra-ui/react";

const AdminUserCard = ({ user }) => {
  return (
    <Box
      m={10}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="md"
      style={{
        backgroundColor: "#000000",
        opacity: 1,
        backgroundImage:
          "radial-gradient(#008080 2px, transparent 2px), radial-gradient(#008080 2px, #e5e5f7 2px)",
        backgroundSize: "80px 80px",
        backgroundPosition: "0 0,0px 40px",
      }}
      color="white"
    >
      <Image
        borderRadius={"500px"}
        src="https://via.placeholder.com/70"
        alt="name"
      />
      <Box mt={4}>
        <Text fontWeight="bold" fontSize="lg">
          Name
        </Text>
        <Text>"email"</Text>
        <Badge colorScheme="green" mt={2}>
          Driving
        </Badge>
        <Text mt={2}>ID: 5</Text>
      </Box>
    </Box>
  );
};

export default AdminUserCard;
