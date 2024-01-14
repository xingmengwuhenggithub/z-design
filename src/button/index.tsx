import {defineComponent, PropType, h,} from 'vue'
import {ButtonShape, ButtonSize, ButtonType} from "./types";
import Loading from "../loading";
const buttonProps = {
    size: {
        type: String as PropType<ButtonSize>,
        default: 'default'
    },
    type: {
        type: String as PropType<ButtonType>,
        default: undefined
    },
    tag: {
        type: String as PropType<keyof HTMLElementTagNameMap>,
        default: 'button'
    },
    plain: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    shape: {
        type: String as PropType<ButtonShape>,
        default: 'square'
    },
    nativeType: {
        type: String,
        default: undefined
    },
    loading: {
        type: Boolean,
        default: false
    },
    onClick: {
        type: Function,
        default: () => {  }
    }
}

export default defineComponent({
    name: 'Button',
    props: buttonProps,
    setup (props) {
        const handleClick = (e:MouseEvent) => {
            if (!props.disabled){
                props.onClick(e)
            }
        }
        const getStyle = () => {
            const colors = {
                primary: {
                    color: '#409eff',
                    background: '#ecf5ff',
                    borderColor: '#409eff'
                },
                success: {
                    color: '#67c23a',
                    background: '#f0f9eb',
                    borderColor: '#67c23a'
                },
                info: {
                    color: '#909399',
                    background: '#f4f4f5',
                    borderColor: '#909399'
                },
                warning: {
                    color: '#e6a23c',
                    background: '#f0f6ec',
                    borderColor: '#e6a23c'
                },
                danger: {
                    color: '#f56c6c',
                    background: '#f3f0f0',
                    borderColor: '#f56c6c'
                }
            }
            const disabledStyle = {cursor: 'not-allowed',filter: 'opacity(0.6)'}

            let style = {}
            if (props.plain){
                style = props.type ? colors[props.type] : {}
            }
            if (props.disabled){
                style = {...style,...disabledStyle}
            }
            return style
        }



        return {
            handleClick,
            getStyle
        }
    },
    render() {
        const {tag:Component} = this

        return <Component
            onClick={(e:MouseEvent) => this.handleClick(e) }
            type={this.nativeType}
            disabled={this.disabled}
            aria-disabled={this.disabled}
            class={[
                'z-button',
                `btn-size-${this.size}`,
                `${this.type ? 'btn-type-'+this.type: ''}`,
                `${this.plain && 'is-plain'}`,
                `btn-shape-${this.shape}`
            ]}
            style={this.getStyle()}
        >
            {this.$slots.icon?.()}
            {this.loading && <Loading style="width: 14px;margin-right:2px;" visible={this.loading} />}
            {this.$slots.default?.()}
        </Component>
    }
})