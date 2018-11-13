const Discord = require("discord.js");
const moment = require("moment");
const colors = require("colors");
var green = process.env.NODE_DISABLE_COLORS ? '' : '\x1b[32m';

require("moment-duration-format");

exports.run = (client, msg) => {
  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
  msg.channel.sendCode("YETKİLİ KOMUTLARI:",`
k?ban:         ^Belirlediğiniz bir kullanıcıyı sunucudan kalıcı olarak atarsınız.^
k?kur:         ^Bot için gerekli odaları kurar.^
k?oylama:      ^Standart bir oylama yapmanızı sağlar.^
k?reboot:      ^Botu yeniden yapmanızı sağlar.^
k?sunucular:   ^Botun bulunduğu sunucuları gösterir.^
k?tavsiye:     ^Bot'a tavsiye yollamanızı sağlar.^
k?yaz:         ^Bot üzerinden yazı yazmanızı sağlar.^
k?kilit:       ^Kanalı belirli bir süre kilitlemenizi sağlar.^

* örn: k?ban <sebep>

`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yetkili',
  description: 'Tüm komutları listeler. İsterseniz bir komut hakkında yardım eder..',
  usage: 'yetkili'
};