const { app } = require("@azure/functions");
const { CosmosClient } = require("@azure/cosmos");
const account = process.env["CosmosDB"].split(";")
const endpoint = account[0].split("=")[1]
const key =account[1].split("=")[1]+"=="
 
const client = new CosmosClient({ endpoint, key });
 console.log("Endpoint: " + endpoint)

const databaseId = "DemoDatabase";
const containerId = "Items";

 
app.http("deleteItem", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  route: "items/{id}",
  handler: async (request, context) => {
    const database = client.database(databaseId);
    const container = database.container(containerId);
    
    const itemId = request.params.id;
 
    const { resource: deletedItem } = await container.item(itemId, itemId).delete();
    return {
      body: JSON.stringify(deletedItem),
      status: 200,
    };
  },
});