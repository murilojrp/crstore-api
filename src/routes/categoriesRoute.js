import controller from '../controllers/categoriesController'

export default (app) => {
    app.post('/categories/destroy', controller.destroy)
    app.get('/categories', controller.getAll)
    app.get('/categories/:id', controller.getById)
    app.post('/categories', controller.persist)
    app.post('/categories/:id', controller.persist)
}