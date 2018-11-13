const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, params) => {
	if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Eğlence Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.sendEmbed(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {
      const sunucubilgi = new Discord.RichEmbed()
    .setAuthor('İşte Kanal Linkim: https://www.youtube.com/channel/UCMb92aH04IwzGv0AR1LOR9w?view_as=subscriber')
    .setColor(3447003)
    .setTimestamp()
    .setDescription('')
		.setImage(`https://yt3.ggpht.com/a-/AN66SAyiNMeXOWDr1S7LOt4NU_GD_qjSIjAbr-OC2A=s900-mo-c-c0xffffffff-rj-k-no`)
    return message.channel.sendEmbed(sunucubilgi);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'link',
  description: 'Youtube Knalının Linkini Gösterir',
  usage: '//link'
};
