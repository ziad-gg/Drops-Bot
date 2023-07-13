const { EventBuilder } = require('handler.djs');
const GuildsSchema = require('../database/models/GuildsSchema');
const humanizeDuration = require("humanize-duration");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, time } = require('discord.js');
const ms = require('ms');
const rn = require('random-number');

module.exports = new EventBuilder()
    .setEvent('ButtonClick')
    .setExecution(Execute)

/**
 * 
 * @param {import('discord.js').Interaction} interaction 
 */
async function Execute(interaction) {

    const selector = interaction.customId;
    const guild = await GuildsSchema.get(interaction.guild.id);
    const DropData = guild.drop.currentDrop;

    const Played = DropData.users.find(user => user.Winner === false && user.userId === interaction.user.id);
    const Winner = DropData.users.find(user => user.Winner === true);
    if (Winner) return interaction.reply({ content: `باختيار الصندوق الصحيح بالفعل <@${Winner.userId}> قام` + ' 🎉', ephemeral: true });
   

    if (Played) return interaction.reply({ content: '😢😢 **لقد اخترت صندوق بالفعل ولم تربح حاول المره القادمه**', ephemeral: true  })
    const embed = EmbedBuilder.from(interaction.message.embeds[0]).setColor('DarkButNotBlack');

    const Buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('1').setStyle(ButtonStyle.Secondary).setLabel('1 1️⃣').setDisabled(true),
        new ButtonBuilder().setCustomId('2').setStyle(ButtonStyle.Secondary).setLabel('2 2️⃣').setDisabled(true),
        new ButtonBuilder().setCustomId('3').setStyle(ButtonStyle.Secondary).setLabel('3 3️⃣').setDisabled(true),
        new ButtonBuilder().setCustomId('4').setStyle(ButtonStyle.Secondary).setLabel('4 4️⃣').setDisabled(true)
    )

    if (+selector === +DropData.prizeIn) {
        DropData.users.push({ Winner: true, userId: interaction.user.id });
        await guild.save();

        interaction.message.edit({ content: `الدروب الثاني خلال ${humanizeDuration(new Date(Date.now() - DropData.date), { language: 'ar', round: true }) }`, components: [Buttons], embeds: [embed] });
        const m = await interaction.reply({ content: `**تهانينا! لقد اختار <@${interaction.user.id}> الصندوق الصحيح \n  قم بفتح تذكره لإستلام جائزتك المقدره بـ ${DropData.prize}**`});
        setTimeout(() => {
            m.delete().catch(e => 505);
        }, ms('30m'))

        return;
    } else {
        DropData.prizeIn = rn.generator({ max: 4, min: 1, integer: true })();
        DropData.users.push({ Winner: false, userId: interaction.user.id });
        await guild.save();
        interaction.reply({ content: '**حظ اوفر المره القادمه **😢😢', ephemeral: true })
    };

    const logs = await interaction.guild.channels.cache.get(guild.drop.logsId);
    if (logs) logs.send({ embeds: [new EmbedBuilder().setColor('Red').setDescription(`drop was edited it correct chest now is __${DropData.prizeIn}__`)] })


};

function extractNumberAndId(input) {
    const regex = /(\d+)-([A-Za-z0-9-]+)/;
    const match = input.match(regex);

    if (match) {
        const number = parseInt(match[1]);
        const id = match[2];

        return [number, id];
    }

    return null;
}