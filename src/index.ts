import * as components from './components'
import {App} from "vue";
console.log(components)
export default {
    install(app:App) {
        Object.keys(components).map((componentName) => {
            console.log(app,componentName)
            // @ts-ignore
            app.component('Z'+componentName,components[componentName])
        })

    }
}