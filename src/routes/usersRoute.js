import controller from '../controllers/usersController'

export default (app) => {
	app.post('/users/validate', controller.adminLogged)
	app.get('/users', controller.getAll)
	app.post('/users/register', controller.register)
	app.post('/users/login', controller.login)
}