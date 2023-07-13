const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { CommandBuilder, Message, Interaction } = require('handler.djs');

module.exports = new CommandBuilder()
.setName('prize')
.setDescription('set drop prize .')
.InteractionOn(new SlashCommandBuilder()
    .setDMPermission(false)
    .addStringOption(op => op.setName('prize').setDescription('Set drop prize here').setRequired(true))
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
    const prize = interaction[0];
    const db = await global;
    

    db.drop.prize = prize;
    db.save();

    const embed = new EmbedBuilder()
    .setColor('Blue')
    .setDescription(`> **next prize with the coming drop will be ${db.drop.prize}** !`)

   interaction.reply({ embeds: [embed] });
};