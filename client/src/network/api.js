import Network from '../utils/network';
import UrlBuilder from '../utils/urlBuilder';

class Api {

    fetchLevels() {
        return Network().get('/levels');
    }

    fetchTest(id) {
        return Network().get(UrlBuilder.transform('/levels/{id}/tests', {
            id,
        }));
    }
}

export { Api };
