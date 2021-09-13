import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Container,
  Heading,
  Box,
} from "@chakra-ui/react";

import { useAuth } from "../modules/auth";

import { validateEmail } from "../utils";

export const Login = () => {
  const {
    actions: { signIn },
  } = useAuth();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleInputChange =
    (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((formState) => ({
        ...formState,
        [key]: event.target.value,
      }));
    };

  const isEmailValid = formState.email && validateEmail(formState.email);
  const isPasswordValid = formState.password && formState.password.length > 6;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isEmailValid && isPasswordValid) signIn.mutate(formState);
  };

  return (
    <Box pt="16" backgroundColor="gray.100" minH="100vh">
      <Heading mb="8" textAlign="center">
        Covid stats
      </Heading>
      <Container backgroundColor="white" borderRadius="6" p="8" shadow="base">
        <form onSubmit={handleSubmit}>
          <FormControl isInvalid={!isEmailValid} isRequired id="email" mb="4">
            <FormLabel>Email</FormLabel>
            <Input
              required
              onChange={handleInputChange("email")}
              type="email"
            />
            <FormErrorMessage>
              Please, enter a valid email address
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={!isPasswordValid}
            isRequired
            id="password"
            mb="8"
          >
            <FormLabel>Password</FormLabel>
            <Input
              required
              onChange={handleInputChange("password")}
              type="password"
            />
            <FormErrorMessage>
              Please, enter a password with at least 6 characters
            </FormErrorMessage>
          </FormControl>
          <Button
            colorScheme="blue"
            w="100%"
            size="lg"
            type="submit"
            isDisabled={!isEmailValid || !isPasswordValid}
            isLoading={signIn.isLoading}
          >
            Sign in
          </Button>
        </form>
      </Container>
    </Box>
  );
};
