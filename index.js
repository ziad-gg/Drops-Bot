const { Client, GatewayIntentBits } = require('discord.js');
const { Application } = require('handler.djs');
const path = require('node:path');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences
  ]
});

new Application(client, {
  prefix: '-',
  commandsPath: path.join(__dirname, 'commands'),
  EventsPath: path.join(__dirname, 'events'),
  validationPath: path.join(__dirname, 'validations'),
  owners: [],
});


client.Application.build();

client.login(process.env.BOT_TOKEN);

