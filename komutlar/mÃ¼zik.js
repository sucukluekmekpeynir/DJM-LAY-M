const Discord = require("discord.js");
const moment = require("moment");
const colors = require("colors");
var green = process.env.NODE_DISABLE_COLORS ? '' : '\x1b[32m';

require("moment-duration-format");

exports.run = (client, msg) => {
  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
  msg.channel.sendCode("MÜZİK KOMUTLARI:",`
k?çal:         ^Yazdığınız şarkıyı çalar.^
k?sıra:      ^Şarkı kuyruğunu gösterir.^
k?devam:       ^Duraklatılan şarkıya devam eder.^
k?geç:         ^Çalan şarkıyı geçer.^
k?dur:         ^Çalınan şarkıyı duraklatır.^
k?çalan:       ^Mesajı yazdığınız anda hangi şarkının çaldığını gösterir.^
k?duraklat:    ^Oynatılan şarkıyı duraklatır.^
k?ses:         ^Oynatılan şarkının ses seviyesini ayarlar.^


* örn: k?çal <şarkıismi>

`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'müzik',
  description: 'Tüm komutları listeler. İsterseniz bir komut hakkında yardım eder..',
  usage: 'müzik'
};