var Discord = require('discord.js');
var auth = require('./auth.json');
var schedule = require('node-schedule');

var client = new Discord.Client();
client.login(auth.token);

client.on('ready', function (evt) {
    console.log("Bot is ready");
    setCronJob();
});

function findRingerRoles(guild)
{
    let roles = guild.roles;
    let results = new Map();

    for (var [key, value] of roles) {
        if(value.name.toLowerCase().includes("ringers"))
        {
            results.set(key, value);
            console.log(value.name);
        }
      }

      return results;
}

function FindAndRemoveRingerRoles(guild)
{
    let users = guild.members;
    let result = new Map();

    let ringerRoles = findRingerRoles(guild);

    for (var [key, value] of users)
    {
        searchUserForRingerRoles(value, ringerRoles);
    }
}

function searchUserForRingerRoles(member, ringerRoles)
{
    for (var [key, value] of member.roles)
    {
        removeRingerRolesFromUser(member, value, ringerRoles);
    }
}

function removeRingerRolesFromUser(member, role, ringerRoles)
{
    for (var [key, value] of ringerRoles)
    {
        if(role.name.toLowerCase() == value.name.toLowerCase())
        {
            removeRingerRole(member, role);
        }
    }
}

function removeRingerRole(member, role)
{
    member.removeRole(role, "Ringer role expired")
    console.log(`${role.name} was removed from ${member.user.username}`)
}


function setCronJob()
{
    var j = schedule.scheduleJob('0 0 0 * * 0', function(){ //'0 0 0 * * 0'
        let guilds = client.guilds;

        for(var [key, value] of guilds)
        {
            FindAndRemoveRingerRoles(value)
        }

    });
}