import controller from '../controllers/ordersController'

export default (app) => {
    app.post('/orders/destroy', controller.destroy)
    app.get('/orders', controller.getAll)
    app.get('/orders/:id', controller.getById)
    app.post('/orders', controller.persist)
    app.post('/orders/:id', controller.persist)
}