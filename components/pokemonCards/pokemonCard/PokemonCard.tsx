import { Box, Card, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { selectModalStatus } from "../../../lib/redux/slices/modalSlice";
import { selectPokemonById } from "../../../lib/redux/slices/pokemonsSlice";
import { useAppSelector } from "../../../utils/hooks";
import { PokemonCardActions } from "./components/pokemonCardActions";
import { PokemonCardBody } from "./components/pokemonCardBody";
import { PokemonCardHeader } from "./components/pokemonCardHeader/PokemonCardHeader";
import { styleGlobalHoverShadow } from "../../../styles/styles";
import { PokemonCardContext } from "./pokemonCardContext";

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

    return (
      <PokemonCardContext.Provider value={pokemon}>
        <Card
          onMouseEnter={toggleSetIsHovered}
          onMouseLeave={toggleSetIsHovered}
          variant="outlined"
          sx={isModalOpen ? cardStyleModal : cardStyle}
        >
          {pokemon ? (
            <>
              <Box sx={styleGlobalHoverShadow}>
                <PokemonCardHeader />
                <PokemonCardBody />
              </Box>

              {!isModalOpen && (
                <PokemonCardActions
                  inRecent={inRecent ? inRecent : !inRecent}
                  isHovered={isHovered}
                />
              )}
            </>
          ) : (
            <CircularProgress />
          )}
        </Card>
      </PokemonCardContext.Provider>
    );
  }
);
