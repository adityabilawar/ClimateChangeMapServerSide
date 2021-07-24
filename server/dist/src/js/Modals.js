import createElement from './ElementCreation.js';
import MarkerService from './MarkerService';
import axios from 'axios';
//FIXME: element.animate()?
export class Modal {
    modal;
    container;
    background;
    constructor(type) {
        this.container = document.createElement('div');
        this.container.classList.add(type + '-modal-container');

        this.background = createElement('div', '', 'background');
        this.background.addEventListener('click', this.hideHandler.bind(this));
        this.container.addEventListener('keydown', function (e) {
            if (e.key == "Escape") this.hideHandler();
        }.bind(this));

        this.container.appendChild(this.background);

        this.modal = document.createElement('div');
        this.modal.classList.add(type + '-modal', 'modal');
        this.container.appendChild(this.modal);
    }
    addContent(content) {
        this.modal.appendChild(content);
    }
    append() {
        document.body.appendChild(this.container);
    }
    show() {
        this.animate(this.modal, 'zoom-in');
        this.animate(this.background, 'fade-in');
    }
    hideHandler() {
        this.hide();
    }
    hide() {
        this.animate(this.modal, 'zoom-out');
        this.animate(this.background, 'fade-out');
    }
    animate(ele, anim) {
        ele.classList.remove('zoom-in');
        ele.classList.remove('fade-in');
        ele.classList.remove('zoom-out');
        ele.classList.remove('fade-out');

        ele.classList.add(anim);
    }
    DOMremove() {
        this.container.parentNode.removeChild(this.container);
    }
    hideRemove() {
        this.hide();
        //set timeout for anim to finish
        setTimeout(function () {
            this.DOMremove();
        }.bind(this), 100);
    }

}

export class FormModal extends Modal {
    form
    constructor() {
        super('form');

        let frag = document.createDocumentFragment();

        this.form = document.createElement('form');
        frag.append(this.form);

        const message = createElement('div', 'Submit Your Data', 'title');
        this.form.appendChild(message);

        //second arg is the key value in the eventual form object
        createInput('Full Name', 'UserName', this.form);
        const options = ['Wildfire', 'Rising Sea Levels', 'Melting Glacier', 'Drought', 'Flood', 'Hurricane', 'Earthquake', 'Tsunami', 'Rising Temperatures', 'Rising Ocean Temperatures'];
        createOptions(options, 'type', this.form);
        createInput('Location Name', 'LocName', this.form);
        //createInput('Latitude', 'lati', this.form);
        //createInput('Longitude', 'long', this.form);
        //createInput('Year Of Event', 'EventDate', this.form);
        createInput('Start Date Of Event', 'StartEventDate', this.form);
        createInput('End Date Of Event', 'EndEventDate', this.form);
        createInput('Description of Location', 'desc', this.form);
        createInput('Image URL of location', 'imageURL', this.form);
        


        const buttonContainer = createElement('div', '', 'modal-button-container');
        this.form.appendChild(buttonContainer);

        this.submitButton = createElement('input', 'Submit', 'form-submit');
        this.submitButton.type = 'submit';
        this.form.appendChild(this.submitButton);

        super.addContent(frag);
        super.append();

        function createOptions(options, type, form) {
            let typeInput = createElement('select', '', 'form-type');
            typeInput.name = type;

            options.forEach(option => {
                let ele = createElement('option', option, 'form-type');
                ele.value = option;
                typeInput.appendChild(ele);
            });

            form.appendChild(typeInput);
        }

        function createInput(placeholder, key, form) {
            let input = createElement('Input', '', 'form');
            input.type = 'text';
            input.name = key;
            input.placeholder = placeholder;
            form.appendChild(input);
        }
    }
    show() {
        super.show();
        return new Promise((resolve) => {
            this.form.addEventListener('submit', (e) => {
                this.submit(e, resolve);
            });
        });
    }
    submit = (event, resolve) => {
        event.preventDefault();
        const rawFormData = Object.fromEntries(new FormData(this.form).entries());
        console.log(rawFormData);

        const iconURLs = {
            "Wildfire": "https://maps.google.com/mapfiles/ms/icons/firedept.png",
            "Rising Sea Levels": "https://maps.google.com/mapfiles/ms/icons/marina.png",
            "Melting Glacier": "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            "Drought": "https://maps.google.com/mapfiles/ms/icons/orange-dot.png",
            "Flood": "https://maps.google.com/mapfiles/ms/icons/flag.png",
            "Hurricane": "https://maps.google.com/mapfiles/ms/icons/pink-dot.png",
            "Earthquake": "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
            "Tsunami": "https://maps.google.com/mapfiles/ms/icons/waterfalls.png",
            "Rising Temperatures": "https://maps.google.com/mapfiles/ms/icons/hotsprings.png",
            "Rising Ocean Temperatures": "https://maps.google.com/mapfiles/ms/icons/purple-dot.png",
        }


 
      
        var  latGeo = 0;
        var  lngGeo = 0;
        geocode();
        this.hideRemove();

        function geocode(){
           
            axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params:{
                    address: rawFormData.LocName,
                    key:'AIzaSyBdZ8GXm2rC-co5WIseA-9sQRtCZATT84I'
                }
            })
            .then(function(response){
                
                //log full response
                console.log(response);
                console.log(response.data.results[0].geometry.location.lat);
                console.log(response.data.results[0].geometry.location.lng);
                //assign lat and lng coords
                latGeo = response.data.results[0].geometry.location.lat;
                lngGeo = response.data.results[0].geometry.location.lng;

                const data = {
                    coords: {
                       lat: latGeo, lng: lngGeo
                    },
                    Username1: rawFormData.UserName,
                    event: rawFormData.type,
                    LocationName: rawFormData.LocName,
                    imageURL: rawFormData.imageURL,
                    desc: rawFormData.desc,
                    iconImage: iconURLs[rawFormData.type],
                    StartDateOfEvent1: rawFormData.StartEventDate,
                    EndDateOfEvent1: rawFormData.EndEventDate
                }
        
                MarkerService.insertMarker(data);
        
                resolve(true);

                return response;
            })
             .catch(function(error){

                 console.log(error);
               });
        }
            
        
    }
}


export class ConfirmModal extends Modal {
    yesButton
    noButton
    constructor(m, yes, no) {
        super('confirm', null);
        let frag = document.createDocumentFragment();

        let message = createElement('div', m, 'message');
        frag.appendChild(message);

        let buttonContainer = createElement('div', '', 'modal-button-container');
        frag.appendChild(buttonContainer);

        this.yesButton = createElement('button', yes, 'yes');
        buttonContainer.appendChild(this.yesButton);

        this.noButton = createElement('button', no, 'no');
        buttonContainer.appendChild(this.noButton);

        super.addContent(frag);
        super.append();
    }
    show() {
        super.show();
        return new Promise((resolve) => {
            this.yesButton.addEventListener('click', this.yes.bind(this, resolve));
            this.noButton.addEventListener('click', this.no.bind(this, resolve));
        });
    }
    yes(resolve) {
        resolve(true);
        this.hideRemove();
    }
    no(resolve) {
        resolve(false);
        this.hideRemove();
    }
}