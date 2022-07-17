import Link from "next/link";
import { PROJECT_URLS as urls } from "../../../utils/constants";

export const Footer = () => {
  return (
    <footer>
      <nav>
        <Link href={urls.home}>Home</Link>
        <Link href={urls.about}>About</Link>
        <Link href={urls.profile}>Profile</Link>
        <Link href={urls.favourites}>Favourites</Link>
      </nav>
      <p>Made with MaterialUI, React/Redux, NextJS, Typescript and Firebase</p>
      <p>Pokevue, 2022</p>
    </footer>
  );
};
