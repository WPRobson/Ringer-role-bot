const bot = require('./bot')

exports.handler =  async function(event, context) {
    console.log("Starting Bot")
    await bot.run();
    return context.logStreamName
  }

handler("","")