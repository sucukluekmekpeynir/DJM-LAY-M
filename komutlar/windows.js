const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, params) => {
    if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Bu Bir Eğlence Komutu! Özel Mesajlarda Kullanamazsın!**')
    return message.author.sendEmbed(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {
      const sunucubilgi = new Discord.RichEmbed()
    .setAuthor(message.author.username + ` Windows 10`)
    .setColor("#D2D2D2")
    .setDescription('')
  .setImage(`https://media.giphy.com/media/7h5FhxawWqSdO/giphy.gif`)
  .setFooter(`${message.author.tag} tarafından istendi.`, message.author.avatarURL) 
  .setTimestamp()
    return message.channel.sendEmbed(sunucubilgi);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['windows'],
  permLevel: 0
};

exports.help = {
  name: 'windows',
  description: 'Windows 10 Gifi Atar!',
  usage: 'windows'
};
