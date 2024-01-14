import * as components from './components'
import {App} from "vue";
export default {
    install(app:App) {
        Object.keys(components).map((componentName) => {
            // @ts-ignore
            app.component('Z'+componentName,components[componentName])
        })

    }
}