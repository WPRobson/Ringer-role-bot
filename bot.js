const Discord = require("discord.js");
const schedule = require("node-schedule");
const auth = require("./auth.json");

const client = new Discord.Client();
client.login(auth.token);


async function run() {
  console.log("Starting run")
  let guilds = client.guilds;
  guilds.forEach(value => {
   await FindAndRemoveRingerRoles(value);
  });
}

async function FindAndRemoveRingerRoles(guild) {
  const users = guild.members;
  const ringerRoles = await findRingerRoles(guild);

  users.forEach(value => {
    await searchUserForRingerRoles(value, ringerRoles);
  });
}

async function findRingerRoles(guild) {
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

async function searchUserForRingerRoles(member, ringerRoles) {
  member.roles.forEach(value => {
    await removeRingerRolesFromUser(member, value, ringerRoles);
  });
}

async function removeRingerRolesFromUser(member, role, ringerRoles) {
  ringerRoles.forEach(value => {
    if (role.name.toLowerCase() === value.name.toLowerCase()) {
     await removeRingerRole(member, role);
    }
  });
}

async function removeRingerRole(member, role) {
  member.removeRole(role, "Ringer role expired");
  console.log(`${role.name} was removed from ${member.user.username}`);
}

module.exports.run = run;
