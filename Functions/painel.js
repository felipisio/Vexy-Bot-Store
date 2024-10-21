const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");
const { General, BList, Tickesettings } = require("../Database/index");
const startTime = Date.now();

async function panel(client, interaction) {
    interaction.update({
        content:``,
        embeds: [
            new EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: "https://cdn.discordapp.com/emojis/1265111276237881454.webp?size=96&quality=lossless" })
                .setTitle(`**Painel Geral**`)
                .setDescription(`Olá, Sr(a) **${interaction.user.username}**.\n\n- Nosso sistema é completamente personalizavel,\n customize-o da maneira que preferir.`)
                .addFields(
                    { name: "**Current Version**", value: `\`2.0.0\``, inline: true },
                    { name: "**Ping**", value: `\`${client.ws.ping} ms\``, inline: true },
                    { name: `**Uptime**`, value: `<t:${Math.ceil(startTime / 1000)}:R>`, inline: true }
                )
                .setColor(General.get("oficecolor.main"))
                .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
                .setTimestamp()
        ],
        components: [
            new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('gerenciarerVEndaa')
                        .setLabel('Gerenciar Loja')
                        .setStyle(1)
                        .setEmoji('1289309663183114270'),
                    new ButtonBuilder()
                        .setCustomId('gerenciarerTicket')
                        .setLabel('Painel Ticket')
                        .setStyle(1)
                        .setEmoji('1263226742399832160'),
                ),
            new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('moderationn')
                        .setLabel('Sistema de Moderação')
                        .setStyle(1)
                        .setEmoji('1276564802281672865'),
                    new ButtonBuilder()
                        .setCustomId('bemvindou')
                        .setLabel('Boas-vindas')
                        .setStyle(1)
                        .setEmoji('1261427087542059058'),
                ),
            new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('personalizarapp')
                        .setLabel('Customizar')
                        .setStyle(1)
                        .setEmoji('1251441839404220417'),
                    new ButtonBuilder()
                        .setCustomId('definiicao')
                        .setLabel('Definições do Bot')
                        .setStyle(2)
                        .setEmoji('1271659788614373399'),
                )
        ],
        ephemeral: true
    });
}


module.exports = {
    panel
};
