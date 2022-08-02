import { Box, Card, Skeleton, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { selectPokemonById } from "../../../lib/redux/slices/pokemonsSlice";
import { styleGlobalContainerDark } from "../../../styles/styles";
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

/**
 * Displays all info about a pokemon, mounts based on list of
 * ids passed into PokemonCards
 */
// eslint-disable-next-line react/display-name
export const PokemonCard = React.memo(
  ({ id, inRecent = false, inModal = false }: TPokemonCard) => {
    const pokemon = useAppSelector((state) => selectPokemonById(state, id));

    const [isHovered, setIsHovered] = useState(false);
    const toggleSetIsHovered = () => {
      setIsHovered(!isHovered);
    };

    const contextValue = { ...pokemon, inModal, inRecent, isHovered };
    const theme = useTheme();
    const styleCard = inModal ? cardStyleModal : cardStyle;
    return (
      <PokemonCardContext.Provider value={contextValue}>
        {pokemon ? (
          <Card
            onMouseEnter={toggleSetIsHovered}
            onMouseLeave={toggleSetIsHovered}
            variant="outlined"
            sx={
              theme.palette.mode === "light"
                ? styleCard
                : { ...styleCard, ...styleGlobalContainerDark }
            }
          >
            <>
              <Box>
                <PokemonCardHeader />
                <PokemonCardBody />
              </Box>

              {!inModal && <PokemonCardActions />}
            </>
          </Card>
        ) : (
          // TODO architecturaly not working since the component mounts only when recentIds selector fires
          <Stack spacing={1}>
            <Skeleton variant="circular" width={50} height={50} />
            <Skeleton variant="rectangular" width={385} height={500} />
          </Stack>
        )}
      </PokemonCardContext.Provider>
    );
  }
);
