import controller from '../controllers/usersController'

export default (app) => {
	app.get('/users', controller.getAll)
	app.post('/users/register', controller.register)
	app.post('/users/login', controller.login)
	app.post('/users/destroy', controller.destroy)
    app.get('/users/:id', controller.getById)
    app.post('/users', controller.persist)
    app.post('/users/:id', controller.persist)
}