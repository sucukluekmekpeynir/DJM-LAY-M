const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  const embed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
  .setColor("RANDOM")
  .setDescription("**Bot yapımıcısı:** Süleyman Yıldız")
  .setFooter('Kralbot| https://kralbotdiscord.wordpress.com/', client.user.avatarURL)
  .setThumbnail("")
  .setTimestamp()
  .addField("» Linkler", `[Bot Davet Linki](https://discordapp.com/api/oauth2/authorize?client_id=498573744030351377&permissions=2146958583&scope=bot)` + "**\n**"+`[Destek Sunucusu](https://discordbots.org/bot/460723895268278283)`+ "**\n**"+`[Destek Sunucusu](https://discord.gg/gwmBhyV)`, false)
  .setURL('https://discordapp.com/api/oauth2/authorize?client_id=498573744030351377&permissions=2146958583&scope=bot')
  	.setThumbnail(client.user.avatarURL);

  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yapımcı',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'yapımcı'
};
