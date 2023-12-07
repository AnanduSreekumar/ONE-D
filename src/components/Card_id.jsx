import { Badge, Box, Flex, Image, Text } from "@chakra-ui/react";
import ReactCountryFlag from "react-country-flag";

const Card_id = ({ data }) => {
  console.log(data);
  return (
    <Box
      m={10}
      w={"450px"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="md"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1000' height='800' preserveAspectRatio='none' viewBox='0 0 500 300'%3e%3cg mask='url(%26quot%3b%23SvgjsMask2520%26quot%3b)' fill='none'%3e%3crect width='500' height='300' x='0' y='0' fill='url(%26quot%3b%23SvgjsLinearGradient2521%26quot%3b)'%3e%3c/rect%3e%3cpath d='M-72.7 111.38C-16.09 116.54 30.51 223.74 118.55 234.38 206.59 245.02 182.65 314.06 214.18 320' stroke='rgba(17%2c 157%2c 111%2c 0.5)' stroke-width='2'%3e%3c/path%3e%3cpath d='M-35.19 255.97C1.4 256.29 35.54 293.47 106.27 293.47 177 293.47 176.59 255.93 247.73 255.97 318.87 256.01 349.97 322.4 389.19 324.15' stroke='rgba(17%2c 157%2c 111%2c 0.5)' stroke-width='2'%3e%3c/path%3e%3cpath d='M-94.49 36.9C-34.15 38.39-0.64 113.44 130.73 123.9 262.1 134.36 283.72 299.1 355.95 310.72' stroke='rgba(17%2c 157%2c 111%2c 0.5)' stroke-width='2'%3e%3c/path%3e%3cpath d='M-13.76 74.99C22.66 75.31 56.63 112.49 127.01 112.49 197.4 112.49 180.47 63.64 267.79 74.99 355.1 86.34 347.09 287.51 408.56 324.08' stroke='rgba(17%2c 157%2c 111%2c 0.5)' stroke-width='2'%3e%3c/path%3e%3cpath d='M-0.66 38.36C56.55 38.98 89.84 90.13 219.37 101.36 348.9 112.59 364.46 298.89 439.4 315.55' stroke='rgba(17%2c 157%2c 111%2c 0.5)' stroke-width='2'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask2520'%3e%3crect width='500' height='300' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='90%25' y1='-16.67%25' x2='10%25' y2='116.67%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient2521'%3e%3cstop stop-color='rgba(255%2c 221%2c 136%2c 1)' offset='0.02'%3e%3c/stop%3e%3cstop stop-color='rgba(167%2c 63%2c 160%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e\")",
        backgroundPosition: "center",
      }}
      color={"#FDEDCE"}
    >
      <Badge fontSize={"xl"} colorScheme="black" mb={2}>
        {data[1]}
      </Badge>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Image
          height={"100px"}
          width={"100px"}
          objectFit={"cover"}
          borderRadius={"500px"}
          src="https://media.licdn.com/dms/image/D5635AQGUTZEXZFYNxg/profile-framedphoto-shrink_800_800/0/1698697437052?e=1702000800&v=beta&t=CYwukOX7aWw8Z5OSflgwIgFA4XupuBAQr325D8OlYjI"
          alt="name"
        />
        <Flex mx={"5"} justifyContent={"space-between"} direction={"column"}>
          <Text fontWeight="bold" fontSize="lg">
            Name: {data[2]} {data[3]}
          </Text>
          <Text fontWeight="normal" fontSize="lg">
            Gender: {data[4]}
          </Text>
          <Text fontWeight="normal" fontSize="lg">
            Age: {data[6]}
          </Text>
          <Text fontWeight="normal" fontSize="lg">
            Expiry: {data[14]}
          </Text>
        </Flex>
        <Flex
          direction={"column"}
          flex="1"
          justifyContent={"space-between"}
          alignItems={"end"}
        >
          <ReactCountryFlag
            className="emojiFlag"
            countryCode="US"
            style={{
              fontSize: "2em",
            }}
            aria-label="United States"
          />
          <ReactCountryFlag
            className="emojiFlag"
            countryCode="IN"
            style={{
              fontSize: "2em",
            }}
            aria-label="United States"
          />
        </Flex>
      </Flex>
      <Box mt={4}>
        <Text fontWeight="bold" fontSize="lg">
          Address
        </Text>
        <Text>{data[5]} </Text>
        <Badge colorScheme="green" mt={2}>
          Passport
        </Badge>
      </Box>
    </Box>
  );
};

export default Card_id;
