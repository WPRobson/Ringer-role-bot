var Discord = require('discord.js');
var auth = require('./auth.json');
var schedule = require('node-schedule');

var client = new Discord.Client();
client.login(auth.token);

client.on('ready', function (evt) {
    console.log("Bot is ready");
    client.user.setActivity("Beep Boop. I am a bot.");
    //setCronJob();
    let roles = client.guilds.first().roles

    for (var [key, value] of roles) {
        console.log(value.name);
      }

    let users = client.guilds.first().members

    for (var [key, value] of users)
    {
        console.log(value.roles)
    }

});

client.on('message', message => {
    
    var member = message.member;
    console.log(member.nickname)
    }
  );

function setCronJob()
{
    var j = schedule.scheduleJob('5 * * * * *', function(){
    console.log('The answer to life, the universe, and everything!');
    });
}