import React, { useEffect, useRef } from "react";
import { Flex, Text } from "@chakra-ui/react";
import debounce from "lodash/debounce";
import Header from "../components/Header";
import Search from "../components/Search";
import Filter from "../components/Filter";

export default function Home() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [countries, setCountries] = React.useState([]);
  const [filter, setFilter] = React.useState("");
  const [search, setSearch] = React.useState("");
  const initialData = useRef([]);

  function changeFilter(e) {
    setFilter(e.target.value);
    console.log(e.target.value);
  }

  function changeSearch(e) {
    setSearch(e.target.value);
    setError(null);
    debouncedSearch(e.target.value);
    e.target.value === "" || e.target.value === " "
      ? setCountries(initialData.current)
      : null;
  }

  function getCountriesBySearch(query) {
    console.log("Searching...");

    fetch(
      `https://restcountries.eu/rest/v2/name/${query}?fullText=false&fields=name;population;region;capital;flag`
    )
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          setError(
            response.status === 404
              ? "Not found"
              : response.status === 500
              ? "Internal server error"
              : "Something went wrong"
          );
          throw Error(response.statusText);
        }
      })
      .then((jsonResponse) => {
        const newCountries = jsonResponse.slice(0, 20);
        setCountries(newCountries);
      })
      .catch((error) => {
        // Handle the error
        console.log(error);
      });
  }

  const debouncedSearch = useRef(
    debounce((nextValue) => getCountriesBySearch(nextValue), 1000)
  ).current;

  useEffect(() => {
    function getCountries() {
      fetch(
        "https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag"
      )
        .then((response) => {
          if (response.status >= 200 && response.status <= 299) {
            return response.json();
          } else {
            setError(
              response.status === 404
                ? "Not found"
                : response.status === 500
                ? "Internal server error"
                : "Something went wrong"
            );
            throw Error(response.statusText);
          }
        })
        .then((jsonResponse) => {
          console.log(typeof jsonResponse);
          const countries = jsonResponse.slice(0, 10);
          setCountries(countries);
          setLoading(false);
          initialData.current = countries;
        })
        .catch((error) => {
          // Handle the error
          console.log(error);
        });
    }
    setError(null);
    getCountries();
  }, []);

  useEffect(() => {
    filter === "" || filter === " " ? null : getCountriesByFilter();
    setError(null);
    function getCountriesByFilter() {
      fetch(
        `https://restcountries.eu/rest/v2/region/${filter}?fields=name;population;region;capital;flag`
      )
        .then((response) => {
          if (response.status >= 200 && response.status <= 299) {
            return response.json();
          } else {
            setError(
              response.status === 404
                ? "Not found"
                : response.status === 500
                ? "Internal server error"
                : "Something went wrong"
            );
            throw Error(response.statusText);
          }
        })
        .then((jsonResponse) => {
          setLoading(false);
          setCountries(jsonResponse);
        })
        .catch((error) => {
          // Handle the error
          console.log(error);
        });
    }
  }, [filter]);

  if (error !== null) {
    return (
      <Flex
        flexDir="column"
        w="100vw"
        minH="100vh"
        backgroundColor="hsl(0, 0%, 98%)"
      >
        <Header />
        <Search searchState={search} onSearchChange={changeSearch} />
        <Filter filterState={filter} onFilterChange={changeFilter} />
        <Flex w="100%" alignItems="center">
          <Text p={5}>{error}</Text>
        </Flex>
      </Flex>
    );
  } else if (loading === true) {
    return (
      <Flex
        flexDir="column"
        w="100vw"
        minH="100vh"
        backgroundColor="hsl(0, 0%, 98%)"
      >
        <Header />
        <Search searchState={search} onSearchChange={changeSearch} />
        <Filter filterState={filter} onFilterChange={changeFilter} />
        <Flex w="100%" alignItems="center">
          <Text p={5}>Loading...</Text>
        </Flex>
      </Flex>
    );
  } else {
    return (
      <Flex
        flexDir="column"
        w="100vw"
        minH="100vh"
        backgroundColor="hsl(0, 0%, 98%)"
      >
        <Header />
        <Search searchState={search} onSearchChange={changeSearch} />
        <Filter filterState={filter} onFilterChange={changeFilter} />
        {countries.map((country) => (
          <Flex key={country.name} flexDirection="column" p={5} w="100%">
            <Text>
              {country.name}
              <br />
              {country.capital}
              <br />
              {country.population}
              <br />
              {country.region}
            </Text>
          </Flex>
        ))}
      </Flex>
    );
  }
}
