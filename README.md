# Climate Change Map Backend

## Project setup
```
npm install
```

## Methods
### POST
provide following:
```
{
    coords: object, 
    imageURL: string, 
    desc: string, 
    event: string, 
}
```
### GET
returns array of objects:
```
{
    coords: object, 
    imageUrl: string, 
    desc: string, 
    event: string, 
    createdAt: Date object
}
```

#### Coords object:
```
{
   lat: number,
   lng: number
}
```

### DELETE
/:id
