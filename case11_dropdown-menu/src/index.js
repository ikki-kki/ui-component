// Import stylesheets
import './style.css';
import { retrieveUserList } from './question/dropdown/mock/user';
import { retrieveSelectList, retrieveFavoriteById } from './question/dropdown/mock/option';
import { DropDownList } from './question/dropdown';


const displayUserList = (selector, data) => {
    let itemList = '';
    for (let i = 0; i < data.length; i++) {
        itemList += `
        <div>
            <span>User: ${data[i].userName}</span>,
            <span>favorites: ${retrieveFavoriteById(data[i]['favorites']).label}</span>
        </div>`
    }
    selector.innerHTML = itemList;
}

const bootstrap = () => {
    // dropdown list setup
    const dropdown = new DropDownList({
        selector: '#dropdown',
        backdrop: '.back-drop',
        idField: 'id',
        labelField: 'label',
        data: retrieveSelectList(),
        changeEvent: (event) => {
            displayUserList(
                document.getElementById('userlist'),
                event.id ? 
                retrieveUserList().filter((item) => item.favorites === event.id) :
                retrieveUserList()
            );
        }
    });

    // user list display
    displayUserList(document.getElementById('userlist'), retrieveUserList());
}

bootstrap();
