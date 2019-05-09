module.exports = function(options) {
  return async (ctx, next) => {
    const url = ctx.request.url
    if (options[url] === true || options[url] !== false) {  // 不需要验证登录信息的接口
      await next()
    } else if (options[url] === false) {   // 需要验证登录信息

      // 验证已经登录
      if (ctx.isAuthenticated()) {
        await next()
      } else {
        ctx.body = {
          code: 407,
          msg: '登录超时'
        }
      }
      
      
    } 
    
   
  }
}