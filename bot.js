var Discord = require('discord.js');
var auth = require('./auth.json');
var schedule = require('node-schedule');

var bot = new Discord.Client();
bot.login(auth.token);

bot.on('ready', function (evt) {
    console.log("Bot is ready");
    bot.user.setActivity("Beep Boop. I am a bot.");
    setCronJob();
});

function setCronJob()
{
    var j = schedule.scheduleJob('5 * * * * *', function(){
    console.log('The answer to life, the universe, and everything!');
    });
}