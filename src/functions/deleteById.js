/*const { app, input } = require('@azure/functions');
const { CosmosClient } = require("@azure/cosmos");

const cosmosInput = input.cosmosDB({
    databaseName: 'DemoDatabase',
    containerName: 'Items',
    connection: 'CosmosDB',
});


app.http('deleteById', {
    methods: ["DELETE"],
    authLevel: 'anonymous',
    route:"items/{id}",
    extraInputs:  [cosmosInput],
    handler: async (request, context) => {
        const cosmosClient = new CosmosClient(/*{endpoint and key} );
        const container = cosmosClient.databaseName(cosmosInput.databaseName).container(/*containerId)
        const itemId= request.url.split("/").pop()
        const partitionKey = "placeholder"
    const {resource} = await container.item(itemId/*,partitionKey).delete()
        return { body: `Hello, ${name}!` };
    }
});
*/
