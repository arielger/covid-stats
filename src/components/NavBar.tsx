import * as React from "react";
import { Flex, Heading, Avatar, Button } from "@chakra-ui/react";

import { useAuth } from "../modules/auth";

function NavBar() {
  const {
    auth: { user },
    actions: { signOut },
  } = useAuth();

  console.log("user", user);

  return (
    <Flex
      w="100%"
      h="60px"
      justifyContent="space-between"
      alignItems="center"
      backgroundColor="blue.800"
      color="white"
      px={4}
    >
      <Heading size="md">Covid stats</Heading>
      <Button onClick={signOut} variant="link" ml="auto" mr="4" color="white">
        Sign out
      </Button>
      <Avatar size="sm" src={user?.avatar} name={user?.name} />
    </Flex>
  );
}

export default NavBar;
