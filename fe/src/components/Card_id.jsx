import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { BsArrowUpRight, BsHeartFill, BsHeart } from "react-icons/bs";
import { CheckIcon, CloseIcon, SmallCloseIcon } from "@chakra-ui/icons";

export default function Card_id() {
  const [liked, setLiked] = useState(false);

  return (
    <Center py={3}>
      <Box
        w="xs"
        rounded={"sm"}
        my={3}
        mx={[0, 5]}
        overflow={"hidden"}
        bg="gray.200"
        border={"1px"}
        borderColor="black"
        boxShadow={useColorModeValue("6px 6px 0 teal", "6px 6px 0 cyan")}
      >
        <Box p={4}>
          <Box
            bg={liked ? "teal" : "red.600"}
            display={"inline-block"}
            px={2}
            py={1}
            color="white"
            mb={2}
          >
            {liked ? (
              <Text fontSize={"xs"} fontWeight="medium">
                <CheckIcon /> Verfied
              </Text>
            ) : (
              <Text fontSize={"xs"} fontWeight="medium">
                <SmallCloseIcon /> Not verified
              </Text>
            )}
          </Box>
          <Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
            Driving ID
          </Heading>
          <Text color={"gray.500"} noOfLines={2}>
            In this post, we will give an overview of what is new in React 18,
            and what it means for the future.
          </Text>
        </Box>
        <HStack borderTop={"1px"} color="black">
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            cursor={"pointer"}
            w="full"
          >
            <Text fontSize={"md"} fontWeight={"semibold"}>
              View more
            </Text>
            <BsArrowUpRight />
          </Flex>
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            borderLeft={"1px"}
            cursor="pointer"
            onClick={() => setLiked(!liked)}
          >
            {liked ? (
              <BsHeartFill fill="red" fontSize={"24px"} />
            ) : (
              <BsHeart fontSize={"24px"} />
            )}
          </Flex>
        </HStack>
      </Box>
    </Center>
  );
}
