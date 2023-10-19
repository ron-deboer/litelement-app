import { LitElement, html, css } from "lit";

class ModalComponent extends LitElement {
    static get properties() {
        return {
            _open: { type: Boolean },
        };
    }

    constructor() {
        super();
        this._open = false;
    }

    connectedCallback() {
        const _this = this;
        super.connectedCallback();
        window.addEventListener("TOGGLE_MODAL", (e) => {
            this._open = !this._open;
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener("TOGGLE_MODAL", (e) => {});
    }

    static styles = css`
        :host {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
        }

        .modal {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
    `;

    updated(changedProperties) {
        if (changedProperties.has("_open")) {
            if (this._open) {
                this.style.display = "flex";
            } else {
                this.style.display = "none";
            }
        }
    }

    render() {
        return html`
            <div class="modal">
                <slot></slot>
            </div>
        `;
    }

    open() {
        this._open = true;
    }

    close() {
        this._open = false;
    }
}

customElements.define("modal-component", ModalComponent);
