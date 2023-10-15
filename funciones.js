const AWS = require('aws-sdk');

require('dotenv').config();
AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'swapiPlanetas';


const getPlanetas = async () => {
    const params = {
        TableName: TABLE_NAME,
    };
    const planetas = await dynamoClient.scan(params).promise();
    return planetas;
};

const getPlanetaById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id,
        },
    };
    return await dynamoClient.get(params).promise();
};

const addOrUpdatePlaneta = async (planeta) => {
    const params = {
        TableName: TABLE_NAME,
        Item: planeta,
    };
    return await dynamoClient.put(params).promise();
};


const deletePlaneta = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id,
        },
    };
    return await dynamoClient.delete(params).promise();
};


function conversionEspanol(dataIngles) {
    const atributos = {
        rotation_period: 'periodo_rotacion',
        residents: 'residentes',
        created: 'creado',
        population: 'poblacion',
        url: 'url',
        films: 'peliculas',
        name: 'nombre',
        diameter: 'diametro',
        climate: 'clima',
        gravity: 'gravedad',
        surface_water: 'superficie_agua',
        edited: 'editado',
        orbital_period: 'periodo_orbital',
        id: 'id',
        terrain: 'terreno'

    };

    const dataEspañol = {};

    for (const key in dataIngles) {
        if (atributos[key]) {
            dataEspañol[atributos[key]] = dataIngles[key];
        } else {
            dataEspañol[key] = dataIngles[key];
        }
    }

    return dataEspañol;
}


module.exports = {
    dynamoClient,
    getPlanetas,
    getPlanetaById,
    addOrUpdatePlaneta,
    deletePlaneta,
    conversionEspanol
};