const Discord = require('discord.js');
const client = new Discord.Client();

let prefix = `12/`; 
const creator = `327872942124040192`;

function err (reason, missPerms) {
  if (!missPerms) {
      const embed = new Discord.RichEmbed()
      .setTitle("Произошла ошибка")
      .setColor("282b30")
      .setDescription('Причина : **' + reason + '**')
      .setTimestamp();
      return message.channel.send({embed})
  }
  const embed = new Discord.RichEmbed()
      .setTitle("Недостаточно прав")
      .setColor("282b30")
      .setDescription('Вы не можете использовать эту команду\nУ вас должно быть право `' + missPerms + '`')
      .setTimestamp();
      return message.channel.send({embed})
} 

function rep() {
  client.guilds.get('438026942068031490').channels.get('518139909685379102').send('.rep <@327872942124040192>');
  }
  
  function dailyMoney() {
      client.guilds.get('438026942068031490').channels.get('518139909685379102').send('.daily');
  }  

client.on('ready', () => {
	console.log('//------------------//');
    console.log('Бот запущен успешно.');
    console.log('');
    console.log('Краткая информация:');
    console.log('- Авторизован как ' + client.user.tag);
    console.log('//------------------//');
    client.user.setPresence({game: {name: null}}).catch(o_O=>{});
    client.user.setStatus('idle');
    dailyMoney();
    setInterval(dailyMoney, 86400000);
    rep();
    setInterval(rep, 86400000);

});
 
client.on('message', message => {
  
  if(message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'say') {
    message.delete();
    message.channel.send(args.join(" ")).catch(() => {return err('Не указано сообщение')});
}

if (command === "setav"){
  client.user.setAvatar('https://cdn.discordapp.com/attachments/475264609230782464/514493999634186250/72ed55cec194dbe359fa755a2380dd97.jpg');
}

if (command === 'eval') {
  if (message.author.id !== creator) return message.channel.send('Доступ запрещен.');
  const code = args.join(" ").replace(/client\.token|client\[.token.\]/ig, 'process.env.TOKEN');        
  const token = client.token.split("").join("[^]{0,2}");
  const rev = client.token.split("").reverse().join("[^]{0,2}");
  const filter = new RegExp(`${token}|${rev}`, "g");
  try {
      let output = eval(code);
      if (output instanceof Promise || (Boolean(output) && typeof output.then === "function" && typeof output.catch === "function")) output = output;
      output = inspect(output, { depth: 0, maxArrayLength: null });
      output = output.replace(filter, "[TOKEN]");
      output = clean(output);
      if (output.length < 1950) message.channel.send(`\`\`\`js\n${output}\n\`\`\``).then(() => {message.react("✅")});
      else message.channel.send(`${output}`, {split:"\n", code:"js"});
  } catch (error) {message.channel.send(`Анхэндлэд промайз риджекшн ворнинг \`\`\`js\n${error}\`\`\``).then(() => {message.react("❎");});}
  function clean(text)  {
      return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
  }
}

});

client.login(process.env.TOKEN);