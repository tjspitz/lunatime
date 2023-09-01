const fetcher = async ({ url, method, body, json = true }) => {
  let data;
  try {
    const res = await fetch(url, {
      method,
      body: body && JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    data = await res.json();
    return data.data;
  } catch (error: any) {
    console.error(error);
  }
};

export const signUp = async (user) => {
  return fetcher({
    url: '/api/sign-up',
    method: 'post',
    body: user,
  });
};

export const signIn = async (user) => {
  return fetcher({
    url: '/api/sign-in',
    method: 'post',
    body: user,
  });
};
