const data = [
    {
        word: '서울'
    },
    {
        word: '부산'
    },
    {
        word: '대전'
    },
    {
        word: '태권브이'
    },
    {
        word: '서쪽'
    },
    {
        word: '부모님'
    },
    {
        word: '대한민국'
    },
    {
        word: '서쪽마을'
    },
];

// request 흉내를 내기 위해서 promise로 리턴.
export const retrieveWordList = (word) => {
    return new Promise((resolve) => {
        resolve(
            data.filter((item) => item.word.indexOf(word) > -1)
        );
    });
}

