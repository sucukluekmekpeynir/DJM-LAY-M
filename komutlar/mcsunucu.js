const Discord = require('discord.js');
const request = require('request');
var mcPort = 25565
var prefix = "?";
exports.run = (client, message, args) => {
  if (message.content.startsWith(prefix + "mcsunucu")) {
      var url = 'http://mcapi.us/server/status?ip=' + args[0] + '&port=' + mcPort;
		let reason = args.slice(0).join(' ');
        request(url, function (err, response, body) {
            if (err) {
                console.log(err);
                return message.channel.sendEmbed(new Discord.RichEmbed().setTitle('Hata!').addField('Sunucu bilgileri alınırken beklenmedik bir hatayla karşılaştık.').setThumbnail("https://cdn.pixabay.com/photo/2013/07/12/19/25/minecraft-154749_960_720.png").setAuthor("XERESSA").setFooter('').setColor("RANDOM").setTimestamp());
            }
            body = JSON.parse(body);
            var status = '**〉** Sunucu » **' + reason + '**\n\n**〉** Sunucu şu anda aktif mi » **Hayır**\n\n**〉** Bu IP adresi bir sunucuya ait değil veya sunucu şu anda kapalı.';
            if (body.online) {
			status = '**〉** Sunucu adı » **' + reason + '**\n\n**〉** Sunucu şu anda aktif mi » **Evet**\n\n**〉** Sunucu versiyonu » **'+ body.server.name +'**\n\n';
                if (body.players.now) {
                    status += '**〉** Aktif oyuncu sayısı » **' + body.players.now + '/'+ body.players.max +'**\n\n**〉** Açıklama » **' + body.motd +'**';
					} else {
						status += '**〉** Şu anda sunucuda kimse yok.';
                }
            }
            message.channel.sendEmbed(new Discord.RichEmbed().setDescription(status).setThumbnail('https://cdn.pixabay.com/photo/2013/07/12/19/25/minecraft-154749_960_720.png').setColor('RANDOM').setFooter('' + body.motd + ''));
        });
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['mcsunucu', 'mc sunucu'],
  permLevel: 0
};

exports.help = {
  name: 'mcsunucu',
  description: 'Minecraft sunucu bilgisini verir.',
  usage: 'mcserver <sunucu IP>'
};