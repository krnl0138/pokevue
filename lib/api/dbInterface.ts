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
import { TUser } from "../../utils/types";

// An agnostic db provider for Redux
// Usage: const db = dbProvider();
export const dbInterface = () => {
  const createUser = async (
    uid: TUser["uid"],
    data: { username: string; email: string }
  ) => {
    await dbWriteUserData(uid, data);
  };

  const updateUser = async (
    uid: TUser["uid"],
    data: {
      username: string;
      email: string;
      avatar: string;
    }
  ) => {
    await dbUpdateUserData(uid, data);
  };

  const writeFavourite = async (uid: TUser["uid"], favourite: number) => {
    await dbWriteFavourite(uid, favourite);
  };

  const removeFavourite = async (uid: TUser["uid"], favourite: number) => {
    dbRemoveFavourite(uid, favourite);
  };

  const getUser = async (uid: string) => {
    await dbGetUser(uid);
  };

  // TODO args should be rewritten properly
  const createRating = async (
    uid: TUser["uid"],
    {
      id: pokemonId,
      rating,
    }: {
      id: number;
      rating: number;
    }
  ) => {
    await dbCreateRating(uid, { pokemonId, rating });
  };

  // TODO args should be rewritten properly
  const updateRating = async (
    uid: TUser["uid"],
    {
      id: pokemonId,
      rating,
    }: {
      id: number;
      rating: number;
    }
  ) => {
    await dbUpdateRating(uid, { pokemonId, rating });
  };

  // TODO args should be rewritten properly
  const removeRating = async (
    uid: TUser["uid"],
    { id: pokemonId }: { id: number }
  ) => {
    dbRemoveRating(uid, { pokemonId });
  };

  const getAverageRating = async (id: number) => {
    await dbGetAverageRating(id);
  };

  const getOtherUser = async (uid: string) => {
    console.log("from dbInterface: getOtherUser was called with uid: ", uid);
    await dbGetOtherUser(uid);
  };

  const writeComment = async (
    uid: TUser["uid"],
    pokemonId: number,
    comment: string
  ) => {
    await dbWriteComment(uid, { pokemonId, comment });
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
