import {shallowReactive} from 'vue'
import BarryAllenContainer from "../lib-components/BarryAllenContainer";
import BarryAllenNotification from "../lib-components/BarryAllenNotification";

function bindApi(component, api) {
    const _component = {...component, props: {...component.props}}
    Object.assign(_component.props, {
        api: {type: Object, default: () => api}
    })
    return _component
}

export function defineApi() {
    let _notificationComponent = null

    return {
        notifications: shallowReactive([]),
        success(message, ...args) {
            args['wrapperClass'] = 'success'
            this.show(message, args)
        },
        info(message, ...args) {
            args['wrapperClass'] = 'info'
            this.show(message, args)
        },
        warning(message, ...args) {
            args['wrapperClass'] = 'warning'
            this.show(message, args)
        },
        error(message, ...args) {
            args['wrapperClass'] = 'error'
            this.show(message, args)
        },
        show(message, ...args) {
            return Promise.allSettled([
                new Promise((resolve, reject) => {
                    const notification = {
                        value: true,
                        id: Symbol('barryAllenNotification'),
                        component: _notificationComponent,
                        bind: {},
                        slots: {},
                        on: {},
                        message: message,
                        params: args[0],
                        reject,
                        opened() {
                            resolve('show')
                        }
                    }
                    this.notifications.push(shallowReactive(notification))
                })
            ])
        },
        _setDefaultNotificationComponent(notificationComponent) {
            _notificationComponent = notificationComponent
        }
    }
}

export function defineNotificationComponent(api) {
    const modalComponent = bindApi(BarryAllenNotification, api)
    api._setDefaultNotificationComponent(modalComponent)
    return modalComponent
}

export function defineContainer(api) {
    return bindApi(BarryAllenContainer, api)
}
