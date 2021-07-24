import React from "react";
import { Flex } from "@chakra-ui/react";

import Header from "../components/Header";

export default function Home() {
  return (
    <Flex
      flexDir="column"
      w="100vw"
      minH="100vh"
      backgroundColor="hsl(0, 0%, 98%)"
    >
      <Header />
    </Flex>
  );
}
