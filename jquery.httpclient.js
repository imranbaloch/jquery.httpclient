/*!
** Simple jQuery HttpClient library 
** By Imran Baloch
*/

(function ($, undefined) {
    window.HttpClient = function() {
    }

    HttpClient.prototype = {
        getAsync: function (url, done, fail) {
            return sendRequest('GET', undefined, url, done, fail);
        },
        postAsync: function (url, data, mediaType, accept, done, fail) {
            return sendRequest('POST', data, url, mediaType, accept, done, fail);
        },
        postAsJsonAsync: function (url, data, accept, done, fail) {
            return sendRequest('POST', data, url, 'application/json; charset=utf-8', accept, done, fail);
        },
        postAsXmlAsync: function (url, data, accept, done, fail) {
            return sendRequest('POST', data, url, 'application/xml; charset=utf-8', accept, done, fail);
        },
        putAsync: function (url, data, mediaType, accept, done, fail) {
            return sendRequest('PUT', data, url, mediaType, accept, done, fail);
        },
        putAsJsonAsync: function (url, data, accept, done, fail) {
            return sendRequest('PUT', data, url, 'application/json; charset=utf-8', accept, done, fail);
        },
        putAsXmlAsync: function (url, data, accept, done, fail) {
            return sendRequest('PUT', data, url, 'application/xml; charset=utf-8', accept, done, fail);
        },
        deleteAsync: function (url, done, fail) {
            return sendRequest('DELETE', undefined, url, done, fail);
        }
    }

    function sendRequest(type, data, url, mediaType, accept, done, fail) {
        var options = getOptions(type, data, url, mediaType, accept, done, fail);
        return $.ajax(options)
        .done(function (msg) {
            if (options.done) {
                options.done(msg);
            }
        })
        .fail(function (msg) {
            if (options.fail) {
                options.fail(msg);
            }
        });
    }

    function getOptions(type, data, url, mediaType, accept, done, fail) {
        var dataType;
        if (mediaType && typeof mediaType === "function") {
            if (accept && typeof accept === "function") {
                fail = accept;
                accept = undefined;
            }
            done = mediaType;
            mediaType = undefined;
        }
        else if (accept && typeof accept === "function") {
            if (done && typeof done === "function") {
                fail = done;
            }
            done = accept;
            accept = undefined;
        }
        else if (mediaType && accept && typeof mediaType !== "function" && typeof accept !== "function") {
            switch (accept) {
                case accept.indexOf('json') > -1 ? accept : '':
                    dataType = 'json';
                    break;
                case accept.indexOf('xml') > -1 ? accept: '':
                    dataType = 'xml';
                    break;
                case accept.indexOf('script') > -1 ? accept: '':
                    dataType = 'script';
                    break;
                case accept.indexOf('html') > -1 ? accept: '':
                    dataType = 'html';
                    break;
                default:
            }
        }
        var options = {};
        var obj = { type: type, data: data, url: url, done: done, fail: fail, contentType: mediaType, dataType: dataType };
        $.each(obj, function (key, val) {
            if (val) {
                options[key] = val;
            }
        });
        return options;
    }
})(jQuery, undefined);