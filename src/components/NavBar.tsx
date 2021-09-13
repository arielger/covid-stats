import * as React from "react";
import { Flex, Heading, Avatar, Button, Container } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { useAuth } from "../modules/auth";

function NavBar() {
  const {
    auth: { user },
    actions: { signOut },
  } = useAuth();

  return (
    <Flex w="100%" h="60px" backgroundColor="blue.800" color="white" px={4}>
      <Container
        maxW="container.md"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Link to="/countries">
          <Heading size="md">Covid stats</Heading>
        </Link>
        <Button onClick={signOut} variant="link" ml="auto" mr="4" color="white">
          Sign out
        </Button>
        <Avatar size="sm" src={user?.avatar} name={user?.name} />
      </Container>
    </Flex>
  );
}

export default NavBar;
