import React from "react";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

const Search: React.FC<any> = (props: any) => {
  return (
    <Flex flexDirection="row" p={5} w="100%">
      <InputGroup size="md">
        <InputLeftElement pointerEvents="none">
          <FiSearch color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          value={props.searchState}
          onChange={props.onSearchChange}
          placeholder="Search for a country..."
        />
      </InputGroup>
    </Flex>
  );
};

export default Search;
