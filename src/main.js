import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'

import 'ant-design-vue/dist/antd.css'

import '@/assets/style/style.scss'

const app = createApp(App);
app.use(Antd).use(store).use(router).mount('#app')

// main.ts
import Websocket from "./utils/websocket"
const WebSocketConnect = () => {
    let wsClient = Websocket(); // 启动websocket
    app.provide("wsClient", wsClient); // 全局注入
};
WebSocketConnect();
app.provide("WebSocketConnect", WebSocketConnect); // 全局注入