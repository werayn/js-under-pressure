/**
 * @constant has
 * @desc copy object property
 * @version 1.0
 * @since 1.0
 * @private
 */
const has = Object.prototype.hasOwnProperty;

class UrlBuilder {
    /**
     * @method transform build url with param
     * @desc transform method bring every parameters and generate the right url.
     * @param {string} url based url
     * @param {string} params params to build with url
     * @return {string} final url
     * @static
     * @version 1.0
     * @since 1.0
     */
    static transform(url, params) {
        const re = /\{([^}]+)\}/g;

        if (!params || !url) {
            return null;
        }

        const m = url.match(re);

        if (m !== null) {
            for (let i = 0; i < m.length; i++) {
                const keyword = m[i].replace(/\{|\}/gi, '');

                if (has.call(params, keyword)) {
                    url = url.replace(m[i], params[keyword]);
                }
            }
        }

        return url;
    }

}

export default UrlBuilder;
