module.exports.run = async (client, msg, args) => {
    if(!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send({embed: {
      color: Math.floor(Math.random() * (0xFFFFFF + 1)),
      description: (":x:  Yetkin yok!")
    }})
    
                let susturulacak = msg.guild.member(msg.mentions.users.first()) || msg.guild.member(args[0]);
                if(!susturulacak) return msg.channel.send({embed: {
      color: Math.floor(Math.random() * (0xFFFFFF + 1)),
      description: (":x: Bir kişiyi susturduysan ve bunu kaldırmak istiyorsan öncelikle o kişiyi etiketlemelisin.")
    }})
    
                let role = msg.guild.roles.find(r => r.name === "susturulmuş");
    
              if(!role || !susturulacak.roles.has(role.id)) return msg.channel.send({embed: {
      color: Math.floor(Math.random() * (0xFFFFFF + 1)),
      description: (":x: Bu kullanıcı zaten cezalı değil.")
    }});
    
              susturulacak.removeRole(role);
              msg.channel.send({embed: {
      color: Math.floor(Math.random() * (0xFFFFFF + 1)),
      description: ("Cezası başarıyla kalktı.")
    }})
          }
          
          
          
     exports.conf = {
      enabled: true,
      guildOnly: true,
      aliases: ['unmute'],
      permLevel: 0
    };
    
    exports.help = {
      name: 'susturaç',
      description: 'İstediğiniz kişinin eğer susturulduysa susturunu açar.',
      usage: 'susturaç'
    };