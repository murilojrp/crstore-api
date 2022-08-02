import controller from '../controllers/itemsController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.get('/items', controller.getAll)
	app.post('/items/destroy', controller.destroy)
    app.get('/items/:id', controller.getById)
    app.post('/items', controller.persist)
    app.post('/items/:id', controller.persist)
}