import { Loader } from "@googlemaps/js-api-loader";
import MarkerService from "./MarkerService";


export default class Map {
    map;
    constructor(center, zoom) {
        const loader = new Loader({
            apiKey: "AIzaSyBdZ8GXm2rC-co5WIseA-9sQRtCZATT84I",
            version: "weekly",
        });

        loader.load().then(() => {
            this.map = new google.maps.Map(document.getElementById("map"), {
                center,
                zoom,
                mapTypeId: "satellite",
                minZoom: 2.7, 
                maxZoom: 100
            });
        });

        this.refreshMarkers();
      
    }

    async refreshMarkers() {
        console.log('Refreshing markers...');
        //Array of markers
        const markers = await MarkerService.getMarkers();

        // addMarker(markers);
        console.log(markers);
        //loop through markers
        for (var i = 0; i < markers.length; i++) {
            //add marker
            addMarker.bind(this, markers[i])();
        }

        //add Marker Function 
        function addMarker(props) {

            const marker = new google.maps.Marker({
                position: props.coords,
                map: this.map,
                 icon: props.iconImage
            });

            //  check content(this has the location description)
            // use this in the future( to add the name of the location along with the creator name and the location image)
            const container = document.createDocumentFragment();

            const h1 = document.createElement("h1");
            const h1Text = document.createTextNode(props.LocationName);
            h1.appendChild(h1Text);
            container.appendChild(h1);

            const p = document.createElement("p");
            const pText = document.createTextNode(props.content);
            p.appendChild(pText);
            container.appendChild(p);

            const img = document.createElement("img");
            img.src = props.imageURL;
            container.appendChild(img);

            const p1 = document.createElement("p");
            const pText1 = document.createTextNode("Contributer: "+ props.Username);
            p1.appendChild(pText1);
            container.appendChild(p1);

            if (props.content) {
                const infowindow = new google.maps.InfoWindow({
                    //format content
                    content: container
                });

                

                marker.addListener('click', function () {
                    // fix this, this zooms and centers onto location clicked
                    infowindow.open(map, marker);
                    //map.setZoom(9);
                    //map.setCenter(marker.getPosition());
                    //smoothZoom(map, max, cnt + 1);
                  
                });
            }
        }
    }
}