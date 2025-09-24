 require('dotenv').config();
  const express = require('express');
  const { OpenAI } = require('openai');
  const cors = require('cors');
  const app = express();
  
       const PORT = process.env.PORT || 3000;
       // Middlewares
       app.use(cors({ origin: 'http://localhost:5173' })); // Permite frontend Vite na 5173
       app.use(express.json());
       // Inicializa OpenAI
       const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
       // Endpoint para melhorar texto
       app.post('/api/improve-text', async (req, res) => {
  const { text, fieldType } = req.body;

  // Validação básica
  if (!text || typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ error: 'Texto é obrigatório e deve ser uma string válida.' });
  }

  // Log para depuração
  console.log('Recebido:', { text, fieldType });

  try {
    let prompt = '';

    switch (fieldType) {
      case 'summary':
        prompt = `Melhore este resumo profissional em português, tornando-o conciso (máx 500 chars), impactante e otimizado para ATS: ${text}. Foque em conquistas.`;
        break;
      case 'experience':
        prompt = `Melhore esta descrição de experiência profissional em português, adicionando verbos de ação e quantificações: ${text}. Mantenha profissional e breve.`;
        break;
      default:
        prompt = `Melhore este texto profissional: ${text}`;
    }

    // Verifica se a chave da OpenAI está presente
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('Chave da OpenAI não definida no ambiente (.env)');
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
      temperature: 0.7,
    });

    const improvedText = completion.choices?.[0]?.message?.content?.trim();

    if (!improvedText) {
      throw new Error('Resposta da IA veio vazia ou mal formatada.');
    }

    res.json({ improvedText });
  } catch (error) {
    console.error('Erro completo:', error);

    // Resposta mais clara para o frontend
    res.status(500).json({
      error: error.message || 'Erro interno ao gerar texto com IA.',
    });
  }
});
app.get('/test', (req, res) => {
  res.send('Backend rodando!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
});
