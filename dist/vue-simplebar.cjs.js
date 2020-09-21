'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Simplebar = _interopDefault(require('simplebar'));

class ScrollMovements {
    /**
     * New ScrollMovement instance
     *
     * @param  {HTMLElement} element
     * @param  {Vue} vue
     */
    constructor(element, vue) {
        this.el = element;
        this.vue = vue;

        this.lastScroll = this.saveScrollPosition();
        this.reach = this.resolveAxisPosition();

        this.contentWidth = null;
        this.containerWidth= null;
        this.contentHeight = null;
        this.containerHeight = null;
    }

    /**
     * Checks if the scroll moved in the X or Y axis and saves the scroll position
     *
     * @return {void}
     */
    onScroll () {
        this.scrolling('y', this.el.scrollTop - this.lastScroll.y);
        this.scrolling('x', this.el.scrollLeft - this.lastScroll.x);

        this.lastScroll = this.saveScrollPosition();
    }

    /**
     * [scrolling description]
     *
     * @param  {String} axis
     * @param  {Number} diff
     * @return {mixed}
     */
    scrolling (axis, diff) {
        if (axis === 'y') {
            return this.processScrollDiff(diff, ['scrollHeight', 'clientHeight', 'scrollTop', 'y', 'up','down'])
        }

        return this.processScrollDiff(diff, ['scrollWidth', 'clientWidth', 'scrollLeft', 'x', 'left','right'])
    }

    /**
     * Checks if the scroll is at the begining or the end of its container and emits an event when so
     *
     * @param  {Number} diff
     * @param  {String} contentSize
     * @param  {String} containerSize
     * @param  {String} scrollDirection
     * @param  {String} axis
     * @param  {String} start
     * @param  {String} end
     * @return {Event}
     */
    processScrollDiff (diff, [contentSize, containerSize, scrollDirection, axis, start, end]) {
        this.reach[axis] = null;

        if (this.el[scrollDirection] < 1) {
            this.reach[axis] = 'start';
        }

        if (this.el[scrollDirection] >= this.el[contentSize] - this.el[containerSize]) {
            this.reach[axis] = 'end';
        }

        if (this.reach[axis] && diff) {
           return this.vue.$emit(`scroll-${axis}-reach-${this.reach[axis]}`)
        }
    }

    /**
     * Saves the last scroll position for both axis
     *
     * @return {Object}
     */
    saveScrollPosition () {
        return {
            y: Math.floor(this.el.scrollTop),
            x: this.el.scrollLeft
        }
    }

    /**
     * Resolves the starting values of both axis. Can be either 'start', 'end' or null
     *
     * @return {Object}
     */
    resolveAxisPosition () {
        return {
            x: this._xAxisPosition(),
            y: this._yAxisPosition()
        }
    }

    /**
     * Resolves the X axis position
     *
     * @return {String|null}
     */
    _xAxisPosition () {
        if (this.el.scrollLeft <= 0) {
            return 'start'
        }

        if (this.el.scrollLeft >= this.contentWidth - this.containerWidth) {
            return 'end'
        }

        return null
    }

    /**
     * Resolves the Y axis position
     *
     * @return {String|null}
     */
    _yAxisPosition () {
        if (this.el.scrollTop <= 0) {
            return 'start'
        }

        if (this.el.scrollTop >= this.contentHeight - this.containerHeight) {
            return 'end'
        }

        return null
    }
}

var VueSimplebar = {
    name: 'vue-simplebar',

    props: {
        options: {
            type: Object,
            required: false,
            default: () => {}
        },

        tag: {
            type: String,
            required: false,
            default: 'section'
        }
    },

    data: () => ({
        sb: null,
    }),

    computed: {
        el () {
            return this.sb.getScrollElement()
        }
    },

    render (h) {
        return h(this.tag, {
            ref: 'container',
            on: this.$listeners
        }, this.$slots.default)
    },

    mounted() {
        this.init();
        this.scroll = new ScrollMovements(this.el, this);
    },

    beforeDestroy() {
        this.destroy();
    },

    methods: {
        /**
         * Initializes the simplebar
         *
         * @return {void}
         */
        init () {
            if (!(this.sb && this.$isServer)) {
                this.sb = new Simplebar(this.$refs.container, this.options);
                this.el.addEventListener('scroll', this.scrollListener);
            }
        },

        /**
         * Listens for the scroll event
         *
         * @return {void}
         */
        scrollListener () {
            this.scroll.onScroll();
        },

        /**
         * Removes all listeners and unmounts the simplebar plugin
         *
         * @return {void}
         */
        destroy () {
            if (this.sb) {
                this.el.removeEventListener('scroll', this.scrollListener);
                this.sb.unMount();
                this.sb = null;
            }
        },

        /**
         * Helper method to set the scroll at top of the container
         *
         * @return {void}
         */
        scrollTop () {
           this.el.scrollTop = 0;
        },

        /**
         * Helper method to set the scroll at the bottom of the container
         *
         * @return {void}
         */
        scrollBottom () {
           this.el.scrollTop = this.el.scrollHeight;
        },

        /**
         * Helper method to set the scroll in the given position
         *
         * @param  {Number} position
         * @return {void}
         */
        scrollTo(position = 0) {
           this.el.scrollTop = position;
        }
    }
};

const install = (Vue, options) => {
    if (options) {
        if (options.name && typeof options.name === 'string') {
            VueSimplebar.name = options.name;
        }

        if (options.options && typeof options.options === 'object') {
            VueSimplebar.props.options.default = () => {
                return options.options
            };
        }

        if (options.tag && typeof options.tag === 'string') {
            VueSimplebar.props.tag.default = options.tag;
        }
    }

    Vue.component(VueSimplebar.name, VueSimplebar);
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(install);
}

exports.VueSimplebar = VueSimplebar;
exports.default = install;
