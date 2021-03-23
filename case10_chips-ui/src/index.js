// Import stylesheets
import './style.css';
import { Chips } from './question/chips';


const bootstrap = () => {
    const buttonData = [
        '#vue', '#react', '#angular'
    ]
    const chips = new Chips({
        selector: '#chips',
        data: buttonData
    });

    document.querySelector('.result-button').addEventListener('click', () => {
        
    });
}

bootstrap();
