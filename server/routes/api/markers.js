const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//get markers
router.get('/', async (req, res) => {
    const posts = await loadMarkers();
    res.send(await posts.find({}).toArray());
});

//add marker
router.post('/', async(req, res) => {
    const posts = await loadMarkers();
    await posts.insertOne({
        coords: req.body.coords,        
        imageURL: req.body.imageURL,        
        desc: req.body.desc,        
        event: req.body.event,        
        createdAt: new Date()
    });
    //success status
    res.status(201).send();
})

//delete marker
router.delete('/:id', async (req, res) => {
    const posts = await loadMarkers();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    //ok status
    res.status(200).send();
});

//loads markers from mongoDB
//returns collection
async function loadMarkers() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://dbUser:qWUXfq7JXi7K6IdH@cluster0.ylmy4.mongodb.net/markers?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    return client.db('climate-change-map').collection('posts');
}

module.exports = router;