import React from "react";
import { Flex, Select } from "@chakra-ui/react";

const Filter: React.FC<any> = (props: any) => {
  return (
    <Flex flexDirection="row" px={5} w="70%">
      <Select
        placeholder="Filter by Region"
        value={props.filterState}
        onChange={props.onFilterChange}
        size="lg"
      >
        <option value="africa">Africa</option>
        <option value="americas">America</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="oceania">Oceania</option>
      </Select>
    </Flex>
  );
};

export default Filter;
