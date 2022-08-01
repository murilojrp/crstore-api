import usersRoute from "./usersRoute";
import itemsRoute from "./itemsRoute";

function Routes(app) {
	usersRoute(app);
	itemsRoute(app);
}

export default Routes;