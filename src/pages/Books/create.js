import { LitElement, html } from "lit";
import store from "../../store";

class CreateBook extends LitElement {
    static properties = {
        _book: { state: true },
        _errors: { state: true },
    };

    constructor() {
        super();
        this._book = {
            title: "",
            author: "",
            published: "",
        };
        this._errors = {
            title: "",
            author: "",
        };
    }

    connectedCallback() {
        super.connectedCallback();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }

    saveData() {
        // console.log(this._book);
        let err = false;
        this._book.title = this._book.title.trim();
        this._book.author = this._book.author.trim();
        if (this._book.title == "") {
            this._errors = { ...this._errors, title: "A title is required" };
            err = true;
        }
        if (this._book.author == "") {
            this._errors = { ...this._errors, author: "An author is required" };
            err = true;
        }
        if (!err) {
            store.insert("books", this._book);
            this.closeModal();
        }
    }

    closeModal() {
        window.dispatchEvent(new CustomEvent("TOGGLE_MODAL", { bubbles: false, detail: {} }));
    }

    onUpdate(e) {
        this._book[e.target.name] = e.target.value;
    }

    render() {
        return html`
            <div class="dm-title">
                <h3>Create New Book</h3>
            </div>
            <form class="dm-form dm-form-vertical" onsubmit="javascript:return false;">
                <div class="dm-fieldset">
                    <label class="dm-label">Title</label>
                    <input
                        type="text"
                        name="title"
                        @input=${this.onUpdate}
                        value=${this._book.title}
                        class="dm-input"
                    />
                    ${!!this._errors.title ? html`<div class="dm-error">${this._errors.title}</div>` : ``}
                </div>
                <div class="dm-fieldset">
                    <label class="dm-label">Author</label>
                    <input
                        type="text"
                        name="author"
                        @input=${this.onUpdate}
                        value=${this._book.author}
                        class="dm-input"
                    />
                    ${!!this._errors.author ? html`<div class="dm-error">${this._errors.author}</div>` : ``}
                </div>
                <div class="dm-fieldset">
                    <label class="dm-label">Year Published</label>
                    <input
                        type="text"
                        name="published"
                        @input=${this.onUpdate}
                        value=${this._book.published}
                        class="dm-input"
                    />
                </div>
                <div class="dm-flex-space-between">
                    <button @click=${this.saveData} class="dm-button-small dm-success">Save</button>
                    <button @click=${this.closeModal} class="dm-button-small dm-danger">Close</button>
                </div>
            </form>
        `;
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define("create-book", CreateBook);
