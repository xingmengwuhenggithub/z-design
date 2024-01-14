import { createApp } from 'vue'

// import ZUi from 'zeng-design-test'
import ZUi from '../src'
import Root from './root.vue'
import '../src/index.less'

const app = createApp(Root)

app.use(ZUi)
app.mount('#app')
