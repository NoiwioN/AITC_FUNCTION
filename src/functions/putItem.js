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

         try {
            const itemBody = await request.json();
            const item = context.extraInputs.get(cosmosInput)[0];
            for (let key in itemBody){
                if(itemBody[key]==null||itemBody[key]== ""||itemBody[key]==undefined){
                    throw new Error("The key value Pair for " + key + " was not provided")
                }
            }
            context.extraOutputs.set(cosmosOutput,item)
            return {
                body: JSON.stringify(item), status:200
             };
         } catch (error) {
            return{
                body: error, status: 400
            }
         }
    }
});
