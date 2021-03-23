// Import stylesheets
import './style.css';
import { AutoComplete } from './question/auto-complete';


const bootstrap = () => {
    // instant search setup
    const autoComplete = new AutoComplete({
        selector: '#auto-complete',
        css: 'auto-complete-input',
        placeholder: 'please enter keyword',
        request: {
            url: '/search'
        }
    });
}

bootstrap();
