class Store {
    api = {
        crypto_1: "https://api.exchangerate-api.com/v4/latest/AUD",
        crypto_2: "https://api.coincap.io/v2/assets",
        users_1: "https://jsonplaceholder.typicode.com/users",
        books_1: "http://localhost:5000/api/v1/books/all",
    };

    state = {
        audusd: 0.66,
        crypto: [],
        users: [],
        books: [],
    };

    constructor() {
        this.fetchCrypto();
        this.fetchUsers();
        this.fetchBooks();
    }

    async fetchCrypto() {
        let resp = await fetch(this.api.crypto_1);
        let json = await resp.json();
        this.state.audusd = json.rates.USD;
        resp = await fetch(this.api.crypto_2);
        json = await resp.json();
        this.setState("crypto", json.data);
    }

    async fetchUsers() {
        const resp = await fetch(this.api.users_1);
        const json = await resp.json();
        this.setState("users", json);
    }

    async fetchBooks() {
        const resp = await fetch(this.api.books_1);
        const json = await resp.json();
        this.setState("books", json);
    }

    getState(item) {
        return this.state[item];
    }

    setState(item, data) {
        console.log("setState...");
        this.state[item] = data;
        window.dispatchEvent(new CustomEvent("APP_STATE", { bubbles: false, detail: { item } }));
    }
}

export default new Store();
