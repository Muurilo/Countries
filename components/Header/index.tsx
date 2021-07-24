import React from "react";
import { Flex, Heading, Spacer, Text, Box } from "@chakra-ui/react";
import { FiMoon } from "react-icons/fi";

const Header: React.FC = () => {
  return (
    <Flex
      flexDir="row"
      w="100%"
      alignItems="center"
      justifyContent="flex-start"
      h="10vh"
      backgroundColor="white"
      px={5}
      boxShadow="md"
    >
      <Heading
        as="h1"
        size="sm"
        w="60%"
        fontWeight="extrabold"
        color="hsl(200, 15%, 8%)"
      >
        Where in the world?
      </Heading>
      <Spacer />
      <Flex flexDir="row" w="40%" alignItems="center" justifyContent="flex-end">
        <Box px={2}>
          <FiMoon size={20} color="hsl(200, 15%, 8%)" />
        </Box>
        <Text fontSize="sm" fontWeight="semibold" color="hsl(200, 15%, 8%)">
          Dark Mode
        </Text>
      </Flex>
    </Flex>
  );
};

export default Header;
