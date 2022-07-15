export const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (res.ok) {
    return await res.json();
  }
  return Promise.reject(Error);
};
