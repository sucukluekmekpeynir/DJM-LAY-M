const Discord = require('discord.js')

exports.run = (bot, message) => {
  const ok = message.client.emojis.get("441922608720510987");
           var embed = new Discord.RichEmbed()
                .setAuthor('#' + message.channel.name, message.guild.iconURL)
                .addField("ID", message.channel.id)
                if (message.channel.nsfw) {
                    embed.addField(" Uygunsuz İçerik", "Evet", true)
                }
                else {
                    embed.addField(" Uygunsuz İçerik", "Hayır", true)
                }
                embed.addField(" Oluşturulduğu Tarih", message.channel.createdAt, true)
                .setColor(3447003)
                .setThumbnail(message.guild.iconURL)
                .addField("» Linkler", `[Bot Davet Linki](https://discordapp.com/oauth2/authorize?client_id=460723895268278283&scope=bot&permissions=2146958591)` + "**\n**"+`[DBL Oyver](https://discordbots.org/bot/460723895268278283)`+ "**\n**"+`[Destek Sunucusu](https://discord.gg/U2byS7x)`, false)
                .setFooter("Dinle ve Eğlen | dvebot.rf.gd", "https://cdn.discordapp.com/avatars/460723895268278283/b672caa2243759b14c3d7c8f185b6ddb.png?size=2048")
            message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kanalbilgi',
  description: '**Bulunduğunuz** kanalın ismini değiştirir. ',
  usage: 'kanalismideğiş yeni kanal ismi'
};