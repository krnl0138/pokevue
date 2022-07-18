import Link from "next/link";
import { PROJECT_URLS as urls } from "../../utils/constants";

export const NoFavourites = () => {
  return (
    <p>
      You have no favourite pokemons.{" "}
      <Link href={urls.home}>Find and add one!</Link>{" "}
    </p>
  );
};
