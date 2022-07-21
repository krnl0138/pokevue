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

export const getStars = (rate: number) => {
  if (rate <= 255 && rate > 200) return 1;
  if (rate < 199 && rate > 150) return 2;
  if (rate < 149 && rate > 80) return 3;
  if (rate < 79 && rate > 40) return 4;
  if (rate < 39 && rate > 0) return 5;
  return 0;
};
