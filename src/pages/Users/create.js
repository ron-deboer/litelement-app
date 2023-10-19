import { LitElement, html } from "lit";
import store from "../../store";

class CreateUser extends LitElement {
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
            if (e.detail.item == "users") {
                _this.getUsers();
            }
        });
        this.getUsers();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener("APP_STATE", (e) => {});
    }

    getUsers() {
        this.data = store.state.users;
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
                <h3>User List</h3>
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
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.filtered.map((user) => {
                        return html`
                            <tr>
                                <td>${user.name}</td>
                                <td>${user.username}</td>
                                <td>${user.email}</td>
                                <td>${user.address.city}</td>
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

customElements.define("create-user", CreateUser);
