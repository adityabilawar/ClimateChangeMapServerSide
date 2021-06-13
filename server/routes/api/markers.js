const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//get markers
router.get('/', async (req, res) => {
    const posts = await loadMarkers();
    res.send(await posts.find({}).toArray());
});

router.post('/', async(req, res) => {
    const posts = await loadMarkers();
    await posts.insertOne({
        coords: req.body.coords, 
        LocationName: req.body.LocationName,   
        event: req.body.event,          
        desc: req.body.desc,        
        imageURL: req.body.imageURL,   
        iconImage:req.body.iconImage,
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

/**
 * @description gets a list of markers from the database
 * 
 * @returns {{coords: object, imageUrl: string, desc: string, event: string, createdAt: Date object}[]} - collection of markers
 */
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