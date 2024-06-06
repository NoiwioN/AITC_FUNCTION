const { app, input } = require('@azure/functions');


const cosmosInput = input.cosmosDB({
    databaseName: 'DemoDatabase',
    containerName: 'Items',
    connection: 'CosmosDB',
    sqlQuery: "select * from c where c.id={id}"
});

app.http('getItemById', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route:"items/{id}",
    extraInputs:[cosmosInput],
    handler: async (request, context) => {
        const item = context.extraInputs.get(cosmosInput)
        return { body: JSON.stringify(item),status:200 }
    }
});
