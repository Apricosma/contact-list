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
        if (1 === 1) {
            this.#name = name;        
        } else {
            throw ''
        }
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

    render() {
        let element = document.createElement('div');
        contactContainer.prepend(element);
        element.classList.add('contact');

        // cross
        let cross = document.createElement('a');
        element.appendChild(cross);
        cross.classList.add('close');

        // name
        let namePara = document.createElement('p');
        namePara.innerHTML = `Name: ${this.#name}`;
        element.appendChild(namePara);

        // city
        let cityPara = document.createElement('p');
        cityPara.innerHTML = `City: ${this.#city}`;
        element.appendChild(cityPara);

        // email
        let emailPara = document.createElement('p');
        emailPara.innerHTML = `Email: ${this.#email}`;
        element.appendChild(emailPara);

        // delete element
        element.addEventListener('click', function () {
            if (element.matches('div')) {
                let seconds = 0.5;
                element.style.transition = 'opacity '+seconds+'s ease';

                element.style.opacity = 0;
                setTimeout(function() {
                    element.remove();
                }, 500);
                count--;
                head.innerHTML = `Contacts (${count})`
            }
        })      
    }

    listContacts() {
        array.forEach(value => {
            value.render();
            array = [];
        })
    }
}

// Selectors
const contactInput = select('.contact-input');
const submit = select('.submit');
const contactContainer = select('.contact-container');
const contactElement = select('.contact');
const errors = select('.errors');
const head = select('.head');

let count = 0;

onEvent('click', submit, function () {
    const emailRegex = /^(?=^.{8,}$)[-_A-Za-z0-9]+([_.-][a-zA-Z0-9]+)*@[A-Za-z0-9]+([.-][a-zA-Z0-9]+)*\.[A-Za-z]{2,}$/;
    const nameRegex = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/

        let valid = false;
        if (contactInput.value === '' || contactInput.value == null){
            errors.innerHTML = 'You must have an input';
            throw new TypeError('You must have an input')
        }
        valid = true;

        if (valid) {
            let contactString = contactInput.value;
            let values = contactString.split(', ');    
            if (values.length < 3){
                errors.innerHTML = 'Please make sure you have Name, City, Email';
                throw new TypeError('Please make sure you have Name, City, Email');
            }       

            // gets all the values from array
            let name = values[0];
            let city = values[1];
            let email = values[2];

            if (!nameRegex.test(name)) {
                errors.innerHTML = 'Please use first and last name';
                throw new TypeError('Invalid name')
            }

            if (city <= 1) {
                errors.innerHTML = 'City name must be longer than one';
                throw new TypeError('City must be greater than 1')
            }

            if (!emailRegex.test(email)) {
                errors.innerHTML = 'Invalid email';
                throw new TypeError('Invalid email');
            }

            count++;
            head.innerHTML = `Contacts (${count})` 
            let person = new Contact(name, city, email);
            errors.innerHTML = ''; // clears errors
            
            person.listContacts();
        }
})

// enter key submission
contactInput.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        submit.click();
    }
})