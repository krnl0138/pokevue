export const PokemonScreen = ({ data }) => {
  const id = data.id;
  const isFavourite = data.isFavourite;
  const isRecent = data.isRecent;
  const { name, avatar, flavors } = data.pokemonData;
  return (
    <>
      <p>{name}</p>
      <Image src={avatar} alt />
    </>
  );
};
