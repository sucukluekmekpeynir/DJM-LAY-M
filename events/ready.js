const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Discord: Şu an ` + client.channels.size + ` adet kanala, ` + client.guilds.size + ` adet sunucuya ve ` + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ` kullanıcıya hizmet veriliyor!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Discord: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Discord: ${client.user.username} ismi ile giriş yapıldı!`);
  client.user.setStatus("online");
  client.user.setGame("Şu an 4K adet Kanala 2K sunucuya 5K kullanıcıya hizmet veriliyor")
client.user.setUsername(" Kralbot ");
client.user.setPresence({
        game: {
            name: `Patates`,
            type: 'WATCHING'
        },
        status: 'dnd'
    })
var oyun = [
        "k?yardım | k?davet",
        "Kralbot Sürümü 3.0.0.0 Olarak Güncellenmiştir! https://kralbotdiscord.wordpress.com/",
        "Sunucumuza Yeni Stats Paneli Eklenmiştir!"             
    ];

    setInterval(function() {

        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);

        client.user.setGame(oyun[random], "https://www.twitch.tv/4kafadaroyunda");
        }, 2 * 2500);
}
