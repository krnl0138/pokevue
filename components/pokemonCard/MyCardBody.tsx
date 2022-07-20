import { CardActionArea, CardContent, Typography } from "@mui/material";

export const MyCardBody = ({
  flavors,
  avatar,
  name,
  id,
}: {
  id: number;
  flavors: string;
  avatar: string;
  name: string;
}) => {
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const handleOpenModal = () => {
    dispatch(openModal(pokemon));
  };
  const toggleSetIsHovered = () => {
    setIsHovered(!isHovered);
  };

  return (
    <CardActionArea
      onClick={handleOpenModal}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Image
        height="140"
        width="140"
        src={avatar ? avatar : placeholder}
        alt="pokemon avatar"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        {flavors ? (
          <Typography variant="body2" color="text.secondary">
            {flavors}
          </Typography>
        ) : (
          <p>No flavors were provided. Something is wrong :(</p>
        )}
      </CardContent>
    </CardActionArea>
  );
};

function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

function openModal(pokemon: any): any {
  throw new Error("Function not implemented.");
}

function pokemon(pokemon: any): any {
  throw new Error("Function not implemented.");
}

function setIsHovered(arg0: boolean) {
  throw new Error("Function not implemented.");
}
