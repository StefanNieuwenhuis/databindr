import './components/greeter.component.js';
import './components/business-card.component.js';

const greeter = document.querySelector('my-greeter');
greeter.state = { 'name': 'Stefan' };

const card = document.querySelector('my-business-card');
card.state = {
    'firstname': 'John',
    'lastname': 'Doe',
    'address': {
        'street': '123 Main St',
        'city': 'Anytown',
        'country': 'USA'
    }
};
