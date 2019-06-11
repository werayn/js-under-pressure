import HttpError from 'standard-http-error';
import axios from 'axios';

/**
 * @function request
 * @desc Make a request with fetch
 * @param {string} url url to call
 * @param {object} options options contain the parameters, headers...
 * @returns {promise}
 * @public
 * @version 1.0
 * @since 1.0
 */
async function request(url, options) {
    if (!url) {
        throw new Error('Preflight request error: URL parameter required');
    }

    if (!options) {
        throw new Error('Preflight request error: options parameter required');
    }

    // Fetch returns a promise
    return axios({
        url,
        ...options,
    }).then((response) => {
        return response.data;
    });
}

function isDev() {
    return (process.env.NODE_ENV === 'development');
}

function getUrl(config) {
    if (config.baseURL) {
        return config.url.replace(config.baseURL, '');
    }
    return config.url;
}

axios.interceptors.request.use(
    (config) => {
        if (isDev()) {
            config.ts = Date.now();
            console.log('%c ' + config.method.toUpperCase() + ' - '
                        + getUrl(config) + ':', 'color: #0086b3; font-weight: bold', config);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axios.interceptors.response.use(
    (response) => {
        if (isDev()) {
            try {
                const requestDuration = Number(Date.now() - response.config.ts);
                console.log('%c ' + response.status + ' - '
                            + getUrl(response.config)
                            + ' %c+' + requestDuration.toFixed() + 'ms%c :',
                'color: #008000; font-weight: bold',
                'color: #ffa500; font-weight: bold',
                'color: #008000; font-weight: bold',
                response);
            } catch (err) {
                console.log('%c ' + err, 'color: #a71d5d; font-weight: bold');
            }
        }
        return response;
    },
    (error) => {
        if (isDev()) {
            try {
                console.log('ERR: ', error);
                const requestDuration = Number(Date.now() - error.response.config.ts);
                console.log('%c ' + error.response.status + ' - '
                            + getUrl(error.response.config)
                            + ' %c+' + requestDuration.toFixed() + 'ms%c :',
                'color: #a71d5d; font-weight: bold',
                'color: #ffa500; font-weight: bold',
                'color: #a71d5d; font-weight: bold',
                error.response);
            } catch (err) {
                console.log('%c ' + err, 'color: #a71d5d; font-weight: bold');
            }
        }
        return Promise.reject(new HttpError(
            error.response.status,
            `Server error: ${error.response.status} status`,
            { data: error.response.data },
        ));
    },
);

export default request;
