import { COLORS, IMAGE_FILE_SIZE_BYTES, IMAGE_FILE_TYPES } from "./constants";

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

export const getCaptureColor = (rate: number) => {
  if (rate <= 50) return "error";
  if (rate > 50 && rate <= 180) return "warning";
  if (rate > 180) return "success";
  return "default";
};

// get random colors for abilities
export const getRandomColors = (arr: any) =>
  arr.map(() => COLORS[Math.floor(Math.random() * COLORS.length)]);

export const calculateAverageRating = (ratings: {
  [uid: string]: number;
}): number => {
  if (!ratings) return 0;
  const ratingsArr = Object.values(ratings);
  const sum = ratingsArr.reduce((acc, rating) => acc + rating, 0);
  const result = (sum / ratingsArr.length).toFixed(1);
  return Number(result);
};

export const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

export const removeDuplicates = (
  current: {
    [pokemonId: number]: number;
  },
  initial: number[]
) => {
  return Object.values(current).filter((id) => !initial?.includes(id));
};

export const isAvatarTypeImage = (file: File) => {
  return IMAGE_FILE_TYPES.includes(file.type);
};

export const isAvatarSizePassed = (file: File) => {
  return file.size < IMAGE_FILE_SIZE_BYTES;
};

export const composeObjFromNonEmpty = (data: {[key:string]: any}) => {
    const newUser = <typeof data>{};
    Object.entries(data).map(([key, value]) => {
      if (value) newUser[key as keyof typeof data] = value;
    });
    return newUser;
}
