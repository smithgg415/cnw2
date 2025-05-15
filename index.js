const { Pool } = require('pg');
const fs = require('fs');

// Informações de conexão
const connectionString = 'postgresql://postgres:U4trRT7IclcDrPaF@lithely-rich-husky.data-1.use1.tembo.io:5432/postgres';

// Configuração do pool de conexões
const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    ca: fs.readFileSync('bancodedados/ca.crt').toString(),
  },
  connectionTimeoutMillis: 5000, // Aumentar o tempo limite de conexão
  idleTimeoutMillis: 30000, // Tempo limite de inatividade
  max: 20 // Número máximo de conexões no pool
});

// Função para testar a conexão
async function testQuery() {
    const client = await pool.connect();
    try {
      console.log('Conexão bem-sucedida!');
      const res = await client.query('SELECT NOW()');
      console.log('Resposta da consulta:', res.rows[0]);
    } finally {
      client.release();
    }
  }
  
  // Executar a função de teste
  testQuery().catch(err => console.error('Erro ao conectar:', err));