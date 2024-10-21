  const { JsonDatabase } = require("wio.db");
  const { QuickDB } = require("quick.db");

  const AprovadosLog = new QuickDB({ filePath:"./Database/logs.sqlite" });

  const General = new JsonDatabase({
    databasePath: "./Database/settings.json"
  });

  const BList = new JsonDatabase({
    databasePath: "./Database/blacklist.json"
  });

  const tickets = new JsonDatabase({
    databasePath: "./Database/tickets.json"
  });

  const announce = new JsonDatabase({
    databasePath: "./Database/anunciar.json"
  });

  const welcomis = new JsonDatabase({
    databasePath: "./Database/boasvindas.json"
  });

  const products = new JsonDatabase({
    databasePath: "./Database/produtos.json"
  });

  const lojaInfo = new JsonDatabase({
    databasePath: "./Database/infoloja.json"
  });
  
  const carrinhos = new JsonDatabase({
    databasePath: "./Database/carrinhos.json"
  });

  const EmojIs = new JsonDatabase({
    databasePath: "./Database/emojis.json"
  });

  module.exports = {
    General,
    BList,
    tickets,
    announce,
    welcomis,
    products,
    lojaInfo,
    AprovadosLog,
    carrinhos,
    EmojIs
  }