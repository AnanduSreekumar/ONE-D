import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Routes from "./routes/Routes.jsx";

const colors = {
  primary: "#008080",
  secondary: "#023047",
  tertiary: "#181116",
};

const fonts = {
  heading: `'Mukta'`,
  body: `'Mukta'`,
};

const styles = {
  global: (props) => ({
    "html, body": {
      backgroundColor: props.colorMode === "dark" ? "gray.900" : "gray.100",
    },
  }),
};

const theme = extendTheme({ colors, fonts, styles });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider
      theme={theme}
      toastOptions={{
        defaultOptions: { position: "top", duration: 9000, isClosable: true },
      }}
    >
      <Routes />
    </ChakraProvider>
  </React.StrictMode>
);
