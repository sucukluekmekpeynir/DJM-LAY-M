const Discord = require('discord.js');
const hook = new Discord.WebhookClient('461506523374551040', 'O_WgJ_aILU0gj33alITfJDCHFLgm8_fZNIbB_2FcA1TZFYLvxSjzD-5PUbcIC0bHL7CP');

exports.run = (client, message, args) => {
  let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.reply('Bana Bug Bildireceksin');
  message.delete();
  hook.send('**' + message.author.username + '** **#' + message.author.discriminator + '** Adlı Kişi Bug Bildirdi. **Bug İse** -> ' + '**' + mesaj + '**');
  message.reply('Bana Bug Bildirdiğin İçin Tesekkür Ederim')
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'bug',
  description: 'Bug Bildirir',
  usage: 'bug'
};