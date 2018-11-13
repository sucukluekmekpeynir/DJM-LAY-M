const Discord = require('discord.js');
exports.run = (client, msg, args) => {
    msg.channel.send(`Ben şu an **${client.guilds.size}** sunucuda **${client.users.size}** kullanıcı ile sana hizmet veriyorum!`)   
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'sunucular',
  description: 'Botun bulunduğu sunucuları gösterir.',
  usage: 'dve!sunucular'
};