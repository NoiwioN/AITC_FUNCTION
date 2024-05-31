const { app } = require("@azure/functions");
const { CosmosClient } = require("@azure/cosmos");
 
const endpoint = "https://mz141829.documents.azure.com:443/";
const key =
  "NvFZ9aZt1ynqFGN5cGtgCtwy0fFFwhbnwRXY2RlOVcpKVOPbVtvOjJC3enrMlFx5X7h8qY62hmEbACDbZ7SqAw==";
 
const client = new CosmosClient({ endpoint, key });
 
const databaseId = "DemoDatabase";
const containerId = "Items";
 
app.http("deleteItem", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  route: "items/{id}",
  handler: async (request, context) => {
    console.log("COnnecting to database")
    const database = client.database(databaseId);
    console.log("Getting container")
    const container = database.container(containerId);
    console.log("Container:" + JSON.stringify(container))
 
    const itemId = request.params.id;
 
    const { resource: deletedItem } = await container.item(itemId).delete();
    return {
      body: JSON.stringify(deletedItem),
      status: 200,
    };
  },
});