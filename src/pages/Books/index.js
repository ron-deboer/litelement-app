import { LitElement, html } from "lit";
import store from "../../store";

import "../../components/Modal";
import "./create.js";

class Books extends LitElement {
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
            if (e.detail.item == "books") {
                _this.getBooks();
            }
        });
        this.getBooks();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener("APP_STATE", (e) => {});
    }

    getBooks() {
        console.log("getBooks");
        this.data = store.state.books;
        console.log(this.data);
        this.filtered = this.data;
    }

    onUpdate(e) {
        this.filter = e.target.value.toUpperCase();
        this.filtered = this.data.filter((u) => {
            return u.title.startsWith(this.filter);
        });
    }

    openModalCreate() {
        document.querySelector("#my-modal").open();
    }

    render() {
        return html`
            <div class="dm-flex-space-between">
                <h3>Book List</h3>
                <div>
                    Filter :
                    <input
                        type="text"
                        @input=${this.onUpdate}
                        value=${this.filter}
                        class="dm-input-small dm-uppercase"
                    />
                </div>
                <div>
                    <a href="#" @click=${this.openModalCreate}>+ New Book</a>
                </div>
            </div>
            <table class="dm-table dm-table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Published</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.filtered.map((book) => {
                        return html`
                            <tr>
                                <td label="Title">${book.title}</td>
                                <td label="Author">${book.author}</td>
                                <td label="Published">${book.published}</td>
                            </tr>
                        `;
                    })}
                </tbody>
            </table>
            <modal-component id="my-modal">
                <create-book></create-book>
            </modal-component>
        `;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define("book-list", Books);
