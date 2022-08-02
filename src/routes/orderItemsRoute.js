import controller from '../controllers/orderItemsController'

export default (app) => {
    app.post('/orderItems/destroy', controller.destroy)
    app.get('/orderItems', controller.getAll)
    app.get('/orderItems/:id', controller.getById)
    app.post('/orderItems', controller.persist)
    app.post('/orderItems/:id', controller.persist)
}