const { app } = require('@azure/functions');

const cosmosInput = input.cosmosDB({
    databaseName: 'DemoDatabase',
    containerName: 'Items',
    connection: 'CosmosDB',
    sqlQuery: "select * from c"
});


app.http('laborFunction', {
    methods: ['GET'],
    authLevel: 'anonymous',
    extraInputs: [cosmosInput],
    route: 'items',
    handler: async (request, context) => {
        const items = context.extraInputs.get(cosmosInput);
        return {
            body: JSON.stringify(items),
            status: 200
        };
    }

});
