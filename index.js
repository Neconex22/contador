require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

const app = express();
app.get('/', (req, res) => res.send('Bot activo'));
app.listen(3000, () => console.log('🌐 Web express activo'));

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

const objetivo = new Date('2025-07-07T15:00:00Z');

client.once('ready', async () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);

  const canal = await client.channels.fetch(process.env.CANAL_ID);
  if (!canal || !canal.isTextBased()) return console.error('❌ Canal no válido.');

  const mensaje = await canal.send('⏳ Calculando cuenta atrás...');

  setInterval(() => {
    const ahora = new Date();
    const diff = objetivo - ahora;
    if (diff <= 0) {
      mensaje.edit('🎉 ¡Ya es 7/7/2025 a las 17:00!');
      return;
    }

    const total = Math.floor(diff / 1000);
    const d = Math.floor(total / 86400);
    const h = Math.floor((total % 86400) / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;

    mensaje.edit(`⏳ Faltan **${d} días, ${h} horas, ${m} minutos y ${s} segundos** para el 7/7/2025 a las 17:00.`);
  }, 1000);
});

client.login(process.env.DISCORD_TOKEN);
