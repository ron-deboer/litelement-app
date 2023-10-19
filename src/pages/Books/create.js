import { LitElement, html } from "lit";
import store from "../../store";

class CreateBook extends LitElement {
    constructor() {
        super();
        this._book = {
            title: "",
            author: "",
            published: "",
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
        let data = store.state.books;
        data.push(this._book);
        store.setState("books", data);
        this.closeModal();
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
                <h3>Create Book</h3>
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
