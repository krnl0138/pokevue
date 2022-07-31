import {
  child,
  getDatabase,
  limitToLast,
  onValue,
  orderByKey,
  push,
  query,
  ref,
  remove,
  set,
} from "firebase/database";
import app from "./index";
import store from "../lib/redux";
import { addPokemonComments } from "../lib/redux/slices/pokemonsSlice";
import { TComment, TUser } from "../utils/types";

type TCommentResponse = { [uid: string]: string };

const db = getDatabase(app);

// db/comments/[pokemonId]/   [pushKey]:{[uid]:'comment'}

const commentsRef = (pokemonId: number) => ref(db, `comments/${pokemonId}`);
const commentsByPushRef = (pokemonId: number, pushKey: string) =>
  ref(db, `comments/${pokemonId}/${pushKey}`);

type TdbWriteComment = {
  pokemonId: number;
  comment: string;
};
export const dbWriteComment = async (
  uid: TUser["uid"],
  { pokemonId, comment }: TdbWriteComment
) => {
  console.log("dbWriteComment was called with: ", pokemonId, comment);
  // push '{uid:comment}' to /comments/[pokemonId]/[newCommentKey]:{uid:comment}
  const newCommentKey = push(child(ref(db), `commments/${pokemonId}`)).key;
  if (!newCommentKey)
    throw new Error(`An error occured in dbWriteComment while creating a key`);
  try {
    await set(commentsByPushRef(pokemonId, newCommentKey), {
      [uid]: comment,
    });
  } catch (error) {
    throw new Error(`An error occured in dbWriteComment: ${error}`);
  }
};

export const dbGetComments = async (pokemonId: number) => {
  console.log("dbGetComments was called with: ", pokemonId);
  const pokemonCommentsRef = query(
    commentsRef(pokemonId),
    orderByKey(),
    limitToLast(5)
  );
  onValue(pokemonCommentsRef, (snapshot) => {
    console.log("A listener on dbGetComments was CALLED");
    const value: TCommentResponse = snapshot.val();
    const comments: TComment[] = [];
    if (!value) {
      store.dispatch(addPokemonComments({ pokemonId, comments }));
      return;
    }

    Object.entries(value)
      .reverse()
      .forEach(([commentId, commentBody]) =>
        Object.entries(commentBody).forEach(([uid, comment]) => {
          const mapped = {
            commentId: commentId,
            uid: uid,
            comment: comment,
          };
          comments.push(mapped);
        })
      );
    console.log("dispatching comments: ", comments);
    store.dispatch(addPokemonComments({ pokemonId, comments }));
  });
};

export const dbDeleteComment = async (pokemonId: number, commentId: string) => {
  console.log("dbDeleteComment was called with: ", pokemonId, commentId);
  await remove(commentsByPushRef(pokemonId, commentId));
};
