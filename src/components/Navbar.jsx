import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import {
  AddIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { Link } from "react-router-dom";

import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ color = "teal", type = "ONE-D" }) {
  let navigate = useNavigate();

  const user = localStorage.getItem("email");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const { colorMode, toggleColorMode } = useColorMode();
  const logout = () => {
    onClose();
    localStorage.removeItem("email");
    return navigate("/login");
  };
  return (
    <>
      <Box bg={color} px={4}>
        <Flex
          style={{ maxWidth: "1300px", margin: "auto" }}
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box color={"gray.100"}>
            <Text fontSize="2xl">{type}</Text>
          </Box>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <IconButton onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </IconButton>
              {!user && (
                <>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<HamburgerIcon />}
                      variant="outline"
                    />
                    <MenuList>
                      <Link to="/login">
                        <MenuItem>User</MenuItem>
                      </Link>
                      <Link to="/notary/login">
                        <MenuItem>Notary</MenuItem>
                      </Link>
                      <Link to="/admin/login">
                        <MenuItem>Admin</MenuItem>
                      </Link>
                      <Link to="/checker/login">
                        <MenuItem>Checker</MenuItem>
                      </Link>
                    </MenuList>
                  </Menu>
                </>
              )}
              {user && (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </MenuButton>

                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>{user || ""}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem onClick={onOpen}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Stack>
          </Flex>
        </Flex>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Logout
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={logout} ml={3}>
                  Logout
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </>
  );
}
