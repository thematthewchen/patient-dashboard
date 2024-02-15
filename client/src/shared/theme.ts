import { extendTheme } from "@chakra-ui/react";

const Theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "#E6FFFA"
      }
    })
  }
});

export default Theme;