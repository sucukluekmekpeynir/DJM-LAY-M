const Discord = require('discord.js');

exports.run = (client, message, args) => {
if (!message.guild) {
const ozelmesajuyari = new Discord.RichEmbed()
  .setColor("#ffffff")
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':warning: Uyarı :warning:', '`tavsiye` adlı komutu özel mesajlarda kullanamazsın.')
return message.author.sendEmbed(ozelmesajuyari); }
let guild = message.guild
let mesaj = args.slice(0).join(' ');
  message.delete();
  console.log("dve!tavsiye komutu " + message.author.username + '#' + message.author.discriminator + " tarafından kullanıldı.")
  if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor("RANDOM").setDescription(':no_entry_sign: :pencil: Tavsiye için bana birşey yazman gerek!'));
  const tavsiye1 = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(':open_file_folder: Tavsiye İçin Teşekkürler!\n:page_facing_up: Lütfen gereksiz yere tavsiye vermeyiniz.')
  message.channel.send(tavsiye1);
const tavsiye = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setThumbnail(message.author.avatarURL)
  .setDescription(':newspaper2: **' + message.author.tag + '** Adlı Kullanıcının Tavsiyesi;')
  .addField(':envelope: Kullanıcı Bilgileri', '**» Kullanıcı ID: **' + message.author.id + '\n**» Kullanıcı Adı: **' + message.author.username + '#' + message.author.discriminator)
  .addField(':envelope: Sunucu Bilgileri', '**» Sunucu ID: **' + message.guild.id + '\n**» Sunucu Adı: **' + message.guild.name + '\n**» Sunucu Invite Link: **' + message.guild.channels.get(message.channel.id).createInvite())
  .addField(':pencil: Tavsiye','**' + mesaj + '**')
return client.channels.get("459981301106343936").send(tavsiye);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'tavsiye',
  description: 'Bota eklenmesini istediğiniz şeyi tavsiye etmenizi sağlar',
  usage: 'dve!tavsiye [tavsiye]'
};