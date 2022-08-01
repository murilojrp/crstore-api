import controller from '../controllers/addressesController'

export default (app) => {
    app.post('/addresses/destroy', controller.destroy)
    app.get('/addresses', controller.getAll)
    app.get('/addresses/:id', controller.getById)
    app.post('/addresses', controller.persist)
    app.post('/addresses/:id', controller.persist)
}