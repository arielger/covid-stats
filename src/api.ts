function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function handleErrors(response: any) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
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

export const fetchCountries = async () => {
  return fetch("https://api.covid19api.com/countries")
    .then(handleErrors)
    .then((response) => response.json());
};
