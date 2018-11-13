const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setTitle("Eğlence komutları")
  .setDescription('')
  .setColor(0x00ffff)
      .setDescription('**•** k?ascii = Yazdığınız yazıyı asciiya dönüştürür.\n**•** k?atla = Atlama gifi atar.\n**•** k?coolresim = Cool resim gösterir.\n**•** k?jdi = Jdi resmi atar.\n**•** k?mesajdöndür = Yazdığınız mesajı döndürür.\n**•** k?emojiyazı = Yazdığınız yazıyı emojili hale çevirip atar.\n**•** k?eski = Resminizi eskileştirir.\n**•** k?gif = Rastgele gif atar.\n**•** k?tkm = Taş,kağıt,makas oyununu oynarsınız.\n**•** k?starwars = Starwars filmini izlersiniz.')
      .setFooter('Örnek kullanım: k?ascii <yazı>')

  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.send(embedyardim);
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.author.send('asciidoc', `= ${command.help.name} = \n${command.help.description}\nDoğru kullanım: ` + prefix + `${command.help.usage}`);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['eğlence'],
  permLevel: 0
};

exports.help = {
  name: 'eğlence',
  description: 'Tüm komutları gösterir.',
  usage: 'eğlence [komut]'
};