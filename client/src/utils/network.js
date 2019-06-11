import Config from './config.js';
import request from './request.js';

const TIMEOUT = 20000;

/**
 * @function Network
 * @public
 * @version 1.0
 * @since 1.0
 * @desc Factory function to create a object that can send
 * requests to a specific resource on the server.
 * @param {string} accessToken optionnal param used for protected routes
 * @return {promise} response
 */
const Network = () => {
    const defaultOptions = {
        baseURL: Config.API_URL,
        timeout: TIMEOUT,
        responseType: 'json',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    };

    return {
        post: (path, data, options = {}) => {
            return request(path, Object.assign(
                defaultOptions,
                options,
                {
                    method: 'post',
                    data,
                }
            ));
        },

        get: (path, params, options = {}) => {
            return request(path, Object.assign(
                defaultOptions,
                options,
                {
                    method: 'get',
                    params,
                }
            ));
        },

        put: (path, data, options = {}) => {
            return request(path, Object.assign(
                defaultOptions,
                options,
                {
                    method: 'put',
                    data,
                }
            ));
        },

        patch: (path, data, options = {}) => {
            return request(path, Object.assign(
                defaultOptions,
                options,
                {
                    method: 'patch',
                    data,
                }
            ));
        },

        delete: (path, options = {}) => {
            return request(path, Object.assign(
                defaultOptions,
                options,
                {
                    method: 'delete',
                }
            ));
        },
    };
};

export default Network;
