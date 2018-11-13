const Discord = require("discord.js");
const moment = require("moment");
const colors = require("colors");
var green = process.env.NODE_DISABLE_COLORS ? '' : '\x1b[32m';

require("moment-duration-format");

exports.run = (client, msg) => {
  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
  msg.channel.sendCode("KULLANICI KOMUTLARI:",`
k?afk:         ^Afk moduna geçersiniz.^
k?bilgi:       ^Bot hakkında bilgiler alırsınız.^
k?davet:       ^Botun davet linkini gönderir.^
k?destek:      ^Botun destek sunucusunu yollar.^
k?geldim:      ^Afk modundan çıkmanızı sağlar.^
k?istatistik:  ^Botun istatistiklerini atar.^
k?ping:        ^Botun pingini gösterir.^
k?sunucu:      ^Sunucu hakkında bilgiler verir.^
k?hatabildir:  ^Botta bulunan bir hatayı göndermenizi sağlar.^
k?yardım:      ^Yardım komutlarını gösterir.^

* örn: k?afk <sebep>

`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kişisel',
  description: 'Tüm komutları listeler. İsterseniz bir komut hakkında yardım eder..',
  usage: 'kişisel'
};