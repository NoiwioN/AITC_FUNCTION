const { app, output, input } = require('@azure/functions');

const cosmosOutput = output.cosmosDB({
    databaseName: 'DemoDatabase',
    containerName: 'Items',
    connection: 'CosmosDB',
    createIfNotExists: false
})

const cosmosInput = input.cosmosDB({
    databaseName: 'DemoDatabase',
    containerName: 'Items',
    connection: 'CosmosDB',
    sqlQuery: "select * from c where c.id={id}"
})

app.http('putItem', {
    methods: ['PUT'],
    authLevel: 'anonymous',
    extraOutputs: [cosmosOutput],
    extraInputs:[cosmosInput],
    route:"items/{id}",
    handler: async (request, context) => {
        const itemBody = await request.json();
        console.log("Der BOdy:" + JSON.stringify(itemBody))
        const item = context.extraInputs.get(cosmosInput)[0];
        console.log("Das Item:" + JSON.stringify(item))
        for (let key in itemBody){
            item[key]=itemBody[key]
            console.log(item[key])
        }
        context.extraOutputs.set(cosmosOutput,item)
        return {
            body: JSON.stringify(item), status:200
         };
    }
});
