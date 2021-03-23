// Import stylesheets
import './style.css';
import { ToggleButton } from './question/toggle-button';


const bootstrap = () => {
    const buttonData = [
        'Bold', 'Italic', 'Underline'
    ]
    const toggleButton = new ToggleButton({
        selector: '#toggle-button',
        data: buttonData
    })
}


bootstrap();
