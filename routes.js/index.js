const Accounts = require('./accounts.route')
const User = require('./users.route')
const Items = require('./items.route')
const { authentication } = require('../middleware/authentication')


const selectionRoutes = (app) => {
    app.use('/auth', Accounts)
    app.use('/api', authentication, User)
    app.use('/api', authentication, Items)

}

module.exports = { selectionRoutes }