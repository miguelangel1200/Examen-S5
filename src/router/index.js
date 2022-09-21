import { TestRouter } from "../components";
import characterRouter from "../components/characters/network";
// cada vez que quiera agregar unaruta nueva,
// creo el path e importo el componente
const listRoutes = [["/test", TestRouter]];
const listRoutesCharacter = [["/characters", characterRouter]]

export const routes = (app) => {
  listRoutes.forEach(([path, controller]) => {
    app.use(path, controller);
  });
  listRoutesCharacter.forEach(([path, controller]) => {
    app.use(path, controller);
  })
};


