import { html, LitElement } from "lit";
import "../../components/Cards";

export class Home extends LitElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <div class="dm-hero dm-mt-3">
                <div class="dm-title">Welcome to Marquee</div>
                <div class="dm-lead">Marquee is a demo of LitElement web components.</div>
            </div>
        `;
    }

    createRenderRoot() {
        return this;
    }
}
customElements.define("my-home", Home);
