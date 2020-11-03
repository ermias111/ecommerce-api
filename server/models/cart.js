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
                            }
                        }, (err, cart) => {
                            console.log(err, cart)
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
