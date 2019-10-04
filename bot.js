var Discord = require('discord.js');
var auth = require('./auth.json');
var schedule = require('node-schedule');

var client = new Discord.Client();
client.login(auth.token);

client.on('ready', function (evt) {
    console.log("Bot is ready");
    client.user.setActivity("Beep Boop. I am a bot.");
    //setCronJob();
    let guild = client.guilds.first()

    let rolesToRemove = findRingerRoles(guild);
    FindAndRemoveRingerRoles(guild, rolesToRemove)
});


function findRingerRoles(guild)
{
    let roles = guild.roles;
    let results = new Map();

    for (var [key, value] of roles) {
        if(value.name.toLowerCase().includes("ringer"))
        {
            results.set(key, value);
        }
        console.log(value.name);
      }

      return results;
}

function FindAndRemoveRingerRoles(guild, ringerRoles)
{
    let users = guild.members;
    let result = new Map();

    for (var [key, value] of users)
    {
        searchUserForRingerRoles(value, ringerRoles);
    }
}

function searchUserForRingerRoles(user, ringerRoles)
{
    for (var [key, value] of user.roles)
    {
        removeRingerRolesFromUser(user, value, ringerRoles);
    }
}

function removeRingerRolesFromUser(user, role, ringerRoles)
{
    for (var [key, value] of ringerRoles)
    {
        if(role.name == value.name)
        {
            removeRingerRole(user, role);
        }
    }
}

function removeRingerRole(user, role)
{
    user.removeRole(role, "Ringer role expired")
}


function setCronJob()
{
    var j = schedule.scheduleJob('5 * * * * *', function(){
    console.log('The answer to life, the universe, and everything!');
    });
}