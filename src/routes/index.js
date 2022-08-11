import usersRoute from "./usersRoute";
import itemsRoute from "./itemsRoute";
import categoriesRoute from "./categoriesRoute";
import paymentsRoute from "./paymentsRoute";
import discountCouponsRoute from "./discountCouponsRoute";
import addressesRoute from "./addressesRoute";
import ordersRoute from "./ordersRoute";
import orderItemsRoute from "./orderItemsRoute";
import cartsRoute from "./cartsRoute";

function Routes(app) {
	usersRoute(app);
	itemsRoute(app);
	categoriesRoute(app);
	paymentsRoute(app);
	discountCouponsRoute(app);
	addressesRoute(app);
	ordersRoute(app);
	orderItemsRoute(app)
	cartsRoute(app)
}

export default Routes;