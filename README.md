Pokevue -- is a website that allows you to watch, find, rate and chat about pokemons.
It is a pet-project of mine for my portfolio.

It is written on TS on top of the Next JS framework with Redux toolkit.
The store is somewhat normalized. I use Google Firebase as a main database provider and authentication instrument.
Currently I'm working on JWT-tokens solution with cookies.

To build, clone the repo and use `npm install` following `npm run build`.
It may shout at you with `auto-animate` library because of React v.16, please use `--force` flag in this case.
The reason is devs won't update the library to newer versions of React.
