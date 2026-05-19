PS F:\Web\shixi\dianteyun-uniapp> npm run dev:mp-weixin

> .@0.1.0 dev:mp-weixin
> unh dev -p mp-weixin

> uni dev -p h5 -p mp-weixin 

node_modules/@dcloudio/uni-app/dist/uni-app.es.js (1:46): "isInSSRComponentSetup" is not exported by "node_modules/vue/dist/vue.runtime.esm-bundler.js", imported by "node_modules/@dcloudio/uni-app/dist/uni-app.es.js".
at ../node_modules/@dcloudio/uni-app/dist/uni-app.es.js:1:46
  1: import { shallowRef, ref, getCurrentInstance, isInSSRComponentSetup, injectHook } from 'vue';
                                                   ^
  2: import { hasOwn } from '@vue/shared';
  3: export { capitalize, extend, hasOwn, isPlainObject } from '@vue/shared';
