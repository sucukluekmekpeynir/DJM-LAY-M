const Discord = require("discord.js")
const useful = require('useful-tools')
exports.run = async (client, message, args) => {

const tarih = new Date()
message.channel.send('►Bugünün Tarihi Aşağıda◄')
message.channel.send(useful.tarih(tarih))
}
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
    kategori: "genel"
   };
  
  exports.help = {
    name: 'tarih',
    description: 'Tarihe Bakmanı Sağlar',
    usage: 'tarih'
   }
