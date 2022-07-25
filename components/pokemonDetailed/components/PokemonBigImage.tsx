import { Container } from "@mui/material";
import Image from "next/image";
import { useContext } from "react";
import { PokemonDetailedContext } from "../pokemonDetailedContext";

export const PokemonBigImage = () => {
  const { pokemonData } = useContext(PokemonDetailedContext);
  const { avatarBig } = pokemonData;
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
