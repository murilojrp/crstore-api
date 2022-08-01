import usersRoute from "./usersRoute";
import itemsRoute from "./itemsRoute";
import categoriesRoute from "./categoriesRoute";
import paymentsRoute from "./paymentsRoute";
import discountCouponsRoute from "./discountCouponsRoute";
import addressesRoute from "./addressesRoute";

function Routes(app) {
	usersRoute(app);
	itemsRoute(app);
	categoriesRoute(app);
	paymentsRoute(app);
	discountCouponsRoute(app);
	addressesRoute(app);
}

export default Routes;