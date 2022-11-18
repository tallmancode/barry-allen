import {defineApi, defineContainer, defineNotificationComponent} from "@/lib/core";

const _key = '$barryAllen'
const _containerName = 'BarryAllenContainer'
const _notificationComponentName = 'BarryAllenNotification'

export const defineBarry = (options) => {
    let api = defineApi()
    defineNotificationComponent(api, options)
    return {
        [_key]: api,
        [_containerName]: defineContainer(api)
    }
}

const install = function installBarryAllen(app, options = {}) {

    const { $barryAllen, BarryAllenContainer } = defineBarry(options)

    Object.defineProperty(app.config.globalProperties, _key, {
        get() {
            return $barryAllen
        }
    })
    app.provide(_key, $barryAllen)
    app.component(_containerName, BarryAllenContainer)
};

export default install;

