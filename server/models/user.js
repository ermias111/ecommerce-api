'use strict';

module.exports = function (User) {
    User.observe('after save', function updateTimestamp(ctx, next) {
        if (ctx.isNewInstance) {
            User.app.models.Cart.create({
                userId: ctx.instance.id
            }, next)
        }
        else next();
    });
};
