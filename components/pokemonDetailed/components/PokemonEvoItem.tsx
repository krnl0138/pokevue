import { Box, Container, Tooltip, Typography } from "@mui/material";
import Link from "next/link";
import { URLS } from "../../../utils/constants";
import Image from "next/image";

type TPokemonEvoItem = {
  id: number;
  name: string;
  avatarBig: string;
};

export const PokemonEvoItem = ({ id, name, avatarBig }: TPokemonEvoItem) => {
  return (
    <Container>
      <Tooltip title={`Show me ${name}!`}>
        <Box sx={{ textAlign: "center" }}>
          <Link href={`${URLS.pokemon}/${id}`}>
            <a>
              <Image
                src={avatarBig}
                alt={"Evolution pokemon avatar"}
                width="150"
                height="150"
              />
            </a>
          </Link>

          <Typography
            component="p"
            variant="body1"
            sx={{ marginTop: 1.5, fontWeight: 300 }}
          >
            <Link href={`${URLS.pokemon}/${id}`}>
              <a>{name}</a>
            </Link>
          </Typography>
        </Box>
      </Tooltip>
    </Container>
  );
};
