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
  if (email === "john.doe@test.com" && password === "test1234") {
    return Promise.resolve({
      email,
      name: "John Doe",
      avatar: "https://uifaces.co/our-content/donated/n4Ngwvi7.jpg",
    });
  } else {
    return Promise.reject();
  }
};
