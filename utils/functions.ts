export const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (res.ok) {
    return await res.json();
  }
  return Promise.reject(Error);
};

export const createRandomIds = (limit: number) => {
  const arr = [];
  for (let i = 0; i < limit; i++) {
    arr[i] = Math.floor(Math.random() * 905);
  }
  return arr;
};
