const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");
const { General, tickets } = require("../Database/index");
const { obterEmoji } = require("./definicoes")
const Discord = require("discord.js")


async function abrirTicket(interaction, valor) {

    const EMOJI = await obterEmoji();
    await interaction.reply({ content: `${EMOJI.vx2 == null ? `` : `<a:${EMOJI.vx2.name}:${EMOJI.vx2.id}>`} Aguarde estamos criando seu Ticket...`, ephemeral: true });
    await interaction.message.edit()

    const blocks = tickets.get(`tickets.funcoes.${valor}`)
    const aparencia = tickets.get(`tickets.aparencia`)

    if (blocks == null) return interaction.editReply({ content: `Esta função não existe!`, ephemeral: true });

    if (blocks == null || Object.keys(blocks).length == 0) return interaction.editReply({ content: `Esta função não existe!`, ephemeral: true });

    const thread2222 = interaction.channel.threads.cache.find(x => x.name.includes(interaction.user.id));

    if (thread2222 !== undefined) {
        const row4 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setURL(`https://discord.com/channels/${interaction.guild.id}/${thread2222.id}`)
                    .setLabel('Ir para o Ticket')
                    .setStyle(5)
            )

        interaction.editReply({ content: `Você já possuí um ticket aberto`, components: [row4] })
        return
    }

    const thread = await interaction.channel.threads.create({
        name: `${valor}・${interaction.user.username}・${interaction.user.id}`,
        autoArchiveDuration: 60,
        type: Discord.ChannelType.PrivateThread,
        reason: 'Ticket aberto',
        members: [interaction.user.id],
        permissionOverwrites: [
            {
                id: General.get('admrole'),
                allow: [Discord.PermissionFlagsBits.SendMessagesInThreads],
            },
            {
                id: General.get('staffrole'),
                allow: [Discord.PermissionFlagsBits.SendMessagesInThreads],
            },
            {
                id: interaction.user.id,
                allow: [Discord.PermissionFlagsBits.SendMessagesInThreads],
                allow: [Discord.PermissionFlagsBits.SendMessages],
                allow: [Discord.PermissionFlagsBits.AttachFiles],
            },
        ],
    });

    const row4 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setURL(`https://discord.com/channels/${interaction.guild.id}/${thread.id}`)
                .setLabel('Ir para o Ticket')
                .setStyle(5)
        )

    interaction.editReply({ content: `${EMOJI.vx3 == null ? `` : `<:${EMOJI.vx3.name}:${EMOJI.vx3.id}>`} Ticket criado com sucesso!`, components: [row4] })

    const userAbriu = interaction.user.id
    const ThreadOPen = thread.id
    const idTickeopen = interaction.client.channels.cache.get(ThreadOPen)

    tickets.set(`openeds.${ThreadOPen}`, ThreadOPen)
    tickets.set(`openeds.${ThreadOPen}.abriu`, userAbriu)

    const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `${interaction.user.username} | Solicitante`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
        .setTitle(`${valor}`)
        .setDescription(`${blocks.descricao == undefined ? blocks.predescricao : blocks.descricao}`)
        .setFooter(
            { text: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) }
        )
        .setTimestamp()

    if (blocks.banner !== undefined) {
        embed.setImage(`${blocks.banner}`)
    }

    if (aparencia.color !== undefined) {
        embed.setColor(`${aparencia.color}`)
    } else {
        embed.setColor(General.get('oficecolor.main'))
    }

    const button = new ButtonBuilder()
        .setCustomId('arquivar')
        .setLabel('Arquivar')
        .setEmoji('1263220778040557599')
        .setStyle(1)
    const button2 = new ButtonBuilder()
        .setCustomId('deletar')
        .setLabel('Deletar')
        .setEmoji('1251441411266711573')
        .setStyle(4)
    const button3 = new ButtonBuilder()
        .setCustomId('notificaruser')
        .setLabel('Notificar')
        .setEmoji('1251441491679645698')
        .setStyle(1)

    const row = new ActionRowBuilder()
        .addComponents(button3, button, button2);

    thread.send({ components: [row], embeds: [embed], content: `${interaction.user} ${General.get('admrole') == null ? '' : `<@&${General.get('admrole')}>`} ${General.get('staffrole') == null ? '' : `<@&${General.get('staffrole')}>`}` })

}

module.exports = {
    abrirTicket
}