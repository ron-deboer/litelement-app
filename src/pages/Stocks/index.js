import { LitElement, html } from "lit";
import store from "../../store";

class Stocks extends LitElement {
    static properties = {
        data: [],
        filter: "",
    };

    constructor() {
        super();
        this.data = [];
        this.filter = "";
        this.filtered = [];
    }

    connectedCallback() {
        const _this = this;
        super.connectedCallback();
        window.addEventListener("APP_STATE", (e) => {
            // console.log(e);
            if (e.detail.item == "stocks") {
                _this.getStocks();
            }
        });
        this.getStocks();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener("APP_STATE", (e) => {});
    }

    getStocks() {
        this.data = store.state.stocks;
        this.filtered = this.data;
    }

    onUpdate(e) {
        this.filter = e.target.value.toUpperCase();
        this.filtered = this.data.filter((u) => {
            return u.name.startsWith(this.filter);
        });
    }

    render() {
        return html`
            <div class="dm-flex-space-between">
                <h3>Stock List</h3>
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
            <div class="stock-list">
                ${this.filtered.map((stock) => {
                    return html`
                        <div class="stock-card">
                            <div>${stock.name}</div>
                            <div>${stock.ticker}</div>
                            <div>${stock.price}</div>
                            <div>${stock.marketcap}</div>
                        </div>
                    `;
                })}
            </div>
        `;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define("stock-list", Stocks);
