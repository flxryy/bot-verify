require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.content === '!verify') {
    const role = message.guild.roles.cache.find(r => r.name === 'Verified');
    if (!role) return message.reply('❌ "Verified" role not found.');

    try {
      await message.member.roles.add(role);
      message.reply('🎉 You have been verified!');
    } catch (err) {
      console.error(err);
      message.reply('⚠️ Failed to assign role.');
    }
  }
});

client.login(process.env.TOKEN);
