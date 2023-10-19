import { html, LitElement } from "lit";

export class Navbar extends LitElement {
    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener("CLOSE_MENU", (ev) => this.closeMenu());
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener("CLOSE_MENU", (ev) => this.closeMenu());
    }

    closeMenu() {
        document.querySelector("#menu__toggle").checked = false;
    }

    input(ev) {
        if (ev.keyCode === 13) {
            this.dosearch(ev.target.value);
        }
    }

    dosearch(str) {
        window.dispatchEvent(new CustomEvent("SEARCH", { bubbles: false, detail: str.trim() }));
    }

    render() {
        return html`
            <div class="w-100 dm-bg-default">
                <nav class="dm-navbar">
                    <div class="hamburger-menu">
                        <input id="menu__toggle" type="checkbox" />
                        <label class="menu__btn" for="menu__toggle">
                            <span></span>
                        </label>
                        <ul class="menu__box">
                            <li><a class="menu__item" href="/">Home</a></li>
                            <li><a class="menu__item" href="/Crypto">Crypto</a></li>
                            <li><a class="menu__item" href="/Users">Users</a></li>
                            <li><a class="menu__item" href="/Books">Books</a></li>
                            <li><a class="menu__item" href="/About">About</a></li>
                        </ul>
                    </div>
                    <div class="dm-flex">
                        <a
                            aria-label="Darkmatter"
                            class="dm-nav-item site-name dm-text-larger dm-bold"
                            href="/"
                            tabindex="-1"
                        >
                            DarkMatter
                        </a>
                        <img class="logo" src="logo2.png" height="25" alt="dark matter" />
                    </div>
                </nav>
            </div>
        `;
    }

    createRenderRoot() {
        return this;
    }
}
customElements.define("my-navbar", Navbar);
