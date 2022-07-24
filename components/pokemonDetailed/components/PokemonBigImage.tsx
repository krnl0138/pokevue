import { Container } from "@mui/material";
import { TPokemon } from "../../../utils/types";
import Image from "next/image";

type TPokemonBigImage = Pick<TPokemon["pokemonData"], "avatarBig">;
export const PokemonBigImage = ({ avatarBig }: TPokemonBigImage) => {
  return (
    <Container
      sx={{
        borderRadius: "50%",
        textAlign: "center",
        margin: 0,
        padding: 0,
        width: "auto",
      }}
    >
      <Image src={avatarBig} alt={"Pokemon avatar"} width={250} height={250} />
    </Container>
  );
};
