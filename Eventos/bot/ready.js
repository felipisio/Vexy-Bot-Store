const colors = require("colors");
const {
  Reiniciarapp
} = require("../../Functions/mensagemauto");
const {
  General
} = require("../../Database");
const status = General.get('APP.STATUS')


module.exports = {
  'name': "ready",
  'run': async (client) => {
    const userrs = client.users.cache.size
    if (status !== null) {
      client.user.setActivity(status);
    }
    Reiniciarapp(client);
    console.clear();
    console.log(colors.green('[STATUS]') + " " + client.user.username + " acabou de iniciar.");
    console.log(colors.green("[STATUS]") + " Online em " + client.guilds.cache.size + " servidores");
    console.log(" ");
    console.log(colors.grey("[OWNER]") + " @rayn");
    console.log(colors.cyan("[UPDATES]") + " Atualizações em https://discord.gg/PMTdVzn9");
  }
};