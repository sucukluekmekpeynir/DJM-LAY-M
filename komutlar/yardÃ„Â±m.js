const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setTitle("Komut Listesi")
  .setDescription('')
  .setColor(0x00ffff)
      .setDescription('**•** k?eğlence = Eğlence komutları\n**•** k?kişisel = Kişisel komutlar\n**•** k?yetkili = Yetkili komutları\n**•** k?oyun = Oyun komutları\n**•** k?müzik = Müzik komutları\n**•** k?destek = Destek komutları')
      .addField("» Linkler", `[Bot Davet Linki](https://discordapp.com/api/oauth2/authorize?client_id=498573744030351377&permissions=2146958583&scope=bot)` + "**\n**"+`[Botun Sitesi](https://kralbotdiscord.wordpress.com/)`+ "**\n**"+`[Destek Sunucusu](https://discord.gg/gwmBhyV)`, false)
      .setFooter('Örnek kullanım: k?eğlence')

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
  aliases: ['help','yardim'],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım [komut]'
};