export default class UserInfo {
    constructor() {
        this._userName = document.querySelector('.profile__title');
        this._userJob = document.querySelector('.profile__subtitle');
        this._userAvatar = document.querySelector('.profile__picture');
    }

    getUserInfo() {
        return { name: this._userName.textContent, job: this._userJob.textContent };
    }

    setUserInfo(name, job) {
        this._userName.textContent = name;
        this._userJob.textContent = job;
    }

    setUserAvatar(link) {
        this._userAvatar.src = link;
    }
}