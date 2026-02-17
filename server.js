const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const leadsDir = path.join(__dirname, 'leads');
const filePath = path.join(leadsDir, 'leads.json');

app.post('/save-lead', (req, res) => {
    const newEntry = req.body;

    if (!fs.existsSync(leadsDir)) {
        fs.mkdirSync(leadsDir);
    }

    let leads = [];
    if (fs.existsSync(filePath)) {
        try {
            const fileData = fs.readFileSync(filePath, 'utf8');
            leads = fileData ? JSON.parse(fileData) : [];
        } catch (e) {
            leads = [];
        }
    }

    leads.push({
        id: Date.now(),
        data_registro: new Date().toLocaleString('pt-BR'),
        ...newEntry
    });

    fs.writeFile(filePath, JSON.stringify(leads, null, 4), (err) => {
        if (err) {
            console.error("Erro ao escrever:", err);
            return res.status(500).send("Erro ao salvar.");
        }
        console.log("✅ Novo lead adicionado ao leads.json!");
        res.status(200).send("Salvo com sucesso.");
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});