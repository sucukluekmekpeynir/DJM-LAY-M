
const { command } = require('discord.js-commando');
const { richEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const moment = require('moment')
const filterLevels = ['Yok.', 'Rolü olmayanlar için.', 'Herkes için.'];
const verificationLevels = ['Yok.', 'Düşük.', 'Orta.', '(╯°□°）╯︵ ┻━┻', '(╯°□°）╯︵ ┻━┻', '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'];

module.exports = class ServerCommand extends command {
    constructor(client) {
        super(client, {
			name: 'sunucubilgi',
		  aliases: ['sunucu'],
            group: 'sunucu',
            memberName: 'sunucu-bilgi',
            description: 'Bulunduğunuz sunucu hakkında bilgi verir.',
            examples: ['sunucu-bilgi'],
            guildOnly: true
        });
    }

    run(msg) {
        var konum = ''
        if(msg.guild.region === "russia") {
            var konum = 'Türkiye :flag_tr:'
        }
        if(msg.guild.region === "us-west") {
            var konum = 'Türkiye :flag_tr: '
        }
        if(msg.guild.region === "us-south") {
            var konum = 'Türkiye :flag_tr: '
        }
        if(msg.guild.region === "us-east") {
            var konum = 'Türkiye :flag_tr: '
        }
        if(msg.guild.region === "us-central") {
            var konum = 'Türkiye :flag_tr: '
        }
        if(msg.guild.region === "brazil") {
            var konum = 'Türkiye :flag_tr:'
        }
        if(msg.guild.region === "singapore") {
            var konum = 'Türkiye :flag_tr:'
        }
        if(msg.guild.region === "sydney") {
            var konum = 'Türkiye :flag_tr:'
        }
        if(msg.guild.region === "eu-west") {
            var konum = 'Türkiye :flag_tr:'
        }
        if(msg.guild.region === "eu-south") {
            var konum = 'Türkiye :flag_tr:'
        }
        if(msg.guild.region === "eu-east") {
            var konum = 'Türkiye :flag_tr:'
        }
        if(msg.guild.region === "eu-central") {
            var konum = 'Türkiye :flag_tr:'
        }
        if(msg.guild.region === "hongkong") {
            var konum = 'Türkiye :flag_tr: '
        }
        if(msg.guild.region === "japan") {
            var konum = 'Türkiye :flag_tr:'
        }
        var tarih = ''
        if(moment(msg.guild.createdAt).format('MM') === '01') {
            var tarih = `${moment(msg.guild.createdAt).format('DD')} Ocak ${moment(msg.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(msg.guild.createdAt).format('MM') === '02') {
            var tarih = `${moment(msg.guild.createdAt).format('DD')} Şubat ${moment(msg.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(msg.guild.createdAt).format('MM') === '03') {
            var tarih = `${moment(msg.guild.createdAt).format('DD')} Mart ${moment(msg.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(msg.guild.createdAt).format('MM') === '04') {
            var tarih = `${moment(msg.guild.createdAt).format('DD')} Nisan ${moment(msg.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(msg.guild.createdAt).format('MM') === '05') {
            var tarih = `${moment(msg.guild.createdAt).format('DD')} Mayıs ${moment(msg.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(msg.guild.createdAt).format('MM') === '06') {
            var tarih = `${moment(msg.guild.createdAt).format('DD')} Haziran ${moment(msg.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(msg.guild.createdAt).format('MM') === '07') {
            var tarih = `${moment(msg.guild.createdAt).format('DD')} Temmuz ${moment(msg.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(msg.guild.createdAt).format('MM') === '08') {
            var tarih = `${moment(msg.guild.createdAt).format('DD')} Ağustos ${moment(msg.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(msg.guild.createdAt).format('MM') === '09') {
            var tarih = `${moment(msg.guild.createdAt).format('DD')} Eylül ${moment(msg.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(msg.guild.createdAt).format('MM') === '10') {
            var tarih = `${moment(msg.guild.createdAt).format('DD')} Ekim ${moment(msg.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(msg.guild.createdAt).format('MM') === '11') {
            var tarih = `${moment(msg.guild.createdAt).format('DD')} Kasım ${moment(msg.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(msg.guild.createdAt).format('MM') === '12') {
            var tarih = `${moment(msg.guild.createdAt).format('DD')} Aralık ${moment(msg.guild.createdAt).format('YYYY HH:mm:ss')} `
        }

        const embed = new RichEmbed()
            .setThumbnail(msg.guild.iconURL)
            .addField(`❯ Sunucu Adı:`, msg.guild.name, true)
            .addField(`❯ Sunucu Sahibi:`, msg.guild.owner.user.username, true)
            .addField(`❯ ID:`, msg.guild.id, true)
            .addField(`❯ Oluşturulma Tarihi:`, tarih, true)
            .addField(`❯ Üye Sayısı:`, `👤Toplam: ${msg.guild.members.size} \n${this.client.emojis.get('466955711910248458')}Çevrimiçi: ${msg.guild.members.filter(m => m.user.presence.status === "online").size} \n${this.client.emojis.get('466955726674460673')}Rahatsız Etmeyin: ${msg.guild.members.filter(m => m.user.presence.status === "dnd").size} \n${this.client.emojis.get('466955712887783424')}Boşta: ${msg.guild.members.filter(m => m.user.presence.status === "idle").size} \n${this.client.emojis.get('466955726145847326')}Çevrımdışı/Görünmez: ${msg.guild.members.filter(m => m.user.presence.status === "offline").size} \n${this.client.emojis.get('466955726250573824')}Bot: ${msg.guild.members.filter(m => m.user.bot).size}`, true)
            .addField(`❯ Kanal Sayısı:`, `➕Toplam: ${msg.guild.channels.size} \n📝Yazı: ${msg.guild.channels.filter(c => c.type === "text").size} \n🔊Sesli: ${msg.guild.channels.filter(c => c.type === "voice").size} \n📋Kategori: ${msg.guild.channels.filter(c => c.type === "category").size}`, true)
            .addField(`❯ Sunucu Bölgesi:`, konum, true)
            .addField(`❯ Doğrulama seviyesi`, `${verificationLevels[msg.guild.verificationLevel]}`, true)
            .addField(`❯ Sakıncalı İçerik Filtresi:`, `${filterLevels[msg.guild.explicitContentFilter]}`, true)
            .addField(`❯ Rol Sayısı:`, `${msg.guild.roles.size}`, true)
            .addField(`❯ Roller:`, `<@&${msg.guild.roles.map(role => `${role.id}`).join('>, <@&')}>`, true)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(`Sunucu Bilgi`)
            return msg.embed(embed);
    }
};
