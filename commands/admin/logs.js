const { SlashCommandBuilder, EmbedBuilder, hyperlink } = require('discord.js');
const { CommandBuilder, Message, Interaction } = require('handler.djs');

module.exports = new CommandBuilder()
.setName('logs')
.setDescription('set drop log channel .')
.InteractionOn(new SlashCommandBuilder()
    .setDMPermission(false)
    .addChannelOption(op => op.setName('channel').setDescription('Set drop logs channel here').addChannelTypes(0).setRequired(true))
)
.setGlobal(GlobalExecution)
.setInteractionExecution(InteractionExecution)
.isSubCommand()

/**
 * 
 * @param {Message} message 
 * @param {Interaction} interaction 
*/

async function GlobalExecution(message, interaction, global) {
    return global
};

/**
 * 
 * @param {Interaction} interaction 
 * @param {Promise<{}>} global 
 */

async function InteractionExecution(interaction, global) {
    const channelId = interaction[0];
    const db = await global;

    db.drop.logsId = channelId;
    db.save();

    const embed = new EmbedBuilder()
    .setColor('Blue')
    .setDescription(`> **All logs will be ${hyperlink('here', `https://discord.com/channels/${interaction.guild.id}/${channelId}`)}** !`)

   interaction.reply({ embeds: [embed] });
};