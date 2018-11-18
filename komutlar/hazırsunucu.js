const Discord = require('discord.js');


exports.run = (client, message, params) => {
    if(message.author.id === "501776399749742595") {
        
        message.channel.send(':1234: **Sunucu hazırlanıyor...**');
        
        message.guild.createChannel('sohbet');
        
        message.guild.createChannel('bot-komut');
        
        message.guild.createChannel('giriş-çıkış');
    
        message.guild.createChannel('sayaç');
      
        message.guild.createChannel('kurallar');
      
        message.guild.createChannel('duyuru');
      
        message.guild.createChannel('partner');
        
        message.guild.createChannel('sesli-sohbet-1', 'voice');
        
        message.guild.createChannel('sesli-sohbet-2', 'voice');
        
        message.guild.createChannel('sesli-sohbet-3', 'voice');
        
        message.guild.createChannel('müzik', 'voice');
        
        message.guild.createChannel('Bot Yapımcısı:Süleyman Yıldız', 'voice');
        
        message.channel.send(':white_check_mark: **Kanallar Kuruldu**');
        
    } else {
        message.channel.send(':x: **Üzgünüm ama bu komutu kullanmak için yetkin yok!**');
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'hazırsunucu',
  description: 'Bot için gerekli ayarları kurar.',
  usage: 'hazırsunucu'
};
