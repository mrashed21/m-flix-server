require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cjfhp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const database = client.db("movieDB");
    const movieCollection = database.collection("movie");

    app.get("/movie/all", async (req, res) => {
      const cursor = movieCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // recently added movie
    app.get("/movie/recent", async (req, res) => {
      const recentMovies = await movieCollection
        .find({})
        .sort({ addedAt: -1 })
        .limit(5)
        .toArray();
      res.send(recentMovies);
    });
    app.get("/movie/details/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await movieCollection.findOne(query);
      res.send(result);
    });

    app.get("/movie/featured", async (req, res) => {
      const featuredMovies = await movieCollection
        .find({})
        .sort({ rating: -1 })
        .limit(8)
        .toArray();
      res.send(featuredMovies);
    });

    app.post("/movie", async (req, res) => {
      const movie = req.body;
      const result = await movieCollection.insertOne(movie);
      res.send(result);
    });

    app.delete("/movie/details/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await movieCollection.deleteOne(query);
      res.send(result);
    });

    app.put("/movie/update/:id", async (req, res) => {
      const id = req.params.id;
      const updatedMovie = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          duration: updatedMovie.duration,
          genre: updatedMovie.genre,
          poster: updatedMovie.poster,
          rating: updatedMovie.rating,
          releaseYear: updatedMovie.releaseYear,
          summary: updatedMovie.summary,
          title: updatedMovie.title,
        },
      };

      const result = await movieCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // add movie in favorite list
    const favoriteCollection = database.collection("favorites");

    app.post("/movie/favorites/:email", async (req, res) => {
      const { email } = req.params;
      const favorite = req.body;
      const exists = await favoriteCollection.findOne({
        email,
        movieId: favorite.movieId,
      });

      if (exists) {
        res.send({ exists: true });
        return;
      }
      const result = await favoriteCollection.insertOne(favorite);
      res.send(result);
    });

    app.delete("/movie/favorites/:email/:movieId", async (req, res) => {
      const { email, movieId } = req.params;
      const result = await favoriteCollection.deleteOne({
        email,
        movieId,
      });

      res.send(result);
    });

    app.get("/movie/favorites/:email", async (req, res) => {
      const { email } = req.params;
      const favorites = await favoriteCollection.find({ email }).toArray();
      res.send(favorites || []);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("curd server is running");
});
app.listen(port, () => {
  console.log(`surver is runnig PORT ${port}`);
});
