const { SlashCommandBuilder, EmbedBuilder, hyperlink, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { CommandBuilder, Message, Interaction } = require('handler.djs');

module.exports = new CommandBuilder()
.setName('channel')
.setDescription('set drop channel .')
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

   

    const PrizeEmbed = new EmbedBuilder()
    .setColor('DarkButNotBlack')
    .setImage('https://media.discordapp.net/attachments/1059578313682722816/1129045953211547648/Picsart_23-07-13_16-44-09-995.png?width=953&height=399')

    const Buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('1').setStyle(ButtonStyle.Secondary).setLabel('1 1️⃣').setDisabled(true),
        new ButtonBuilder().setCustomId('2').setStyle(ButtonStyle.Secondary).setLabel('2 2️⃣').setDisabled(true),
        new ButtonBuilder().setCustomId('3').setStyle(ButtonStyle.Secondary).setLabel('3 3️⃣').setDisabled(true),
        new ButtonBuilder().setCustomId('4').setStyle(ButtonStyle.Secondary).setLabel('4 4️⃣').setDisabled(true)
    )

    const m = await interaction.guild.channels.cache.get(channelId).send({ embeds: [PrizeEmbed], components: [Buttons] });

    db.drop.channelId = m.channel.id;
    db.drop.MessageId = m.id;
    db.save();

    const embed = new EmbedBuilder()
    .setColor('Blue')
    .setDescription(`> **Drops channel ${hyperlink('now', `https://discord.com/channels/${interaction.guild.id}/${channelId}`)}** !`)

   interaction.reply({ embeds: [embed] });
};