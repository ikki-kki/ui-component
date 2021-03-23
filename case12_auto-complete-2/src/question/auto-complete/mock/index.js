const request = {
    data: [
        {
            text: 'Kenneth'
        },
        {
            text: 'Kali'
        },
        {
            text: 'Kellan'
        },
        {
            text: 'Jack'
        },
        {
            text: 'James'
        },
        {
            text: 'John'
        },
        {
            text: 'Dana'
        },
        {
            text: 'Danny'
        },
        {
            text: 'Daniel'
        },
        {
            text: 'Dacey'
        },
        {
            text: 'Aiden'
        },
        {
            text: 'Adam'
        },
        {
            text: 'Adrian'
        },
        {
            text: 'Ben'
        },
        {
            text: 'Benji'
        },
        {
            text: 'Benjamin'
        },
        {
            text: 'Benny'
        }
    ]
}

export class RequestMockAdapter {
    constructor() {}

    get(url, param) {
        return new Promise((resolve) => {
            resolve(
                param ?
                request.data.filter((item) => item.text.toLocaleLowerCase().indexOf(param.toLocaleLowerCase()) > -1) :
                []
            );
        })
    }
}
