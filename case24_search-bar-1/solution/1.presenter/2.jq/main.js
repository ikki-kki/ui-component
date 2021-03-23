// unsplash : https://unsplash.com/documentation#search-photos
// debounce : https://lodash.com/docs/4.17.15#debounce
const accessKey = "hPyF-tz9tHnxeaoTwb7q0GTw10Wxwr85cD63lk7d7UE";
const $input = $('input');
const $dropdownMenu = $('.dropdown-menu');
const $imageInfo = $('.image-info');

const fetchImages = async search => {
    const res = await axios.get('https://api.unsplash.com/search/photos/', {
        params: {
            client_id: accessKey,
            query: search
        }
    });
    return res.data.results;
};
const fetchImage = async id => {
    const res = await axios.get(`https://api.unsplash.com/photos/${id}`, {
        params: {
            client_id: accessKey,
        }
    });

    return res.data;
}

/*
const onSearch = async e => {
    const images = await fetchImages(e.target.value);
    if(!images.length) {
        $dropdownMenu.removeClass('show');
        return;
    }
    $dropdownMenu.addClass('show');
    $dropdownMenu.empty();
    listTemplate(images);
}

const listTemplate = (images) => {
    $.each(images, (index, image) => {

        const {id, alt_description, urls} = image;
        const $li = $(`<li class="dropdown-item"><img src="${urls.regular}" alt="${alt_description}"><span>${alt_description}</span></li>`);
        $dropdownMenu.append($li);

        $li.on('click', async () => {
            $dropdownMenu.removeClass('show');
            $input.val(alt_description);
            imageTemplate(await fetchImage(id));
        })
    })
}

const imageTemplate = (image) => {
    const {urls, alt_description} = image;
    $imageInfo.attr('src', urls.regular);
    $imageInfo.attr('alt', alt_description);
}

$input.on('input', _.debounce(onSearch, 600));
*/



// data 속성 활용
/*
const listTemplate = (images) => {
    $.each(images, (index, image) => {
        const {id, alt_description, urls} = image;
        const $li = $(`<li class="dropdown-item" data-image='${JSON.stringify({id, alt_description})}'><img src="${urls.regular}" alt="${alt_description}"><span>${alt_description}</span></li>`);
        $dropdownMenu.append($li);
    })
}

$(document).on('click', '.dropdown-item', async function() {
    const image = $(this).data('image');
    const {id, alt_description} = image;
    $dropdownMenu.removeClass('show');
    $input.val(alt_description);
    imageTemplate(await fetchImage(id));
})
*/