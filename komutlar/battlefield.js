const Discord = require("discord.js");
const BattlefieldStats = require('battlefield-stats');
const API_KEY = "b0b58398-fc73-4538-b241-ecaa2105b588";
const bf = new BattlefieldStats(API_KEY);


exports.run = async (bot, message, args) => {
     
    message.delete();

    const params = {
      platform: bf.Platforms.PS4, // also you can use XBOX or PS4 
      displayName: "TheCrystalStar", // Or you can use personaId 
      game: 'bf4' // default is tunguska, can be changed to bf4 
    }
    
    if (args.length < 1) {
        return message.channel.send("Kullanım: xe!battlefield <kullanıcıadı> <XBOX/PS4/PC>")
    }

    username = args[0];
    params.displayName = username;

    switch (args[1].toUpperCase()) {
        case "XBOX":
            params.platform = bf.Platforms.XBOX;
        break;
        case "PS4":
            params.platform = bf.Platforms.PS4;
        break;
        case "PC":
            params.platform = bf.Platforms.PC;
        break;
    }

    bf.Stats.detailedStats(params, (error, response) => {
        if (!error && response) {

            let embed = new Discord.RichEmbed()
            .setTitle('')
            .setAuthor(response.profile.displayName)
            .setColor("RANDOM")
            .addField("Katliamlar", response.result.avengerKills, true)
            .addField("Ödül puanı", response.result.awardScore, true)
            .addField("Toplam Öldürme", response.result.basicStats.kills, true)
            .addField("Toplam Ölüm", response.result.basicStats.deaths, true)
            .addField("Kazanılan Oyunlar", response.result.basicStats.wins, true)
            .addField("Yapılan Zararlar", response.result.basicStats.losses, true)
            .addField("Dakikada Toplam Öldürme", response.result.basicStats.kpm, true)
            .addField("Oynanılan Oyun Zamanı", response.result.basicStats.timePlayed, true)
            .addField("Beceri", response.result.basicStats.skill + "%", true)
            .addField("Bonus Skor", response.result.bonusScore, true)
            .addField("Alınan Etiketler", response.result.dogtagsTaken, true)
            .addField("Favorileri", response.result.favoriteClass, true)
            .addField("Yakalanan Bayraklar", response.result.flagsCaptured, true)
            .addField("Savunulan Bayraklar", response.result.flagsDefended, true)
            .addField("Kafa vuruşları", response.result.headShots, true)
            .addField("İyileştirdiği Oyuncular", response.result.heals, true)
            .addField("K/D", response.result.kdr, true)//
            .addField("Yapılan Asist'ler", response.result.killAssists, true)
            .addField("En Uzun Kafa Vuruşu", response.result.longestHeadShot + "/m", true)
            .addField("Hızlı Öldürme Sayısı", response.result.nemesisKills, true)
            .addField("Toplam Streak Vuruşlar", response.result.nemesisKillStreak, true)
            .addField("Yapılan Tamirat'lar", response.result.repairs, true)
            .addField("Toplam Canlanma", response.result.revives, true)
            .addField("Oynanılan Oyunlar", response.result.roundsPlayed, true)
            .setThumbnail('https://spuf.org/wp-content/uploads/2016/10/bfmain.png');

            message.channel.send(embed);
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
  name: 'battlefield',
  description: 'İstediğiniz kişiyi sunucudan yasaklar.',
  usage: 'ban [kullanıcı] [sebep]'
};
