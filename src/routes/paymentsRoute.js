import controller from '../controllers/paymentsController'

export default (app) => {
    app.post('/payments/destroy', controller.destroy)
    app.get('/payments', controller.getAll)
    app.get('/payments/:id', controller.getById)
    app.post('/payments', controller.persist)
    app.post('/payments/:id', controller.persist)
}