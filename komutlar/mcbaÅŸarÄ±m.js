const snekfetch = require('snekfetch');

exports.run = (client, msg, args) => {
  let [title, contents] = args.join(" ").split("-");
  if(!contents) {
    [title, contents] = ["Basarim Kazanildi", title];
  }
  let rnd = Math.floor((Math.random() * 39) + 1);
  if(args.join(" ").toLowerCase().includes("burn")) rnd = 38;
  if(args.join(" ").toLowerCase().includes("cookie")) rnd = 21;
  if(args.join(" ").toLowerCase().includes("cake")) rnd = 10;
  if(args.join(" ").toLowerCase().includes("sword")) rnd = 34;

  if(title.length > 22 || contents.length > 22) return msg.edit("Maksimum uzunluk 22 karakter.").then(msg.delete.bind(msg), 2000);
  const url = `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`;
  snekfetch.get(url)
   .then(r=>msg.channel.send("", {files:[{attachment: r.body}]}));
  msg.delete();

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["mcbaşarım"]
};

exports.help = {
  name: 'mcbaşarım',
  description: 'Minecraft başarımı gönderir.',
  usage: 'başarım Title|Text (/achievement Achievement Get|Used a Command!)'
};