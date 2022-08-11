import controller from '../controllers/cartsController'

export default (app) => {
    app.post('/cart/destroy', controller.destroy)
    app.get('/cart', controller.get)
    app.get('/cart/:id', controller.getById)
    app.post('/cart', controller.persist)
    app.post('/cart/:id', controller.persist)
}