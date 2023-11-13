const fetcher = async ({ url, method, body, json = true }) => {
  try {
    const res = await fetch(url, {
      method,
      body: body && JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (json) {
      const data = await res.json();
      return data;
    }
    // ===============================

  } catch (error: any) {
    console.error(error);
  }
};

export const signUp = async (user) => {
  return fetcher({
    url: '/api/sign-up',
    method: 'POST',
    body: user,
    // json: false,
  });
};

export const signIn = async (user) => {
  return fetcher({
    url: '/api/sign-in',
    method: 'POST',
    body: user,
    // json: false
  });
};

export const signOut = async (user) => {
  return fetcher({
    url: 'api/sign-out',
    method: 'POST',
    body: user,
    json: false,
  });
};
