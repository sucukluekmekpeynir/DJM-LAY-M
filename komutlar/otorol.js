const fs = require("fs");
const Discord = require('discord.js');

exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(new Discord.RichEmbed().setColor("RANDOM").setAuthor(message.guild.name, message.guild.iconURL).setDescription(":no_entry_sign: **Bu Komutu Kullanmak İçin __Rolleri Yönet__ Yetkisine Sahip Olmalısın!**"));
    if (!args[0]) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setAuthor(message.guild.name, message.guild.iconURL).addField('Kullanım;', `:white_check_mark: **eb+otorol <@rol>**`).setFooter('Error Bot', bot.user.avatarURL).setTimestamp());
    let otorol = JSON.parse(fs.readFileSync("./ayarlar/otorol.json", "utf8"));
    if (!args[0]) {
        otorol[message.guild.id] = {
            role: 0,
            roless: 0
        };
        fs.writeFile("./ayarlar/otorol.json", JSON.stringify(otorol), (err) => {
            if (err) console.log(err);
        });
        message.channel.send(`**${message.author.username}** otorol kapatıldı!`);
    }
    if (args[0]) {
        let roles = message.mentions.roles.first();
        let role = message.guild.roles.find(r => r.name === roles);
        otorol[message.guild.id] = {
            role: roles.id,
            roless: roles.name
        };
        fs.writeFile("./ayarlar/otorol.json", JSON.stringify(otorol), (err) => {
            if (err) console.log(err)
        });
        message.channel.send(`**${message.author.username}** Otorol ayarlandı Rol: **${roles}**`);
    }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['oto-rol'],
  permLevel: 2
};

exports.help = {
  name: 'otorol',
  description: 'otorol ayarlar',
  usage: 'otorol [duyurmak istediğiniz şey]'
};
