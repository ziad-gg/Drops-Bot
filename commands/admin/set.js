const GuildsSchema = require('../../database/models/GuildsSchema');
const { SlashCommandBuilder } = require('discord.js');
const { CommandBuilder, Message, Interaction } = require('handler.djs');

module.exports = new CommandBuilder()
.setName('set')
.setDescription('Controll drop settings .')
.InteractionOn(new SlashCommandBuilder())
.setSubcommands([
    { command: 'logs', group: 'drop' },
    { command: 'prize', group: 'drop' },
    { command: 'channel', group: 'drop' },
])
.OwnersOnly()
.setGlobal(Execute)

/**
 * 
 * @param {Message} message 
 * @param {Interaction} interaction 
*/

async function Execute (message, interaction) {
    if (message) return;
    const GuildSchema = await GuildsSchema.get(interaction.guild.id);

    return GuildSchema;
};