const Discord = require('discord.js');


exports.run = (client, message, params) => {
    if(message.author.id === "416985816112300034") {
        
        message.channel.send(':1234: **Kur Kralbot için gerekli şeyleri kuruyor...**');
        
        message.guild.createChannel('mod-log');
        message.guild.createChannel('giriş-çıkış');
        message.guild.createChannel('ceza-takip-listesi');
        message.guild.createChannel('log');
        message.guild.createChannel('uyarı');
        message.guild.createChannel('duyuru');
        message.guild.createChannel('Yapımcım Süleyman Yıldız');
        
        
        message.channel.send(':white_check_mark: **Herşey Kuruldu**');
        
    } else {
        message.channel.send(':x: **Üzgünüm ama bu komutu şimdilik kullanamazsınız!**');
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'kur',
  description: 'Bot için gerekli ayarları kurar.',
  usage: 'kur'
};
