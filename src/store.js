class Store {
    api = {
        crypto: "http://localhost:5000/api/v1/crypto",
        users: "http://localhost:5000/api/v1/users",
        books: "http://localhost:5000/api/v1/books",
        stocks: "http://localhost:5000/api/v1/stocks",
        aud:
            "https://api.freecurrencyapi.com/v1/latest?" +
            "apikey=sgiPfh4j3aXFR3l2CnjWqdKQzxpqGn9pX5b3CUsz" +
            "&base_currency=AUD&currencies=USD",
    };

    state = {
        audusd: 0.629,
        crypto: [],
        users: [],
        books: [],
        stocks: [],
    };

    constructor() {
        this.fetchCrypto();
        this.fetchUsers();
        this.fetchBooks();
        this.fetchStocks();
    }

    async fetchCrypto() {
        // let resp = await fetch(this.api["aud"]);
        // let json = await resp.json();
        // this.state.audusd = json.data.USD;
        const resp = await fetch(this.api["crypto"]);
        const json = await resp.json();
        this.setState("crypto", json);
    }

    async fetchUsers() {
        const resp = await fetch(this.api["users"]);
        const json = await resp.json();
        this.setState("users", json);
    }

    async fetchBooks() {
        const resp = await fetch(this.api["books"]);
        const json = await resp.json();
        this.setState("books", json);
    }

    async fetchStocks() {
        const resp = await fetch(this.api["stocks"]);
        const json = await resp.json();
        this.setState("stocks", json);
    }

    async update(item, data) {
        await fetch(this.api[item], data);
        const json = await resp.json();
        this.setState(item, json);
    }

    async insert(item, data) {
        const resp = await fetch(this.api[item], {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
            },
        });
        const json = await resp.json();
        this.setState(item, json);
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
