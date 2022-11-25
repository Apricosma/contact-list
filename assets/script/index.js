'use strict'
// Utility functions
function select(selector, parent = document) {
    return parent.querySelector(selector);
}

 function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

let array = [];

class Contact {
    #name;
    #city;
    #email;

    constructor(name, city, email) {
        this.#name = name;
        this.#city = city;
        this.#email = email;
        array.push(this);
    }

    set personName(name) {
        this.#name = name;
    }

    get personName() {
        return this.#name;
    }

    set personCity(city) {
        this.#city = city;
    }

    get personCity() {
        return this.#city;
    }

    set contactEmail(email) {
        this.#email = email;
    }

    get contactEmail() {
        return this.#email;
    }



    createContactCard() {
        let element = {
            tag : document.createElement('div'),
            // name : this.#name,
            // city : this.#city,
            // email : this.#email,
        }

        contactContainer.appendChild(element.tag);
        element.tag.classList.add('contact');

        // name
        let namePara = document.createElement('p');
        namePara.innerHTML = `Name: ${this.#name}`;
        element.tag.appendChild(namePara);

        // city
        let cityPara = document.createElement('p');
        cityPara.innerHTML = `City: ${this.#city}`;
        element.tag.appendChild(cityPara);

        // email
        let emailPara = document.createElement('p');
        emailPara.innerHTML = `Email: ${this.#email}`;
        element.tag.appendChild(emailPara);
        
        element.tag.addEventListener('click', function () {
            if (element.tag.matches('div')) {
                element.tag.remove();
            }
        })
    }

    listContacts() {
        this.createContactCard();

    }
}

// Selectors
const contactInput = select('.contact-input');
const submit = select('.submit');
const contactContainer = select('.contact-container');
const contactElement = select('.contact');


onEvent('click', submit, function () {
    let contactString = contactInput.value;
    let values = contactString.split(', ');

    let name = values[0];


    let city = values[1];
    let email = values[2];


    let person = new Contact(name, city, email);
    console.log(person);
    person.listContacts();
})