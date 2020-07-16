import createPersistedState from 'vuex-persistedstate'
// 所有的插件本身可以接收到 nuxt 实例
export default ({ store }) => {
    window.onNuxtReady(() => {
        createPersistedState({
            key: "store", // 读取本地存储的数据到store
        })(store)
    })
}