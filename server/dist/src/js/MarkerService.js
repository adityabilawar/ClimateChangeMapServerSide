import axios from 'axios';

class MarkerService {
    static getMarkers() {
        return new Promise((resolve, reject) => {
            try {
                console.log(apiURL);
                axios.get(apiURL).then((res) => {
                    const data = res.data;
                    resolve(
                        data.map(marker => ({
                            ...marker,
                        }))
                    );
                });
            } catch (e) {
                reject(e);
            }
        })
    }

    static insertMarker(data) {
        console.log(data);
        return axios.post(apiURL, data);
    }

    static deleteMarker(id) {
        return axios.delete(`${apiURL}${id}`)
    }
}

export default MarkerService;