const Discord = require('discord.js');


exports.run = (client, message, params) => {
    if(message.author.id === "403882308412637186") {
        
        message.channel.send(':1234: **Dinle ve Eğlen Botu için gerekli şeyler kuruluyor...**');
        
        message.guild.createChannel('mod-log');
        
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
  usage: 'dve!kur'
};