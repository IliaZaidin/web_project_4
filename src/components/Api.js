export default class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._token = options.token;
    }

    getUserData() {
        return fetch(`${this._url}/users/me`, {
            headers: { authorization: this._token }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        })
        .catch((err) => {
            console.log("Error: ", err.status, err.statusText);
        });
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: { authorization: this._token }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        })
        .catch((err) => {
            console.log("Error: ", err.status, err.statusText);
        });
    }

    editProfile(name, about) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        })
        .catch((err) => {
            window.alert("Something went wrong. Please cancel and try again.");
            console.log("Error: ", err.status, err.statusText);
        });
    }

    updateProfilePicture(link) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                avatar: link
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Error: ${res.status}`);
                }
            })
            .catch((err) => {
                window.alert("Something went wrong. Please cancel and try again.");
                console.log("Error: ", err.status, err.statusText);
            });
    }

    addCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        })
        .catch((err) => {
            window.alert("Something went wrong. Please cancel and try again.");
            console.log("Error: ", err.status, err.statusText);
        });
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: { authorization: this._token }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        })
        .catch((err) => {
            console.log("Error: ", err.status, err.statusText);
        });
    }

    like(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'PUT',
            headers: {
                authorization: this._token
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        })
        .catch((err) => {
            console.log("Error: ", err.status, err.statusText);
        });
    }

    dislike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        })
        .catch((err) => {
            console.log("Error: ", err.status, err.statusText);
        });
    }
}