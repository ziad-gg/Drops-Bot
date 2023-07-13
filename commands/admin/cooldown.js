const { SlashCommandBuilder, EmbedBuilder, hyperlink } = require('discord.js');
const { CommandBuilder, Message, Interaction } = require('handler.djs');
const ms = require('ms');

module.exports = new CommandBuilder()
.setName('cooldown')
.setDescription('set drop cooldown time')
.InteractionOn(new SlashCommandBuilder()
    .setDMPermission(false)
    .addStringOption(op => op
     .setName('cooldown')
     .setDescription('choose drop cooldown here .')
     .addChoices(
       { name: '1d', value: ms('1d').toString() },
       { name: '20h', value: ms('20h').toString() },
       { name: '10h', value: ms('10h').toString() },
       { name: '5h', value: ms('5h').toString() },
       { name: '3h', value: ms('3h').toString() },
       { name: '2h', value: ms('2h').toString() },
       { name: '1h', value: ms('1h').toString() },
     )  
     .setRequired(true)
    )
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
    const cooldown = +interaction[0];
    const db = await global;

    db.drop.cooldown = cooldown;
    db.save();

    const embed = new EmbedBuilder()
    .setColor('Blue')
    .setDescription(`> **Drop cooldown updated to be ${ms(cooldown, { long: true })}** !`)

   interaction.reply({ embeds: [embed] });
};