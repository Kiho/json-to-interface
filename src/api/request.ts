import fetch from 'node-fetch';
const basePath = 'https://conduit.productionready.io/api/';

class Requests {
    static async makeRequest(url, method, headers, body?) {
        let request: RequestInit = {
            mode: 'cors',
            method,
            headers
        };
        if (body) {
            request.body = JSON.stringify(body);
        }
        const res = await fetch(basePath + url, request);

        var contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return res.json();
        } else {
            return res.text();
        }
    }
    static makeHeaders() {
        const headers: any = {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        };
        return headers;
    }
    static async get(url) {
        return new Promise(async (res, rej) => {
            try {
                const headers = Requests.makeHeaders();
                const json = await Requests.makeRequest(url, 'GET', headers);
                res(json);
            } catch (err) {
                rej(err);
            }
        });
    }
    static async post(url, body) {
        return new Promise(async (res, rej) => {
            try {
                const headers = Requests.makeHeaders();
                const json = await Requests.makeRequest(url, 'POST', headers, body);
                res(json);
            } catch (err) {
                rej(err);
            }
        });
    }
    static async put(url, body) {
        return new Promise(async (res, rej) => {
            try {
                const headers = Requests.makeHeaders();
                const json = await Requests.makeRequest(url, 'PUT', headers, body);
                res(json);
            } catch (err) {
                rej(err);
            }
        });
    }
    static async delete(url, body) {
        return new Promise(async (res, rej) => {
            try {
                const headers = Requests.makeHeaders();
                const json = await Requests.makeRequest(url, 'DELETE', headers, body);
                res(json);
            } catch (err) {
                rej(err);
            }
        });
    }
}

export default Requests;