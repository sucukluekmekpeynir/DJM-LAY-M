const Discord = require("discord.js");
const moment = require("moment");
const colors = require("colors");
var green = process.env.NODE_DISABLE_COLORS ? '' : '\x1b[32m';

require("moment-duration-format");

exports.run = (client, msg) => {
  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
  msg.channel.sendCode("OYUN KOMUTLARI:",`
k?mcskin:          ^Minecraft skininizi gösterir.^
k?mcsunucu:        ^Minecraft sunucu istatistiklerinizi gösterir.^
k?mcbaşarım:       ^Minecraft başarısı kazanırsınız.^
k?rocketleague:    ^Rocketleague istatistiklerinizi gösterir.^
k?battlefield:     ^Battlefield istatistiklerinizi gösterir.^

* örn: k?mcskin <skin adı>

`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'oyun',
  description: 'Tüm komutları listeler. İsterseniz bir komut hakkında yardım eder..',
  usage: 'oyun'
};