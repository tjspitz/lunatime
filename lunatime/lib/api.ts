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
  } catch (error: any) {
    console.error(error);
  }
};

export const signUp = async (user) => {
  return fetcher({
    url: '/api/sign-up',
    method: 'POST',
    body: user,
    json: false,
  });
};

export const signIn = async (user) => {
  return fetcher({
    url: '/api/sign-in',
    method: 'POST',
    body: user,
    json: false
  });
};

export const signOut = async (user) => {
  return fetcher({
    url: '/api/sign-out',
    method: 'POST',
    body: user,
    json: false,
  });
};

export const addCycle = async(newCycle) => {
  return fetcher({
    url: '/api/calendar',
    method: 'POST',
    body: newCycle,
    json: false,
  });
};

export const deleteCycle = async(cycleId) => {
  return fetcher({
    url: '/api/calendar',
    method: 'DELETE',
    body: cycleId,
    json: true,
  });
};

// no need for its own route(?)
// export const addCycle = async(newCycle) => {
//   return fetcher({
//     url: '/api/sign-up/new-user',
//     method: 'POST',
//     body: newCycle,
//     json: false,
//   });
// };

export const patchProfile = async(update) => {
  return fetcher({
    url: '/api/profile',
    method: 'PATCH',
    body: update,
    json: true,
  });
};
