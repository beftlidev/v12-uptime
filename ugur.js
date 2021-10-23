const express = require("express");
const app = express();
app.listen(() => console.log("Sunucu başladı"));
app.use('/ping', (res) => {
  res.send(new Date());
});
require("express")().listen(1343);
const Discord = require('discord.js');
const fetch = require("node-fetch");
const db = require("croxydb");
const client = new Discord.Client();
const disbut = require('discord-buttons');
disbut(client);
const {MessageButton} = require("discord-buttons") 
const prefix = "u.";
setInterval(() => {
  var links = db.get("linkler");
  if(!links) return;
  var linkA = links.map(c => c.url)
  linkA.forEach(link => {
    try {
      fetch(link)
    } catch(e) {
      console.log("Alt" + e)
     };
     console.log("Üst");
  });
  
}, 60000);
client.on("ready", () => {
if(!Array.isArray(db.get("linkler"))) {
db.set("linkler", [])
}
});

let b1 = new MessageButton() 
.setStyle("red") 
.setID("sil")
.setLabel("Uptime Sil")
.setEmoji("🚮") 
let b2 = new MessageButton()
.setStyle("gray") 
.setID("bilgi")
.setLabel("Uptime Bilgi")
.setEmoji("ℹ") 
let b1b = new MessageButton() 
.setStyle("red") 
.setID("sil")
.setLabel("Uptime Sil")
.setEmoji("🚮") 
.setDisabled() 
let b2b = new MessageButton()
.setStyle("gray") 
.setID("bilgi")
.setLabel("Uptime Bilgi")
.setEmoji("ℹ") 
.setDisabled()

client.on("ready", () => {
setInterval(() => {
  client.user.setActivity(`u.yardım | Merhaba 👋!`)
}, 7000);
});
client.on('message', message => { 
  if(message.author.bot) return;
  let embed = new Discord.MessageEmbed().setColor("#ffe352");
  if(message.content === prefix + 'yardım') {
    
let yardım = new Discord.MessageEmbed() 
.setDescription(`<:kalem:857937104323215360> Prefixim: **u.**
`) 
.addField("*u.ekle*","Uptime falan eklersiniz. Aman site Google olmasın :D. ")
.addField("*u.i*", "Botun bazı bilgilerini alırsınız. ") 
message.channel.send(yardım);
  };
  if (message.content === prefix + "i") {

  
  let bilgi = new Discord.MessageEmbed()

    .setColor("RANDOM") 

    .setAuthor("İstatistik") 

    .addField("<:sw:856408155184955402> Toplam sunucu", `${client.guilds.cache.size}.`) 

    .addField("<:member:856408299229151242> Toplam Kullanıcı", `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}.`) 

    .addField("<:emoji_41:866556150044033064> Pingim", `${client.ws.ping}.`) 

    
    .addField("<:discordjs:886987041437519972> Discord.js Sürümü", `${Discord.version}`, true)

    .addField("<a:vds:886987302428102686> Bellek Kullanımı", `${(process.memoryUsage().heapUsed / 2024 / 2024).toFixed(2)} MB`, true)

    .addField(`<a:uptime:886987717282500629> Toplam Uptime Edilen Yer`, `${db.fetch(`toplam_uptime`)}.`, true)
.addField(`<a:uptime:886987717282500629> Toplam Eklediğin Uptime`, `${db.fetch(`toplam_uptime_${message.author.id}`) || "0"}.`, true)

    .addField("<:owner:850625005548470273> Yapımcım & Geliştirici", "<@753842258457002036>")

.setTimestamp()

  message.channel.send(bilgi);
  };
  if(message.content.startsWith(prefix + "uptime")) {
  var link = message.content.split(" ").slice(1).join(" ");

  fetch(link).then(() => {
    if(db.get("linkler").map(z => z.url).includes(link)) {
      embed.setColor("#f50909");
      embed.setTitle("<:blurplecross:881423084651962439> KAPUSKA!");
      embed.setDescription(`Bu bağlantı zaten sistemde d-dostum!`)
.setFooter(`${link}`);
      message.channel.send(embed);
      return;
    };
    embed.setColor("#32ff80");
    embed.setTitle("<:blurplecheck:881423053245009990> BADA BİM BADA BAM!");
    embed.setDescription(`Garip işler sonucu linkini ekledim d-dostum`) 
.setFooter(`${link}`);
    message.channel.send({embed: embed
buttons: [b1, b2]});
db.add(`toplam_uptime`, 1) 
db.add(`toplam_uptime_${message.author.id}`, 1)
db.set(`${link}_sahip`, message.author.id) 
    db.push("linkler", { url: link, owner: message.author.username});
  }).catch(e => {
    embed.setDescription(e);
    message.channel.send(embed);
    return;
  });
  };
});
client.on('clickButton', button => { 
if(button.id == "sil") {
await button.defer() 
let e = new Discord.MessageEmbed() 
.setTitle("<:blurplecheck:881423053245009990> YaaY!")
.setDescription(`Link silindi!
Link: ${button.embeds[0].footer.text}`) 
db.delete(`button.embeds[0].footer.text`)
button.message.edit({embed: button.message.embeds[0], buttons: [b1b, b2b]}) 
button.author.send(e)
} 
if(button.id == "bilgi") {
let embed = new Discord.MessageEmbed() 
.setDescription(`Link: ${button.embeds[0].footer.text} 
Ekleyen: <@${db.fetch(`${button.embeds[0].footer.text}_sahip`)>
`) 
} 
}) 
client.login(process.env.TOKEN); 
