 const express = require("express");
const cors = require('cors')
var bodyParser = require('body-parser')

const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const uri = "mongodb+srv://Fahim:passworddb@cluster0.8n34utt.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const app = express();
app.use(cors());
const port = 8080;

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    
    console.log("Database connection established🧧🧧")
    const dbName="firstdb";
    const collectionName="recipes";

    const client=new MongoClient(uri)
    const database=await client.db(dbName)
    const collection=await database.collection(collectionName)
    const collectionUsers=await database.collection('users')
    await client.connect();

    app.get("/", (req, res) => {
      res.send("Hello World!12345 hello 5");
    });
    app.get("/users", async(req, res) => {
      // res.json(users);
      console.log("users data are trying to access")
      const allUsers=await collectionUsers.find().toArray();
      res.json(allUsers)
      // res.send("users are trying to access")
    });
    app.get("/recipes", async(req, res) => {
      console.log("users data are trying to access")
      const allRecipes=await collection.find().toArray();
      res.json(allRecipes)
    });
    app.get("/posts", (req, res) => {
      res.send(userPosts);
    });
    // app.post("/create-user", jsonParser ,async(req, res) => {
    //   console.log("req",req.body);
    //   await collectionUsers.insertOne(req.body)
    //   const allUsers=await collectionUsers.find().toArray();
    //   res.json(allUsers)
    // });
    app.post("/create-recipes", jsonParser ,async(req, res) => {
      console.log("req",req.body);
      await collection.insertOne(req.body)
      const allRecipes=await collection.find().toArray();
      res.json(allRecipes)
    });
    app.get('/users/:id',async(req,res)=>{
      console.log("req😍😍",req.params.id)
      const user=await collectionUsers.findOne({"_id":new ObjectId(req.params.id)})
      console.log("user",user)
      res.json(user)
    });
    app.put('/recipes/:id',async(req,res)=>{
      console.log("req😍😍",req.params.id)
      const user=await collectionUsers.updateOne({"_id":new ObjectId(req.params.id)})
      console.log("user",user)
      res.json(user)
    });
    // app.delete('/users/:id',async(req,res)=>{
    //   console.log("req😍😍",req.params.id)
    //   await collectionUsers.deleteOne({"_id":new ObjectId(req.params.id)})
    //   const deleteUsers=await collectionUsers.find().toArray();
    //   res.json(deleteUsers)
    // });
    app.delete('/recipes/:id',async(req,res)=>{
      console.log("req😍😍",req.params.id)
      await collection.deleteOne({"_id":new ObjectId(req.params.id)})
      const deleteUsers=await collection.find().toArray();
      res.json(deleteUsers)
    });
    app.post("/create-many-recipes", jsonParser ,async(req, res) => {
      console.log("req🧧",req.body);
      try{
        const insertManyResult=await collection.insertMany(req.body);  
        console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`)
      }catch(err){
        console.log(`something went wrong trying to insert the new documents:${err}\n`)
      }
      res.send('Recipes data are send to the mongodb server successfully')
    });
    app.post("/create-many-users", jsonParser ,async(req, res) => {
      console.log("req🧧",req.body);
      try{
        const insertManyResult=await collectionUsers.insertMany(req.body);  
        console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`)
      }catch(err){
        console.log(`something went wrong trying to insert the new documents:${err}\n`)
      }
      res.send('Recipes data are send to the mongodb server successfully')
    });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false }) 

// const users = [
//   {
//     id: 1,
//     name: "Leanne Graham",
//     username: "Bret",
//     email: "Sincere@april.biz",
//     address: {
//       street: "Kulas Light",
//       suite: "Apt. 556",
//       city: "Gwenborough",
//       zipcode: "92998-3874",
//       geo: {
//         lat: "-37.3159",
//         lng: "81.1496",
//       },
//     },
//     phone: "1-770-736-8031 x56442",
//     website: "hildegard.org",
//     company: {
//       name: "Romaguera-Crona",
//       catchPhrase: "Multi-layered client-server neural-net",
//       bs: "harness real-time e-markets",
//     },
//   },
//   {
//     id: 2,
//     name: "Ervin Howell",
//     username: "Antonette",
//     email: "Shanna@melissa.tv",
//     address: {
//       street: "Victor Plains",
//       suite: "Suite 879",
//       city: "Wisokyburgh",
//       zipcode: "90566-7771",
//       geo: {
//         lat: "-43.9509",
//         lng: "-34.4618",
//       },
//     },
//     phone: "010-692-6593 x09125",
//     website: "anastasia.net",
//     company: {
//       name: "Deckow-Crist",
//       catchPhrase: "Proactive didactic contingency",
//       bs: "synergize scalable supply-chains",
//     },
//   },
//   {
//     id: 3,
//     name: "Clementine Bauch",
//     username: "Samantha",
//     email: "Nathan@yesenia.net",
//     address: {
//       street: "Douglas Extension",
//       suite: "Suite 847",
//       city: "McKenziehaven",
//       zipcode: "59590-4157",
//       geo: {
//         lat: "-68.6102",
//         lng: "-47.0653",
//       },
//     },
//     phone: "1-463-123-4447",
//     website: "ramiro.info",
//     company: {
//       name: "Romaguera-Jacobson",
//       catchPhrase: "Face to face bifurcated interface",
//       bs: "e-enable strategic applications",
//     },
//   },
//   {
//     id: 4,
//     name: "Patricia Lebsack",
//     username: "Karianne",
//     email: "Julianne.OConner@kory.org",
//     address: {
//       street: "Hoeger Mall",
//       suite: "Apt. 692",
//       city: "South Elvis",
//       zipcode: "53919-4257",
//       geo: {
//         lat: "29.4572",
//         lng: "-164.2990",
//       },
//     },
//     phone: "493-170-9623 x156",
//     website: "kale.biz",
//     company: {
//       name: "Robel-Corkery",
//       catchPhrase: "Multi-tiered zero tolerance productivity",
//       bs: "transition cutting-edge web services",
//     },
//   },
//   {
//     id: 5,
//     name: "Chelsey Dietrich",
//     username: "Kamren",
//     email: "Lucio_Hettinger@annie.ca",
//     address: {
//       street: "Skiles Walks",
//       suite: "Suite 351",
//       city: "Roscoeview",
//       zipcode: "33263",
//       geo: {
//         lat: "-31.8129",
//         lng: "62.5342",
//       },
//     },
//     phone: "(254)954-1289",
//     website: "demarco.info",
//     company: {
//       name: "Keebler LLC",
//       catchPhrase: "User-centric fault-tolerant solution",
//       bs: "revolutionize end-to-end systems",
//     },
//   },
//   {
//     id: 6,
//     name: "Mrs. Dennis Schulist",
//     username: "Leopoldo_Corkery",
//     email: "Karley_Dach@jasper.info",
//     address: {
//       street: "Norberto Crossing",
//       suite: "Apt. 950",
//       city: "South Christy",
//       zipcode: "23505-1337",
//       geo: {
//         lat: "-71.4197",
//         lng: "71.7478",
//       },
//     },
//   },
// ];

// const userPosts = [
//   {
//     userId: 1,
//     id: 1,
//     title:
//       "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//     body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
//   },
//   {
//     userId: 1,
//     id: 2,
//     title: "qui est esse",
//     body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
//   },
//   {
//     userId: 1,
//     id: 3,
//     title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
//     body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
//   },
//   {
//     userId: 1,
//     id: 4,
//     title: "eum et est occaecati",
//     body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
//   },
//   {
//     userId: 1,
//     id: 5,
//     title: "nesciunt quas odio",
//     body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
//   },
//   {
//     userId: 1,
//     id: 6,
//     title: "dolorem eum magni eos aperiam quia",
//     body: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
//   },
//   {
//     userId: 1,
//     id: 7,
//     title: "magnam facilis autem",
//     body: "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas",
//   },
//   {
//     userId: 1,
//     id: 8,
//     title: "dolorem dolore est ipsam",
//     body: "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae",
//   },
//   {
//     userId: 1,
//     id: 9,
//     title: "nesciunt iure omnis dolorem tempora et accusantium",
//     body: "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas",
//   },
//   {
//     userId: 1,
//     id: 10,
//     title: "optio molestias id quia eum",
//     body: "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error",
//   },
// ];


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
