const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//get markers
router.get('/', async (req, res) => {
    const posts = await getMarkerArray();
    res.send(posts);
});

router.post('/', async (req, res) => {
    const posts = await getMarkerCollection();
    await posts.insertOne({
        Username: req.body.Username1,
        coords: req.body.coords,
        LocationName: req.body.LocationName,
        eventType: req.body.event,
        content: req.body.desc,
        imageURL: req.body.imageURL,
        iconImage: req.body.iconImage,
        StartDateOfEvent: req.body.StartDateOfEvent1,
        EndDateOfEvent: req.body.EndDateOfEvent1,
        createdAt: new Date()
    });
    //success status
    res.status(201).send();
})

//delete marker
router.delete('/:id', async (req, res) => {
    const posts = await getMarkerArray();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    //ok status
    res.status(200).send();
});

/**
 * @description gets a list of markers from the database
 * 
 * @returns {{coords: object, imageUrl: string, desc: string, event: string, createdAt: Date object}[]} - collection of markers
 */
//loads markers from mongoDB
//returns http://mongodb.github.io/node-mongodb-native/3.6/api/Db.html#collection
async function getMarkerArray() {
    const collection = await getMarkerCollection();
    const arr = collection.find({}).toArray()
    return arr;
}

async function getMarkerCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://dbUser:qWUXfq7JXi7K6IdH@cluster0.ylmy4.mongodb.net/markers?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    const collection = client.db('climate-change-map').collection('posts');
    return collection;
}

module.exports = router;
module.exports.loadMarkers = getMarkerArray;
