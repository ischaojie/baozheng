import axios from 'axios';

function source_submit(category, origin_id) {
    let url = '/mark/' + origin_id
    axios.post(url, {
        category: category
    })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
        });
}


