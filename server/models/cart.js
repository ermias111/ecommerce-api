'use strict';

module.exports = function (Cart) {

    Cart.cartDetails = function (accessToken, callback) {
        Cart.app.models.AccessToken.findById(accessToken, (err, token) => {
            if (err) return callback(err)
            else if (token) {
                Cart.app.models.user.findById(token.userId, (err, user) => {
                    if (err) callback(err);
                    else {
                        Cart.findOne({
                            where: {
                                userId: user.id
                            },
                            include: ['cart-items']
                        }, (err, cart) => {
                            console.log(err, cart)
                            callback(err, cart)
                        })
                    }
                })

            } else {
                const err = new Error("not authenticated")
                err.statusCode = 401
                callback(err)

            }
        })
    }

    Cart.addItems = function (accessToken, cartItems, callback) {
        Cart.app.models.AccessToken.findById(accessToken, (err, token) => {
            if (err) return callback(err)
            else if (token) {
                Cart.app.models.user.findById(token.userId, (err, user) => {
                    if (err) callback(err);
                    else {
                        Cart.findOne({
                            where: {
                                userId: user.id
                            },
                            include: ['cart-items']
                        }, (err, cart) => {
                            Promise.all(cartItems.map(cartItem => {
                                return new Promise((rs, rj) => {
                                    Cart.app.models.CartItem.create({
                                        ...cartItem,
                                        cartId: cart.id
                                    }, (err, success) => {
                                        if (err) rj(err)
                                        else rs()
                                    })
                                })
                            })).then(() => {
                                callback(null, { success: true })
                            }).catch(err => {
                                callback(err)
                            })
                        })
                    }
                })

            } else {
                const err = new Error("not authenticated")
                err.statusCode = 401
                callback(err)

            }
        })
    }
    
    Cart.removeItem = function (accessToken, cartItemId, callback) {
        Cart.app.models.AccessToken.findById(accessToken, (err, token) => {
            if (err) return callback(err)
            else if (token) {
                Cart.app.models.user.findById(token.userId, (err, user) => {
                    if (err) callback(err);
                    else {
                        Cart.findOne({
                            where: {
                                userId: user.id
                            },
                            include: ['cart-items']
                        }, (err, cart) => {
                            Cart.app.models.CartItem.findOne({
                                where: {
                                    cartId: cart.id,
                                    id: cartItemId
                                }
                            }, (err, cartItemToBeDeleted) => {
                                if (err) {
                                    callback(err);
                                } else {
                                    cartItemToBeDeleted.destroy(callback);
                                }
                            })
                        })
                    }
                })

            } else {
                const err = new Error("not authenticated")
                err.statusCode = 401
                callback(err)

            }
        })
    }
};
