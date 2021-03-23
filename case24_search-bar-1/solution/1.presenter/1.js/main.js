// unsplash : https://unsplash.com/documentation#search-photos
// debounce : https://lodash.com/docs/4.17.15#debounce
const accessKey = "hPyF-tz9tHnxeaoTwb7q0GTw10Wxwr85cD63lk7d7UE";
const input = document.querySelector('input');
const dropdownMenu = document.querySelector('.dropdown-menu');
const imageInfo = document.querySelector('.image-info');


// 이미지 검색 API
const fetchImages = async search => {
    const res = await axios.get('https://api.unsplash.com/search/photos/', {
        params: {
            client_id: accessKey,
            query: search
        }
    });

    return res.data.results;
};

// 이미지 단일 정보 API
const fetchImage = async id => {
    const res = await axios.get(`https://api.unsplash.com/photos/${id}`, {
        params: {
            client_id: accessKey,
        }
    });

    return res.data;
}

// 검색 드랍다운 표기
const onSearch = async e => {
    const images = await fetchImages(e.target.value);
    if(!images.length) {
        dropdownMenu.classList.remove('show');
        return;
    }
    dropdownMenu.classList.add('show');
    dropdownMenu.innerHTML = '';
    listTemplate(images);
}

// 검색 드랍다운 리스트 표기
const listTemplate = (images) => {
    for(const image of images) {
        const {id, alt_description, urls} = image;
        const li = document.createElement('li');
        li.classList.add('dropdown-item');
        li.innerHTML = `
            <img src="${urls.regular}" alt="${alt_description}">
            <span>${alt_description}</span>
        `;
        dropdownMenu.appendChild(li);

        li.addEventListener('click', async () => {
            dropdownMenu.classList.remove('show');
            input.value = alt_description;
            imageTemplate(await fetchImage(id));
        })
    }
}

// 선택한 이미지 정보 표기
const imageTemplate = (image) => {
    const {urls, alt_description} = image;
    imageInfo.src = urls.regular;
    imageInfo.alt = alt_description;
}

// input.addEventListener('input', onSearch);
input.addEventListener('input', _.debounce(onSearch, 600));
