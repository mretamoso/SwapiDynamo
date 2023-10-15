const express = require('express');
const app = express();
const {
    addOrUpdatePlaneta,
    getPlanetas,
    deletePlaneta,
    getPlanetaById,
    conversionEspanol
} = require('./funciones.js');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Consumiendo Api Externa SWPI');
});

app.get('/planetas', async (req, res) => {
    try {
        const planetas = await getPlanetas();
        res.json(planetas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'No se puede mostrar los planetas' });
    }
});

app.get('/planetas/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const planeta = await getPlanetaById(id);
        res.json(planeta);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'No se puede traer planeda por id' });
    }
});

app.post('/planetas', async (req, res) => {
    const planeta = req.body;
    try {
        const newPlaneta = await addOrUpdatePlaneta(planeta);
        res.json(newPlaneta);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'No se puede agregar planeta' });
    }
});

app.put('/planetas/:id', async (req, res) => {
    const planeta = req.body;
    const { id } = req.params;
    planeta.id = id;
    try {
        const newPlaneta = await addOrUpdatePlaneta(planeta);
        res.json(newPlaneta);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'No se puede actualizar planeta' });
    }
});

app.delete('/planetas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        res.json(await deletePlaneta(id));
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'No se puede eliminar planeta' });
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`listening on http://localhost:3001`);
});
