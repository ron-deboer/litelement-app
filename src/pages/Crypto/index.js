import { LitElement, html } from "lit";
import store from "../../store";

class Crypto extends LitElement {
    static properties = {
        audusd: 0.66,
        data: [],
        filter: "",
    };

    constructor() {
        super();
        this.data = [];
        this.filter = "";
    }

    connectedCallback() {
        const _this = this;
        super.connectedCallback();
        window.addEventListener("APP_STATE", (e) => {
            // console.log(e);
            if (e.detail.item == "crypto") {
                _this.getCrypto();
            }
        });
        this.getCrypto();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener("APP_STATE", (e) => {});
    }

    getCrypto() {
        this.audusd = store.state.audusd;
        this.data = store.state.crypto;
        this.filtered = this.data;
    }

    fmtNum(n) {
        var parts = n.toString().split(".");
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
    }

    onUpdate(e) {
        this.filter = e.target.value.toUpperCase();
        this.filtered = this.data.filter((c) => {
            return c.symbol.startsWith(this.filter);
        });
    }

    render() {
        return html`
            <div class="dm-page-head dm-flex-space-between">
                <h3>Crypto List</h3>
                <span>
                    Filter :
                    <input
                        type="text"
                        @input=${this.onUpdate}
                        value=${this.filter}
                        class="dm-input-small dm-uppercase"
                    />
                </span>
            </div>
            <table class="dm-table dm-table-striped">
                <thead>
                    <tr>
                        <th>Coin</th>
                        <th>Symbol</th>
                        <th>Price (USD)</th>
                        <th>Price (AUD)</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.filtered.map((coin) => {
                        return html`
                            <tr>
                                <td label="Coin">${coin.name}</td>
                                <td label="Symbol">${coin.symbol}</td>
                                <td label="Price (USD)">${this.fmtNum(coin.priceUsd)}</td>
                                <td label="Price (AUD)">${this.fmtNum(coin.priceUsd / this.audusd)}</td>
                            </tr>
                        `;
                    })}
                </tbody>
            </table>
        `;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define("crypto-list", Crypto);
