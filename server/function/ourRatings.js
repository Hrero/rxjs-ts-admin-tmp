const Commodity = require('../model/commodity');
module.exports = {
    rating: async (ctx, next) => {
        let req = ctx.request.body;
        try {
            /**
             * 转发 3分
             * 收藏 2分
             * 喜欢 1分
             * 商品用户粉丝数 0.5分
             * 根据用户查看的当前商品type值 按照以上分数进行排序返回30条 如果查看当前没有分类就推荐 分数最多的物品 
             */
            const userLook = await Commodity.findOne({_id: req.commodityId}).populate('dep');
            const collect = userLook.collect;
            const transmit = userLook.transmit;
            const like = userLook.like;
            const fans = userLook.dep.fansNum;
            const result = collect * 2 + transmit * 3 + like * 1 + fans * 0.5;
            await Commodity.update({
                _id: req.commodityId
            },{ ourRatings: result })
            await next()
        } catch(err) {
            ctx.body = {
                code: err.code,
                data: '',
                msg: err.errmsg
            }
            return; 
        }
    }
};