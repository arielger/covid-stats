function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const logInWithEmail = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  await delay(2000);

  // Fake auth responses
  if (email === "test@test.com" && password === "test1234") {
    return Promise.resolve({
      email,
      username: "John Doe",
    });
  } else {
    return Promise.reject();
  }
};
