const Discord = require("discord.js");
const schedule = require("node-schedule");
const auth = require("./auth.json");

const client = new Discord.Client();
client.login(auth.token);


 function run() {
  console.log("Starting run")
  let guilds = client.guilds;
  guilds.forEach(value => {
  FindAndRemoveRingerRoles(value);
  });
}

function FindAndRemoveRingerRoles(guild) {
  const users = guild.members;
  const ringerRoles =  findRingerRoles(guild);

  users.forEach(value => {
    searchUserForRingerRoles(value, ringerRoles);
  });
}

 function findRingerRoles(guild) {
  const roles = guild.roles;
  const results = new Map();

  for (var [key, value] of roles) {
    if (value.name.toLowerCase().includes("ringers")) {
      results.set(key, value);
      console.log(value.name);
    }
  }

  return results;
}

 function searchUserForRingerRoles(member, ringerRoles) {
  member.roles.forEach(value => {
     removeRingerRolesFromUser(member, value, ringerRoles);
  });
}

 function removeRingerRolesFromUser(member, role, ringerRoles) {
  ringerRoles.forEach(value => {
    if (role.name.toLowerCase() === value.name.toLowerCase()) {
      removeRingerRole(member, role);
    }
  });
}

 function removeRingerRole(member, role) {
  member.removeRole(role, "Ringer role expired");
  console.log(`${role.name} was removed from ${member.user.username}`);
}

module.exports.run = run;
