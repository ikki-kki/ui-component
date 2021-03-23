const data = [
    {
        id: '',
        label: '선택하세요.'
    },
    {
        id: '0001',
        label: 'Google'
    },
    {
        id: '0002',
        label: 'Yahoo'
    },
    {
        id: '0003',
        label: 'Wiki'
    },
    {
        id: '0004',
        label: 'FaceBook'
    }
];

export const retrieveSelectList = () => {
    return data;
}

export const retrieveFavoriteById = (id) => {
    return data.find((item) => item.id === id);
}
