export default class UserInfo {
    constructor(userData) {
        this._userName = document.querySelector(userData.name);
        this._userJob = document.querySelector(userData.job);
    }

    getUserInfo() {
        return { name: this._userName.textContent, job: this._userJob.textContent };
    }

    setUserInfo(name, job) {
        this._userName.textContent = name;
        this._userJob.textContent = job;
    }
}