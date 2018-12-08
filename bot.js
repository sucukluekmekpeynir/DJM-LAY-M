const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

// Müzik Komutu // // API KODU DC DE //

const { GOOGLE_API_KEY } = require('./anahtarlar.json');
const YouTube = require('simple-youtube-api');
const queue = new Map();  
const youtube = new YouTube(GOOGLE_API_KEY);
const ytdl = require('ytdl-core');

client.on('message', async msg => {

	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(prefix)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);
	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(prefix.length)

	if (command === 'çal') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
    .setDescription(' :x: | İlk olarak sesli bir kanala giriş yapmanız gerek.'));
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(' :x: | İlk olarak sesli bir kanala giriş yapmanız gerek.'));
		}
		if (!permissions.has('SPEAK')) {
			 return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle(' :mute: | Şarkı başlatılamıyor. Lütfen mikrofonumu açınız.'));
        }

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			 return msg.channel.sendEmbed(new Discord.RichEmbed)
      .setTitle(`** :white_check_mark: | Oynatma Listesi: **${playlist.title}** Kuyruğa Eklendi!**`)
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
         
				 msg.channel.sendEmbed(new Discord.RichEmbed()                  
         .setTitle('Kralbot | Şarkı Seçimi')
         .setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
         .setFooter('Lütfen 1-10 arasında bir rakam seçiniz 10 saniye içinde liste iptal edilecektir.')
         .setColor('0x36393E'));
          msg.delete(5000)
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						 return msg.channel.sendEmbed(new Discord.RichEmbed()
            .setColor('0x36393E')
            .setDescription(' :x: | **Şarkı Değeri Belirtmediğiniz İçin Seçim İptal Edilmiştir**.'));
                    }
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.sendEmbed(new Discord.RichEmbed()
          .setColor('0x36393E')
          .setDescription(' :x: | **Aradaım Fakat Hiç Bir Sonuç Çıkmadı**'));
                }
            }
			return handleVideo(video, msg, voiceChannel);
      
		}
	} else if (command === 'geç') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(' :speaker: | **Lütfen öncelikle sesli bir kanala katılınız**.'));
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
     .setColor('RANDOM')
     .setTitle(' :x: | **Hiç Bir Müzik Çalmamakta**'));                                              
		serverQueue.connection.dispatcher.end('**Müziği Geçtim!**');
		return undefined;
	} else if (command === 'durdur') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('** :speaker: | Lütfen öncelikle sesli bir kanala katılınız.**'));
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
     .setColor('RANDOM')
     .setTitle(' :speaker: | Hiç Bir Müzik Çalmamakta**'));                                              
		msg.channel.send(`:stop_button: **${serverQueue.songs[0].title}** Adlı Müzik Durduruldu`);
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('**Müzik Bitti**');
		return undefined;
	} else if (command === 'ses') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription( ' :speaker: **| Lütfen öncelikle sesli bir kanala katılınız.**'));
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
     .setColor('RANDOM')
     .setTitle(' :x: | **Hiç Bir Müzik Çalmamakta**'));                                              
		if (!args[1]) return msg.channel.sendEmbed(new Discord.RichEmbed()
   .setTitle(`:loud_sound: Şuanki Ses Seviyesi: **${serverQueue.volume}**`)
    .setColor('RANDOM'))
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle(`:loud_sound: Ses Seviyesi Ayarlanıyor: **${args[1]}**`)
    .setColor('RANDOM'));                             
	} else if (command === 'çalan') {
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle(" :mute: | **Çalan Müzik Bulunmamakta**")
    .setColor('RANDOM'));
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle("Kralbot | Çalan")                            
    .addField('Başlık', `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`, true)
    .addField("Süre", `${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`, true))
	} else if (command === 'sıra') {
    let index = 0;
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle(" :x: | **Sırada Müzik Bulunmamakta**")
    .setColor('RANDOM'));
		  return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
     .setTitle('Kralbot | Şarkı Kuyruğu')
    .setDescription(`${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n')}`))
    .addField('Şu anda çalınan: ' + `${serverQueue.songs[0].title}`);
	} else if (command === 'duraklat') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle(" :pause_button: Müzik Senin İçin Durduruldu!")
      .setColor('RANDOM'));
		}
		return msg.channel.send(' :mute: | **Çalan Müzik Bulunmamakta**');
	} else if (command === 'devam') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle(" :arrow_forward: Müzik Senin İçin Devam Etmekte!**")
      .setColor('RANDOM'));
		}
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle("** :mute: | Çalan Müzik Bulunmamakta.**")
    .setColor('RANDOM'));
	}
  

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
    console.log(video);
    const song = {
        id: video.id,
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
        durations: video.duration.seconds,
    views: video.views,
    };
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`<:basarisiz:474973245477486612> **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`);
			queue.delete(msg.guild.id);
			return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle(`<:basarisiz:474973245477486612> **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`)
      .setColor('RANDOM'))
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle(` :white_check_mark: **${song.title}** Adlı Müzik Kuyruğa Eklendi!`)
    .setColor('RANDOM'))
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === ' :speedboat: | **Yayın Akış Hızı Yeterli Değil.**') console.log('Müzik Bitti.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	 serverQueue.textChannel.sendEmbed(new Discord.RichEmbed()                                   
  .setTitle("**Kralbot | 🎙 Müzik Başladı**",`https://cdn.discordapp.com/avatars/473974675194511361/6bb90de9efe9fb80081b185266bb94a6.png?size=2048`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .addField('\nBaşlık', `[${song.title}](${song.url})`, true)
  .addField("\nSes Seviyesi", `${serverQueue.volume}%`, true)
  .addField("Süre", `${song.durationm}:${song.durations}`, true)
  .setColor('RANDOM'));
}

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'link') {
    msg.reply('https://kralbotdiscord.wordpress.com/');
  }
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

////////////////////////

client.on("guildMemberAdd", member => {
	
	var channel = member.guild.channels.find("name", "giriş-çıkış");
	if (!channel) return;
	
	var role = member.guild.roles.find("name", "Kafadar Ailesi");
	if (!role) return;
	
	member.addRole(role); 
	
	channel.send(member + " Artık " + role + " İle Botumuzu Desteklemek İçin Sunucuya Katıldı. ");
	
	member.send("Sunucumuza Hoşgeldin!")
	
});

////////////////////////

client.on("message", async message => {
    if (message.content.toLowerCase() === prefix + "nsfw") {
 if(message.channel.nsfw || message.channel.type === 'dm'){
   let embed = new Discord.RichEmbed()
   .setTitle('+18 Gözlerini Kapa Bence Sonra Uyurmadı Deme :smile: ')
   .setColor(0x00AE86)
   .setImage(("https://cdn.boobbot.us/4k/4k"+ Math.floor(Math.random() * 1460)+".jpg"))
   message.channel.send(embed)
}
 else{
       message.channel.send({embed: {
color: Math.floor(Math.random() * (0xFFFFAD + 2)),
description: ('Bu kanal NSFW kanalı değil.')
 }})
 }
}
});
 
    client.on('message', async msg => {
    if (msg.content.toLowerCase() === prefix + "disko") {
   if (msg.channel.type === "dm") return;
  const rol = 'disko'
  setInterval(() => {
      msg.guild.roles.find(s => s.name === rol).setColor("RANDOM")
      }, 9000);
  }
});

client.on('channelCreate', async channel => {

  console.log(`${channel.name} Kanalı Oluşturuldu`);

if (channel.type != 'text') return;
  let sChannel = channel.guild.channels.find('name', 'log');
  sChannel.send (`${channel} :warning: _Kanalı Oluşturuldu _ :warning: `);

});

client.on('guildMemberAdd', member => {
  let guild = member.guild;
  let joinRole = guild.roles.find('name', 'Üye'); 
  member.addRole(joinRole); 

  const channel = member.guild.channels.find('name', 'giriş-çıkış');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(member.user.username, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setTitle(':inbox_tray: | Sunucuya katıldı!')
  .setTimestamp()
  channel.sendEmbed(embed); 
});

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', 'giriş-çıkış');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(member.user.username, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setTitle(':outbox_tray: | Sunucudan ayrıldı')
  .setTimestamp()
  channel.sendEmbed(embed); 
});

client.on('message', async msg => {
  if (msg.content.toLowerCase() === 'sa') {
    await msg.react('🇦');
    msg.react('🇸');
    msg.reply('**Aleyküm Selam, Hoşgeldin Kardeşim**:two_hearts:')
  }
  });

client.on("message", msg => {
    const uyarıembed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setDescription(":crown: " + msg.author + "Reklam Yapmayı Kes Seni Yetkililere Söyledim :angry: :rage: ")

const dmembed = new Discord.RichEmbed()
    .setTitle("Sunucunda " + msg.author.tag + " reklam yapıyor!")
      .setColor(0x00AE86)
      .setDescription(" " + msg.author.tag + " Sunucunda Reklam Yapıyor k?uyar komutu ile kişiyi uyara bilir k?ban Komutu İle Kişiyi Banlayabilirsin ")
    .addField("Kullanıcının mesajı:", "**" + msg.content + "**")

if (msg.content.toLowerCase().match(/(discord\.gg\/)|(discordapp\.com\/invite\/)/g) && msg.channel.type === "text" && msg.channel.permissionsFor(msg.guild.member(client.user)).has("MANAGE_MESSAGES")) {
    if(msg.member.hasPermission('BAN_MEMBERS')){
    return;
    } else {
    msg.delete(30).then(deletedMsg => {
     deletedMsg.channel.send(uyarıembed)
     msg.guild.owner.send(dmembed).catch(e => {
            console.error(e);
          });
        }).catch(e => {
          console.error(e);
        });
      };
      };
    })

 client.on('message', message => {
    if (message.content.toLowerCase() === prefix + "zekam") {
        var sans = ["11", "15", "20", "24", "28", "31", "39", "45", "49", "54", "58", "63", "67", "77", "73", "84", "80", "83", "96", "94", "99", "Albert Einstein mısın krdşm"];
        var sonuc = sans[Math.floor((Math.random() * sans.length))];
        const embed = new Discord.RichEmbed()
        .addField(`***___Zekan___***`, `${sonuc}`)
        return message.channel.sendEmbed(embed);
    }
    });  
client.on('message', msg => {
if(msg.content === "sa") {
    const dans = client.emojis.get("513376101112872993");
   msg.reply(`**Aleyküm Selam, Hoşgeldin** ${dans}`);
         }
     }
 );

client.on('guildCreate', guild => {
    let channel = client.channels.get("513746526103928843")
        const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Giriş ${guild.name}`)
        .setThumbnail(guild.iconURL)
        .addField("Kurucu", guild.owner)
        .addField("Sunucu ID", guild.id, true)
        .addField("Toplam Kullanıcı", guild.memberCount, true)
        .addField("Toplam Kanal", guild.channels.size, true)
         channel.send(embed);
    });
client.on('guildDelete', guild => {
    let channel = client.channels.get("513746526103928843")
        const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Çıkış ${guild.name}`)
        .setThumbnail(guild.iconURL)
        .addField("Kurucu", guild.owner)
        .addField("Sunucu ID", guild.id, true)
        .addField("Toplam Kullanıcı", guild.memberCount, true)
        .addField("Toplam Kanal", guild.channels.size, true)
         channel.send(embed);
    });

const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class TavsiyeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'davet-oluştur',
            group: 'sunucu',
            memberName: 'davet-oluştur',
            description: 'Bulunduğunuz sunucunun davet linkini verir.',
        });
    }

async run(msg) {
    
    let davet;
    if (msg.channel.permissionsFor(this.client.user).has("CREATE_INSTANT_INVITE")) {
        await msg.channel.createInvite({temporary: false, maxAge: 0, maxUses: 0, unique: false}).then(i => { davet = i.url });
    } else davet = 'Davet linkini almak için yeterli yetkim yok.';

    const embed = new RichEmbed()
    .setColor("RANDOM")
    .setAuthor(msg.guild.name, msg.guild.iconURL)
    .addField(`${msg.guild.name} Sunucusunun Davet Linki`, davet)
    .setThumbnail(msg.guild.iconURL)
    .setTimestamp()
    return msg.channel.send({embed})
    }
}

const Discord = require('discord.js');
const client = new Discord.Client();

function panel1() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513083520910884884`).setName(`????????????????`);
            panel2();
        }, 1000);
      });
}

  function panel2() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513083520910884884`).setName(`????????????????`);
            panel3();
        }, 1000);
      });
  }
  function panel3() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513083520910884884`).setName(`????????????????`);
            panel4();
        }, 1000);
      });
  }
  function panel4() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513083520910884884`).setName(`????????????????`);
            panel5();
        }, 1000);
      });
  }
  function panel5() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513083520910884884`).setName(`????????????????`);
            panel6();
        }, 1000);
      });
  }
  function panel6() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513083520910884884`).setName(`????????????????`);
            panel7();
        }, 1000);
      });
  }
  function panel7() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513083520910884884`).setName(`????????????????`);
            panel8();
        }, 1000);
      });
  }
  function panel8() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513083520910884884`).setName(`????????????????`);
            panel9();
        }, 1000);
      });
  }
  function panel9() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513083520910884884`).setName(`????????????????`);
            panel10();
        }, 1000);
      });
  }
  function panel10() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513083520910884884`).setName(`????????????????`);
            panel11();
        }, 1000);
      });
  }
  function panel11() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513083520910884884`).setName(`????????????????`);
            panela();
        }, 1000);
      });
  }
function panela() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513083520910884884`).setName(`????????????????`);
            panel12();
        }, 1000);
      });
}
function panel12() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513083520910884884`).setName(`????????????????`);
            panel14();
        }, 1000);
      });
}
function panel14() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513083520910884884`).setName(`????????????????`);
            panel15();
        }, 1000);
      });
}
function panel15() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513083520910884884`).setName(`????????????????`);
            panel16();
        }, 1000);
      });
}
function panel16() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513083520910884884`).setName(`????????????????`);
            panel17();
        }, 1000);
      });
}
function panel17() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513083520910884884`).setName(`????????????????`);
            panel18();
        }, 1000);
      });
}
function panel18() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513083520910884884`).setName(`????????????????`);
            panel1();
        }, 1000);
      });
}

 client.on('ready', async message => {
   panel1();

})





function bpanel1() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513363353230639105`).setName(`????????????????`);
            bpanel2();
        }, 1000);
      });
}

  function bpanel2() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513363353230639105`).setName(`????????????????`);
            bpanel3();
        }, 1000);
      });
  }
  function bpanel3() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513363353230639105`).setName(`????????????????`);
            bpanel4();
        }, 1000);
      });
  }
  function bpanel4() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513363353230639105`).setName(`????????????????`);
            bpanel5();
        }, 1000);
      });
  }
  function bpanel5() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513363353230639105`).setName(`????????????????`);
            bpanel6();
        }, 1000);
      });
  }
  function bpanel6() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513363353230639105`).setName(`????????????????`);
            bpanel7();
        }, 1000);
      });
  }
  function bpanel7() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513363353230639105`).setName(`????????????????`);
            bpanel8();
        }, 1000);
      });
  }
  function bpanel8() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513363353230639105`).setName(`????????????????`);
            bpanel9();
        }, 1000);
      });
  }
  function bpanel9() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513363353230639105`).setName(`????????????????`);
            bpanel10();
        }, 1000);
      });
  }
  function bpanel10() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513363353230639105`).setName(`????????????????`);
            bpanel11();
        }, 1000);
      });
  }
  function bpanel11() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513363353230639105`).setName(`????????????????`);
            bpanela();
        }, 1000);
      });
  }
function bpanela() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513363353230639105`).setName(`????????????????`);
            bpanel12();
        }, 1000);
      });
}
function bpanel12() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513363353230639105`).setName(`????????????????`);
            bpanel14();
        }, 1000);
      });
}
function bpanel14() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513363353230639105`).setName(`????????????????`);
            bpanel15();
        }, 1000);
      });
}
function bpanel15() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513363353230639105`).setName(`????????????????`);
            bpanel16();
        }, 1000);
      });
}
function bpanel16() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513363353230639105`).setName(`????????????????`);
            bpanel17();
        }, 1000);
      });
}
function bpanel17() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513363353230639105`).setName(`????????????????`);
            bpanel18();
        }, 1000);
      });
}
function bpanel18() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`513363353230639105`).setName(`????????????????`);
            bpanel1();
        }, 1000);
      });
}
 client.on('ready', async message => {
   bpanel1();

})






function cpanel1() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`512743165531521039`).setName(`KEYİFLİ SOHBETLER`);
            cpanel2();
        }, 10000);
      });
}

  function cpanel2() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`512743165531521039`).setName(`DİLERİZ`);
            cpanel3();
        }, 10000);
      });
  }
  function cpanel3() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`512739499466424352`).setName(`Kralbot'U`);
            cpanel4();
        }, 10000);
      });
  }
  function cpanel4() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`512739499466424352`).setName(`EKLEMYİ UNUTMA!`);
            cpanel5();
        }, 10000);
      });
  }
  function cpanel5() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`512739499466424354`).setName(`???????????????????`);
            cpanel6();
        }, 10000);
      });
  }
  function cpanel6() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`512739499466424352`).setName(`YETKİLİ = SÜLEYMAN YILDIZ`);
            cpanel7();
        }, 10000);
      });
  }
  function cpanel7() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`512739499466424352`).setName(`PREFİX [k?]`);
            cpanel8();
        }, 10000);
      });
  }
  function cpanel8() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`512743165531521039`).setName(`EĞLENCELİ SOHBETLER`);
            cpanel9();
        }, 10000);
      });
  }
  function cpanel9() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`512743165531521039`).setName(`DİLERİZ`);
            cpanel10();
        }, 10000);
      });
  }
  function cpanel10() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`512743165531521039`).setName(`KRALBOT`);
            cpanel11();
        }, 10000);
      });
  }
  function cpanel11() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`512743165531521039`).setName(`RESMİ SUNUCUSU`);
            cpanel1();
        }, 10000);
      });
  }
 client.on('ready', async message => {
   cpanel1();
 })

function ipanel1() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`512739378427068436`).setName(`SUNUCU: ${client.guilds.size}`);
            ipanel2();
        }, 6000);
      });
}

function ipanel2() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`512740179568754718`).setName(`KULLANICI: ${client.users.size}`);
            ipanel1();
        }, 6000);
      });
}

 client.on('ready', async message => {
   ipanel1();
 })

client.on("guildMemberAdd", member => {

  if (db.has(`otoR_${member.guild.id}`) === false) return;
  var rol = member.guild.roles.get(db.fetch(`otoR_${member.guild.id}`));
  if (!rol) return;
  
  member.addRole(rol)
  
})

client.login(process.env.BOT_TOKEN);
