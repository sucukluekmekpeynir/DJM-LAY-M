const Discord = require("discord.js");
const apikey = require("../keys.json");
const RocketLeague = require("rocketleague");
const rl = new RocketLeague.Client(apikey.rl);

exports.run = async (bot, message, args) => {

    //!rocketleague username<username = args[1]-...>
    let username = args.join(" ").slice(0);

    let data = rl.search(username).then(data => {

        let platform = data.data[0].platform.name;
        let dName = data.data[0].displayName;
        let wins = data.data[0].stats.wins;
        let goals = data.data[0].stats.goals;
        let mvps = data.data[0].stats.mvps;
        let saves = data.data[0].stats.saves;
        let shots = data.data[0].stats.shots;
        let assists = data.data[0].stats.assists;

        let embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("Kullanıcı İstatistikleri")
        .setThumbnail('https://images-na.ssl-images-amazon.com/images/I/81LXUOTmcGL._SX342_.jpg')
        .addField("Gözüken İsim", dName, true)
        .addField("Kazanılan Maçlar", wins, true)
        .addField("Vurulan Goller", goals, true)
        .addField("Yaptığı MVP'ler", mvps, true)
        .addField("Yaptığı Save'ler", saves, true)
        .addField("Yaptığı Asist'ler", assists, true)
        .setFooter('');

        message.delete();
        message.channel.send(embed);
    }).catch(e => {
        console.log(e);
        message.channel.send(" Bu kullanıcı veritabanında bulunamadı!");
    });
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rocketleague'],
  permLevel: 0
};

exports.help = {
  name: 'rocketleague',
  description: 'Yazdığınız yazıyı qr a verir.',
  usage: 'qr yazı'
};