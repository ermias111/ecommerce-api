'use strict';

module.exports = function(Item) {
    // return price ordered items 
    Item.beforeRemote('find', function(ctx, unused, next) {
        if (ctx.args.filter) {
            if (ctx.args.filter.order) {
                next()
            } else {
                ctx.args.filter.order = 'price DESC';
                next()
            }
        } else {
            ctx.args.filter = {
                order: 'price DESC'
            }
            next()
        }
      });
};
