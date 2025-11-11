import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, ChannelType, PermissionsBitField } from 'discord.js';
import { storage } from './storage.js';

const GUILD_ID = '1413053989796319317';
const WHITELIST_CHANNEL_ID = '1437698826348789831';
const TICKET_CATEGORY_ID = '1437702108395602001';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const commands = [
  new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Send a custom embed to a channel (Admin only)')
    .addChannelOption(option =>
      option
        .setName('channel')
        .setDescription('The channel to send the embed to')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  
  new SlashCommandBuilder()
    .setName('check')
    .setDescription('Check if a user is in the whitelist')
    .addStringOption(option =>
      option
        .setName('username')
        .setDescription('The username to check')
        .setRequired(true)
    ),
  
  new SlashCommandBuilder()
    .setName('sendticket')
    .setDescription('Send a ticket creation embed (Admin only)')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
];

async function registerCommands() {
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN!);

  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(client.user!.id, GUILD_ID),
      { body: commands.map(cmd => cmd.toJSON()) },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error('Error registering commands:', error);
  }
}

client.once('ready', async () => {
  console.log(`Discord bot logged in as ${client.user?.tag}`);
  if (!client.user) {
    console.error('Bot user is null');
    return;
  }
  setTimeout(() => registerCommands(), 2000);
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const { commandName } = interaction;

    if (commandName === 'embed') {
      const channel = interaction.options.getChannel('channel', true);
      
      const modal = new ModalBuilder()
        .setCustomId('embed_modal')
        .setTitle('Create Custom Embed');

      const titleInput = new TextInputBuilder()
        .setCustomId('embed_title')
        .setLabel('Title')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const descriptionInput = new TextInputBuilder()
        .setCustomId('embed_description')
        .setLabel('Description')
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

      const colorInput = new TextInputBuilder()
        .setCustomId('embed_color')
        .setLabel('Color (hex code, e.g., #050000)')
        .setStyle(TextInputStyle.Short)
        .setRequired(false)
        .setValue('#050000');

      const footerInput = new TextInputBuilder()
        .setCustomId('embed_footer')
        .setLabel('Footer')
        .setStyle(TextInputStyle.Short)
        .setRequired(false);

      const imageInput = new TextInputBuilder()
        .setCustomId('embed_image')
        .setLabel('Image URL (optional)')
        .setStyle(TextInputStyle.Short)
        .setRequired(false);

      modal.addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(titleInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(descriptionInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(colorInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(footerInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(imageInput),
      );

      await interaction.showModal(modal);
      
      const filter = (i: any) => i.customId === 'embed_modal' && i.user.id === interaction.user.id;
      
      try {
        const modalInteraction = await interaction.awaitModalSubmit({ filter, time: 300000 });
        
        const title = modalInteraction.fields.getTextInputValue('embed_title');
        const description = modalInteraction.fields.getTextInputValue('embed_description');
        const color = modalInteraction.fields.getTextInputValue('embed_color') || '#050000';
        const footer = modalInteraction.fields.getTextInputValue('embed_footer');
        const imageUrl = modalInteraction.fields.getTextInputValue('embed_image');

        const embed = new EmbedBuilder()
          .setTitle(title)
          .setDescription(description)
          .setColor(parseInt(color.replace('#', ''), 16));

        if (footer) {
          embed.setFooter({ text: footer });
        }

        if (imageUrl) {
          embed.setImage(imageUrl);
        }

        const targetChannel = await client.channels.fetch(channel.id);
        if (targetChannel?.isTextBased() && 'send' in targetChannel) {
          await targetChannel.send({ embeds: [embed] });
          await modalInteraction.reply({ content: `Embed sent to ${channel}!`, ephemeral: true });
        }
      } catch (error) {
        console.error('Modal timeout or error:', error);
      }
    }

    if (commandName === 'check') {
      const username = interaction.options.getString('username', true);
      
      try {
        const user = await storage.getUserByUsername(username);
        
        if (!user) {
          await interaction.reply({
            content: `User "${username}" not found in the database.`,
            ephemeral: true,
          });
          return;
        }

        const isRegistered = true;
        const isVerified = user.status === 'full';

        const embed = new EmbedBuilder()
          .setTitle('Whitelist Status')
          .setDescription(`Status for **${username}**`)
          .addFields(
            { name: 'Registered', value: isRegistered ? '✅' : '❌', inline: true },
            { name: 'Verified', value: isVerified ? '✅' : '❌', inline: true },
          )
          .setColor(isVerified ? 0x00ff00 : 0xffaa00)
          .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: true });
      } catch (error) {
        console.error('Error checking user:', error);
        await interaction.reply({
          content: 'An error occurred while checking the user.',
          ephemeral: true,
        });
      }
    }

    if (commandName === 'sendticket') {
      const modal = new ModalBuilder()
        .setCustomId('ticket_embed_modal')
        .setTitle('Create Ticket Embed');

      const titleInput = new TextInputBuilder()
        .setCustomId('ticket_title')
        .setLabel('Title')
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setValue('Support Tickets');

      const descriptionInput = new TextInputBuilder()
        .setCustomId('ticket_description')
        .setLabel('Description')
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true)
        .setValue('Click the button below to open a support ticket.');

      const colorInput = new TextInputBuilder()
        .setCustomId('ticket_color')
        .setLabel('Color (hex code)')
        .setStyle(TextInputStyle.Short)
        .setRequired(false)
        .setValue('#050000');

      modal.addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(titleInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(descriptionInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(colorInput),
      );

      await interaction.showModal(modal);

      const filter = (i: any) => i.customId === 'ticket_embed_modal' && i.user.id === interaction.user.id;

      try {
        const modalInteraction = await interaction.awaitModalSubmit({ filter, time: 300000 });

        const title = modalInteraction.fields.getTextInputValue('ticket_title');
        const description = modalInteraction.fields.getTextInputValue('ticket_description');
        const color = modalInteraction.fields.getTextInputValue('ticket_color') || '#050000';

        const embed = new EmbedBuilder()
          .setTitle(title)
          .setDescription(description)
          .setColor(parseInt(color.replace('#', ''), 16))
          .setFooter({ text: 'Array Support' });

        const button = new ButtonBuilder()
          .setCustomId('open_ticket')
          .setLabel('OPEN TICKET')
          .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

        await interaction.channel?.send({ embeds: [embed], components: [row] });
        await modalInteraction.reply({ content: 'Ticket embed sent!', ephemeral: true });
      } catch (error) {
        console.error('Modal timeout or error:', error);
      }
    }
  }

  if (interaction.isButton()) {
    if (interaction.customId === 'open_ticket') {
      const guild = interaction.guild;
      if (!guild) return;

      try {
        const fetchedMember = await guild.members.fetch(interaction.user.id);
        const topRole = fetchedMember.roles.highest.name || 'Member';
        const channelName = `${topRole}-${interaction.user.username}`.toLowerCase().replace(/[^a-z0-9-]/g, '-');

        const existingChannel = guild.channels.cache.find(
          ch => ch.name === channelName && ch.parentId === TICKET_CATEGORY_ID
        );

        if (existingChannel) {
          await interaction.reply({
            content: `You already have an open ticket: <#${existingChannel.id}>`,
            ephemeral: true,
          });
          return;
        }

        const ticketChannel = await guild.channels.create({
          name: channelName,
          type: ChannelType.GuildText,
          parent: TICKET_CATEGORY_ID,
          permissionOverwrites: [
            {
              id: guild.id,
              deny: [PermissionsBitField.Flags.ViewChannel],
            },
            {
              id: interaction.user.id,
              allow: [
                PermissionsBitField.Flags.ViewChannel,
                PermissionsBitField.Flags.SendMessages,
                PermissionsBitField.Flags.ReadMessageHistory,
              ],
            },
          ],
        });

        const welcomeEmbed = new EmbedBuilder()
          .setTitle('Support Ticket')
          .setDescription(`Welcome ${interaction.user}! Please describe your issue and a staff member will assist you shortly.`)
          .setColor(0x050000)
          .setFooter({ text: 'Array Support' });

        const closeButton = new ButtonBuilder()
          .setCustomId('close_ticket')
          .setEmoji('🔒')
          .setStyle(ButtonStyle.Secondary);

        const deleteButton = new ButtonBuilder()
          .setCustomId('delete_ticket')
          .setEmoji('🗑️')
          .setStyle(ButtonStyle.Danger);

        const ticketRow = new ActionRowBuilder<ButtonBuilder>().addComponents(closeButton, deleteButton);

        await ticketChannel.send({ embeds: [welcomeEmbed], components: [ticketRow] });
        
        await interaction.reply({
          content: `Ticket created: <#${ticketChannel.id}>`,
          ephemeral: true,
        });
      } catch (error) {
        console.error('Error creating ticket:', error);
        await interaction.reply({
          content: 'There was an error creating your ticket. Please try again later.',
          ephemeral: true,
        });
      }
    }

    if (interaction.customId === 'close_ticket') {
      const channel = interaction.channel;
      if (!channel || channel.type !== ChannelType.GuildText) return;

      try {
        await channel.permissionOverwrites.edit(interaction.user.id, {
          ViewChannel: false,
        });

        const closedEmbed = new EmbedBuilder()
          .setTitle('Ticket Closed')
          .setDescription(`Ticket closed by ${interaction.user}`)
          .setColor(0xff9900)
          .setTimestamp();

        await channel.send({ embeds: [closedEmbed] });
        await interaction.reply({ content: 'Ticket closed successfully.', ephemeral: true });
      } catch (error) {
        console.error('Error closing ticket:', error);
        await interaction.reply({ content: 'Error closing ticket.', ephemeral: true });
      }
    }

    if (interaction.customId === 'delete_ticket') {
      const channel = interaction.channel;
      if (!channel || channel.type !== ChannelType.GuildText) return;

      const member = interaction.member;
      if (!member || !('permissions' in member) || !member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        await interaction.reply({ content: 'Only administrators can delete tickets.', ephemeral: true });
        return;
      }

      try {
        await interaction.reply({ content: 'Deleting ticket in 5 seconds...', ephemeral: true });
        setTimeout(async () => {
          await channel.delete();
        }, 5000);
      } catch (error) {
        console.error('Error deleting ticket:', error);
        await interaction.reply({ content: 'Error deleting ticket.', ephemeral: true });
      }
    }
  }
});

export async function sendWhitelistRegistration(username: string) {
  try {
    const channel = await client.channels.fetch(WHITELIST_CHANNEL_ID);
    
    if (channel?.isTextBased() && 'send' in channel) {
      const embed = new EmbedBuilder()
        .setTitle('Whitelist Registry')
        .setDescription(`**${username}** has been added to the whitelist, remember that you must [link your discord](http://tradearray.org/me) to be fully confirmed.`)
        .setColor(0x050000)
        .setFooter({ text: 'Array' })
        .setTimestamp();

      await channel.send({ embeds: [embed] });
    }
  } catch (error) {
    console.error('Error sending whitelist registration:', error);
  }
}

export function startBot() {
  const token = process.env.DISCORD_BOT_TOKEN;
  
  if (!token || token.trim() === '') {
    console.log('Discord bot token not configured - bot will not start');
    return;
  }
  
  client.login(token).catch((error) => {
    console.error('Failed to start Discord bot:', error);
  });
}
