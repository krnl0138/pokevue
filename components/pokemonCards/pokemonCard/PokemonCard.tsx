import { Card, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { selectModalStatus } from "../../../lib/redux/slices/modalSlice";
import { selectPokemonById } from "../../../lib/redux/slices/pokemonsSlice";
import { useAppSelector } from "../../../utils/hooks";
import { PokemonCardActions } from "./components/pokemonCardActions";
import { PokemonCardBody } from "./components/pokemonCardBody";
import { PokemonCardHeader } from "./components/pokemonCardHeader/PokemonCardHeader";
import { styleHoverShadow } from "../../../styles/styles";

type TPokemonCard = {
  id: number;
  inRecent?: boolean;
};

const cardStyle = {
  display: "flex",
  flexDirection: "column;",
  justifyContent: "space-between;",
  maxWidth: "385px",
  m: 1,
  styleHoverShadow,
};

const cardStyleModal = {
  ...cardStyle,
  position: "absolute",
  transform: " translate(-50%, -50%)",
  top: "50%",
  left: "50%",
};

// TODO forward ref problem for modal, need ref?
// export const PokemonCard = ({ id, inRecent }: TPokemonCard) => {
// eslint-disable-next-line react/display-name
export const PokemonCard = React.forwardRef(
  ({ id, inRecent }: TPokemonCard, ref) => {
    console.log(`render PokemonCard with id: ${id}`);
    const isModalOpen = useAppSelector(selectModalStatus);
    const pokemon = useAppSelector((state) => selectPokemonById(state, id));

    const [isHovered, setIsHovered] = useState(false);
    const toggleSetIsHovered = () => {
      setIsHovered(!isHovered);
    };

    const isFavourite = pokemon.isFavourite;
    const isRecent = pokemon.isRecent;
    const {
      name,
      avatarBig,
      avatarSmall,
      description,
      abilities,
      stats,
      captureRate,
      isBaby,
      isLegendary,
      isMythical,
    } = pokemon.pokemonData;

    return (
      <Card
        onMouseEnter={toggleSetIsHovered}
        onMouseLeave={toggleSetIsHovered}
        variant="outlined"
        sx={isModalOpen ? cardStyleModal : cardStyle}
      >
        {pokemon ? (
          <>
            <PokemonCardHeader
              name={name}
              id={id}
              avatarSmall={avatarSmall}
              captureRate={captureRate}
              isLegendary={isLegendary}
              isMythical={isMythical}
              isBaby={isBaby}
            />
            <PokemonCardBody
              abilities={abilities}
              stats={stats}
              description={description}
              avatarBig={avatarBig}
            />

            {!isModalOpen && (
              <PokemonCardActions
                id={id}
                inRecent={inRecent ? inRecent : !inRecent}
                isFavourite={isFavourite}
                isHovered={isHovered}
                isRecent={isRecent}
              />
            )}
          </>
        ) : (
          <CircularProgress />
        )}
      </Card>
    );
  }
);
