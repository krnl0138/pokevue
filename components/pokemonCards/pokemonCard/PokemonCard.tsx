import { Box, Card, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { selectPokemonById } from "../../../lib/redux/slices/pokemonsSlice";
import { useAppSelector } from "../../../utils/hooks";
import { PokemonCardActions } from "./components/pokemonCardActions";
import { PokemonCardBody } from "./components/pokemonCardBody";
import { PokemonCardHeader } from "./components/pokemonCardHeader/PokemonCardHeader";
import { PokemonCardContext } from "./pokemonCardContext";

const cardStyle = {
  display: "flex",
  flexDirection: "column;",
  justifyContent: "space-between;",
  maxWidth: "385px",
  m: 1,
  boxShadow: "rgb(0 0 0 / 24%) 0px 3px 8px",
  ":hover": {
    transform: "translateY(-5px)",
    filter: "contrast(0.98)",
    boxShadow: "rgb(0 0 0 / 24%) 0px 5px 12px",
  },
  transition: "transform .2s, boxShadow .2s",
};

const cardStyleModal = {
  display: "flex",
  flexDirection: "column;",
  justifyContent: "space-between;",
  maxWidth: "385px",
};

type TPokemonCard = {
  id: number;
  inRecent?: boolean;
  inModal?: boolean;
};

export const PokemonCard = ({
  id,
  inRecent = false,
  inModal = false,
}: TPokemonCard) => {
  const pokemon = useAppSelector((state) => selectPokemonById(state, id));
  const [isHovered, setIsHovered] = useState(false);
  const toggleSetIsHovered = () => {
    setIsHovered(!isHovered);
  };

  const contextValue = { ...pokemon, inModal, inRecent, isHovered };
  return (
    <PokemonCardContext.Provider value={contextValue}>
      <Card
        onMouseEnter={toggleSetIsHovered}
        onMouseLeave={toggleSetIsHovered}
        variant="outlined"
        sx={inModal ? cardStyleModal : cardStyle}
      >
        {pokemon ? (
          <>
            <Box>
              <PokemonCardHeader />
              <PokemonCardBody />
            </Box>

            {!inModal && <PokemonCardActions />}
          </>
        ) : (
          <CircularProgress />
        )}
      </Card>
    </PokemonCardContext.Provider>
  );
};
