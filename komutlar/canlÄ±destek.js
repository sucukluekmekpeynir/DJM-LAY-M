const Discord = require('discord.js');

exports.run = async(client, message, args) => {
const emoji = message.client.emojis.get('📞');
      let isEnabled;
      message.reply("`Birazdan Yetkili Ekibimiz Sizinle ilgilenicektir.`");
      let mesaj = args.slice(0).join(' ');
      let chan = message.channel;
      let destekKanal = "504790796931825670";
      const embed = new Discord.RichEmbed()
        .addField('Dikkat', `Canlı Destek Talebi`)
        .setAuthor(`${message.author.tag} (${message.author.id})`, `${message.author.avatarURL}`)
        .setColor("00ff00")
        .addField(`Bilgiler`, `**Sunucu**: ${message.guild.name} (${message.guild.id}) \n**Kanal**: ${message.channel.name} (${message.channel.id}) \n**Destek İsteyen**: ${message.author.tag} (${message.author.id}) \n**Destek Mesajı**: ${mesaj}`)
        .setFooter("© Bee | Canlı Destek")
        client.channels.get(destekKanal).send({
        embed: embed
      });
    const collector = client.channels.get(destekKanal).createCollector(message => message.content.startsWith(''), {
      time: 0
    })
    client.channels.get(destekKanal).send('** Destek Çağrısına Bağlanmak İçin** `bağlan` **Yazınız. İptal Etmek İçin** `iptal` **Yazınız.**')
    collector.on('message', (message) => {
      if (message.content === 'iptal') collector.stop('aborted')
      if (message.content === 'bağlan') collector.stop('success')
    })
    collector.on('end', (collected, reason) => {
      if (reason === 'time') return message.reply('``Canlı Destek Zaman Aşımına Uğradı.``')
      if (reason === 'aborted') {
        message.reply('``Canlı Destek Talebi Reddedildi.``')
        client.channels.get(destekKanal).send('``Canlı Destek Başarıyla Reddedildi.``')
      }
      if (reason === 'success') {
        client.channels.get(destekKanal).send('``Canlı Destek Talebi Alındı.``')
        client.channels.get(destekKanal).send('**Canlı Destek Talebini İptal Etmke İçin ``iptal`` Yazınız.**')
        chan.send(`${message.author}`)
        chan.send('``Destek Talebiniz Yetkili Tarafından Kabul Edildi``')
        chan.send('**Destek Talebini İptal Etmek İçin `iptal` Yazınız.**')
        isEnabled = true
        client.on('message', message => {
          function contact() {
            if (isEnabled === false) return
            if (message.author.id === client.user.id) return
            if (message.content.startsWith('iptal')) {
              message.channel.send('``Canlı Destek İptal Edildi``')
              if (message.channel.id === chan.id) client.channels.get(destekKanal).send('``Canlı Destek Karşı Tarafdan İptal Edildi``')
              if (message.channel.id === destekKanal) chan.send('``Canlı Destek Karşı Tarafdan İptal Edildi``')

              return isEnabled = false
            }
            if (message.channel.id === chan.id) client.channels.get(destekKanal).send(`**Talepte Bulunan Kişi :** ${message.author.tag} : ${message.content}`)
            if (message.channel.id === destekKanal) chan.send(`**Yetkili :** ${message.author.tag} : ${message.content}`)
          }
          contact(client)
        })
      }
    })
}

  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'canlıdestek',
  description: 'Canlı Destek Tablebi Oluşturur.',
  usage: 'canlıdestek'
};