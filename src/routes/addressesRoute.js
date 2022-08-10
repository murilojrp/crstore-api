import controller from '../controllers/addressesController'

export default (app) => {
    app.post('/addresses/destroy', controller.destroy)
    app.get('/addresses', controller.get)
    app.get('/addresses/:id', controller.getById)
    app.post('/addresses/persist', controller.persist)
    app.post('/addresses/persist/:id', controller.persist)
}