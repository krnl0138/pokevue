import { Heading } from "../heading/Heading";

export const AboutSection = () => {
  return (
    <div>
      <Heading title={"A fun way to find pokemons"} />
      <p>
        I built this website <s>just for fun</s> for my CV as a pet-project of
        mine. Feel free to use the source code on{" "}
        <a href="https://github.com/">Github</a>.
      </p>
      <br />
      <p>
        Before this project I&apos;ve never watched Pokemon series. So I myself
        learned a lot of new :)
      </p>
      <br />
      <p>
        For this project I've used the following stack:
        <ul>
          <li>MUI</li>
          <li>React/Redux</li>
          <li>NextJS</li>
          <li>Typescript</li>
          <li>Firebase</li>
        </ul>
      </p>
    </div>
  );
};
