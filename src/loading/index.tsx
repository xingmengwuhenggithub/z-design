import {defineComponent,h} from "vue";
const duration = '1.6s'
export default defineComponent({
    name: 'loading-view',
    props: {
        scale: {
            type: Number,
            default: 1
        },
        radius: {
            type: Number,
            default: 100
        },
        visible: {
            type: Boolean,
            default: false
        },
        stroke: {
            type: String,
            default: undefined
        },
        strokeWidth: {
            type: Number,
            default: 28
        },
    },
    render() {
        const {  radius, strokeWidth, stroke, scale } = this
        const scaledRadius = radius / scale
        return <div>
            {this.visible ? <div>
                <svg
                    viewBox={`0 0 ${2 * scaledRadius} ${2 * scaledRadius}`}
                    xmlns="http://www.w3.org/2000/svg"
                    style={{color: stroke}}
                >
                    <g>
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values={`0 ${scaledRadius} ${scaledRadius};270 ${scaledRadius} ${scaledRadius}`}
                            begin="0s"
                            dur={duration}
                            fill="freeze"
                            repeatCount="indefinite"
                        />
                        <circle
                            fill="none"
                            stroke="currentColor"
                            stroke-width={strokeWidth}
                            stroke-linecap="round"
                            cx={scaledRadius}
                            cy={scaledRadius}
                            r={radius - strokeWidth / 2}
                            stroke-dasharray={5.67 * radius}
                            stroke-dashoffset={18.48 * radius}
                        >
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                values={`0 ${scaledRadius} ${scaledRadius};135 ${scaledRadius} ${scaledRadius};450 ${scaledRadius} ${scaledRadius}`}
                                begin="0s"
                                dur={duration}
                                fill="freeze"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="stroke-dashoffset"
                                values={`${5.67 * radius};${1.42 * radius};${
                                    5.67 * radius
                                }`}
                                begin="0s"
                                dur={duration}
                                fill="freeze"
                                repeatCount="indefinite"
                            />
                        </circle>
                    </g>
                </svg>
            </div>:null}
        </div>
    }
})