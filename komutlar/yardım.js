const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setTitle("Komutlar")
  .setDescription('')
  .setColor(0x00ffff)
  .addField("**» Eğlence Komutları**", `!atatürk = Rastgele Atatürkün Fotoğraflarını Gösterir. \n!starwars = StarWars (Pixel Formatında) Filmini Gösterir. \n!banned = Dene ve Gör! \n!kahkaha = Kahkaha Atarsınız \n!herkesebendençay = Herkese Çay Alırsınız. \n!koş = Koşarsınız.\n!çayiç = Çay İçersiniz. \n!çekiç = İstediğiniz Kişiye Çekiç Atarsınız. \n!çayaşekerat = Çaya Şeker Atarsınız. \n!yumruk-at = Yumruk Atarsınız. \n!şanslısayım = Bot Sizin Şanslı Sayınızı Söyler.`)
  .addField("**» Kullanıcı Komutları**", `!report = İstediğiniz Kullanıcıyı Reportlarsınız. \n!kısalt = İstediğiniz Linki Kısaltarak Özelleştire Bilirsiniz. \n!yaz = Bota İsediğinizi Yazdırırsınız. \n!sunucubilgi = Bulunduğunuz Sunucu Hakkında Bilgi Verir. \n!sunucuresmi = Bulunduğunuz Sunucunun Resmin Gösterir. \n!kullanıcıbilgim = Sizin Hakkınızda Bilgi Verir. \n!avatarım = Avatarınınızı Gösterir. `)
  .addField("**» Oyun Komutları**", `!fortnite = İstediğiniz Kullanıcının İstatistiklerine Bakarsınız.`)
  .addField("**» Sunucu Yetkilisi Komutları**", `!ban = İstediğiniz Kişiyi Sunucudan Banlar. \n!kick  = İstediğiniz Kişiyi Sunucudan Atar. \n!unban = İstediğiniz Kişinin Yasağını Açar. \n!sustur = İstediğiniz Kişiyi Susturur. \n!sil = Belirtilen Miktarda Mesajı Silir. (MAX 100) \n!oylama = Oylama Açar. \n!duyuru = Güzel Bir Duyuru Görünümü Sağlar.`)
  .addField("**» Botun Ana Komutları**", "!yardım = BOT Komutlarını Atar. \n!bilgi = BOT Kendisi Hakkında Bilgi Verir. \n!ping = BOT Gecikme Süresini Söyler. \n!davet = BOT Davet Linkini Atar. \n!istatistik = BOT İstatistiklerini Gösterir.")
  .setFooter('ClawBot Güncel Sürüm [ BETA v0.2.5 ]')
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.send(embedyardim);
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.author.send('', `= ${command.help.name} = \n${command.help.description}\nDoğru kullanım: ` + prefix + `${command.help.usage}`);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp', 'help', 'y'],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım [komut]'
};
