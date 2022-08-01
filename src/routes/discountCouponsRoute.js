import controller from '../controllers/discountCouponsController'

export default (app) => {
    app.post('/discountCoupons/destroy', controller.destroy)
    app.get('/discountCoupons', controller.getAll)
    app.get('/discountCoupons/:id', controller.getById)
    app.post('/discountCoupons', controller.persist)
    app.post('/discountCoupons/:id', controller.persist)
}