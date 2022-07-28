import {
  dbDeleteComment,
  dbGetComments,
  dbWriteComment,
} from "../../firebase/dbComments";
import {
  dbCreateRating,
  dbGetAverageRating,
  dbRemoveRating,
  dbUpdateRating,
} from "../../firebase/dbRatings";
import {
  dbGetOtherUser,
  dbGetUser,
  dbRemoveFavourite,
  dbUpdateUserData,
  dbWriteFavourite,
  dbWriteUserData,
} from "../../firebase/dbUsers";

// An agnostic db provider for Redux
// Usage: const db = dbProvider();
export const dbInterface = () => {
  const createUser = async (data: { username: string; email: string }) => {
    await dbWriteUserData(data);
  };

  const updateUser = async (data: {
    username: string;
    email: string;
    avatar: string;
  }) => {
    await dbUpdateUserData(data);
  };

  const writeFavourite = async (favourite: number) => {
    await dbWriteFavourite(favourite);
  };

  const removeFavourite = async (favourite: number) => {
    dbRemoveFavourite(favourite);
  };

  const getUser = async () => {
    await dbGetUser();
  };

  const createRating = async ({
    id: pokemonId,
    rating,
  }: {
    id: number;
    rating: number;
  }) => {
    await dbCreateRating({ pokemonId, rating });
  };

  const updateRating = async ({
    id: pokemonId,
    rating,
  }: {
    id: number;
    rating: number;
  }) => {
    await dbUpdateRating({ pokemonId, rating });
  };

  const removeRating = async ({ id: pokemonId }: { id: number }) => {
    dbRemoveRating({ pokemonId });
  };

  const getAverageRating = async ({ id: pokemonId }: { id: number }) => {
    await dbGetAverageRating({ pokemonId });
  };

  const getOtherUser = async (uid: string) => {
    console.log("from dbInterface: getOtherUser was called with uid: ", uid);
    await dbGetOtherUser(uid);
  };

  const writeComment = async (pokemonId: number, comment: string) => {
    await dbWriteComment({ pokemonId, comment });
  };

  const getComments = async (pokemonId: number) => {
    console.log("getComments in dbInterface was called with id:", pokemonId);
    await dbGetComments(pokemonId);
  };

  const deleteComment = async (pokemonId: number, commentId: string) => {
    await dbDeleteComment(pokemonId, commentId);
  };

  return {
    createUser,
    getUser,
    updateUser,
    writeFavourite,
    removeFavourite,
    createRating,
    updateRating,
    removeRating,
    getAverageRating,
    getOtherUser,
    writeComment,
    getComments,
    deleteComment,
  };
};
