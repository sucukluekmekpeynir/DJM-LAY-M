const Discord = require('discord.js');

const cevaplar = [
    "- Kanka Alfabe Artık 27 Harf Olmuş! \n + Ciddi misin? Hangi Harfler Gitmiş? \n - O ve E Gitmiş. Çünkü E-Okulda O Şimdi Asker. \n + :middle_finger:", 
    "Ben Kamyonu Kullandım. Leonarda Da Vinci.",  
    "- İneklerin Sevmediği Element Nedir? \n + Bilmem ki. Nedir? \n - AZ-OT'tur \n - :middle_finger:",
    "Yeni Yapılmış Resimlere Ne Denir? \n -'new'resim",
    "Sevgilisi Olmayanlar Bul-Aşık Makinesi Alsınlar.",
    "Yumurtanı Sahanda mı Yersin? Yoksa Deplasmanda mı?",
    "Ayakkabıcı Sıkıyorsa Alma Dedi Bende Korktum Aldım",
    "Ha-yat Hatekne",
    "+ Bir Elma Neden Discoya Gitmiş? \n - Bilmiyorum ki. Neden gitmiş? \n + Kurtlarını Dökmek İçin \n - Ne Kadar Komik Hahahahaha", 
];

exports.run = function(client, message, args) {

 var cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)];
  message.channel.send(cevap)

};  

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'espri', 
  description: 'Ne Kadar Komik Eueueueu',
  usage: 'espri'
};
