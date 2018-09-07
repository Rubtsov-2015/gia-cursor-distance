import Component from 'gia/Component';
import throttle from 'lodash/throttle';

export default class _Distance extends Component {

    render(distance, x, y) {
        console.warn(distance, x, y);
    }

    setRender() {
        console.warn("Rewrite 'setRender' and 'render' methods");
    }

    mount() {
        this.resize();

        this.mousemoveHandler = throttle(::this.mousemove);
        this.resizeHandler = ::this.resize;

        window.addEventListener('mousemove', this.mousemoveHandler);
        window.addEventListener('resize', this.resizeHandler);

        this.setRender();
    }

    unmount() {
        window.removeEventListener('mousemove', this.mousemoveHandler);
        window.removeEventListener('resize', this.resizeHandler);
    }

    mousemove(event) {
        let distance = this.getDistance(event.clientX + window.scrollX, event.clientY + window.scrollY);
        this.render(distance, -1 * (this.center.x - event.clientX - window.scrollX), -1 *  (this.center.y - event.clientY - window.scrollY));
    }

    getDistance(x, y) {
        return Math.round( Math.sqrt( Math.pow(this.center.x - x, 2) + Math.pow(this.center.y - y, 2) ) );
    }

    resize() {
        this.rect = this.element.getBoundingClientRect();

        this.center = {
            x: this.rect.x + window.scrollX + this.element.offsetWidth/2,
            y: this.rect.y + window.scrollY + this.element.offsetHeight/2,
        }
    }
}