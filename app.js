const AssistantV1 = require('ibm-watson/assistant/v1');
const express = require('express');
const bodyParser = require('body-parser');
const watsonAssistant = require('./credentials/watson-assistant.json');

const app = express();

app.use(bodyParser.json());
app.use(express.static('./public'));

const port = 3000;

const assistant = new AssistantV1({
    username: watsonAssistant.username,
    password: watsonAssistant.password,
    url: 'https://gateway.watsonplatform.net/assistant/api/',
    version: '2018-02-16',
});

app.post('/conversation/', (req, res) => {
    const { text, context = {} } = req.body;

    const params = {
        input: { text },
        workspace_id: watsonAssistant.workspace_id,
        context,
    };

    assistant.message(params, (err, response) => {
        if (err) {
            console.error(err);
            res.status(500).json(err);
        } else {
            res.json(response);
        }
    });
});

app.listen(port, () => console.log(`Running on port ${port}`));