const axios = require('axios');
const { addOrUpdatePlaneta } = require('./funciones');

const apiswapi = async () => {
    const url = 'https://swapi.py4e.com/api/planets';
    try {
        const response = await axios.get(url);
        const data = response.data; 
        //veremos si es un array o un objeto
        if (data && data.results && Array.isArray(data.results)) {
            const planetas = data.results;
            const planetasPromises = planetas.map((planeta, i) =>
                addOrUpdatePlaneta({ ...planeta, id: i + '' })
            );
            await Promise.all(planetasPromises);
        } else {
            console.log('Verificar si es arreglo u objeto');
        }
    } catch (err) {
        console.error(err);
        console.log('Error al consumir el API externa');
    }
};

apiswapi();