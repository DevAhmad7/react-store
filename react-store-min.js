/**
 * //////////////////////////
 * @version 1.0.1
 * @name react-store
 * @update 2022-12-10
 * @author Ahmad Hasan
 * @copyright (c) 2022-2023
 * @todo Updates coming soon
 * //////////////////////////
**/
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _react=_interopRequireWildcard(require("react"));function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(_getRequireWildcardCache=function(e){return e?r:t})(e)}function _interopRequireWildcard(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=_getRequireWildcardCache(t);if(r&&r.has(e))return r.get(e);var a={},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var n in e)if("default"!==n&&Object.prototype.hasOwnProperty.call(e,n)){var c=i?Object.getOwnPropertyDescriptor(e,n):null;c&&(c.get||c.set)?Object.defineProperty(a,n,c):a[n]=e[n]}return a.default=e,r&&r.set(e,a),a}function _defineProperty(e,t,r){return(t=_toPropertyKey(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _toPropertyKey(e){var t=_toPrimitive(e,"string");return"symbol"==typeof t?t:String(t)}function _toPrimitive(e,t){if("object"!=typeof e||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var a=r.call(e,t||"default");if("object"!=typeof a)return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}class InitializeStore{constructor(initialState,dispatch){_defineProperty(this,"handleStore",(()=>{const observers=(0,_react.useRef)(new Set),store=(0,_react.useRef)(this.initialState),state=(0,_react.useCallback)((()=>store.current),[]),update=(0,_react.useCallback)(((value,selector)=>{let current=store.current;selector?eval(`current.${selector} = { ...current.${selector}, ...value };`):current={...current,...value},store.current=current,observers.current.forEach((e=>e()))}),[]),subscribe=(0,_react.useCallback)((e=>(observers.current.add(e),()=>observers.current.delete(e))),[]);return{state:state,update:update,subscribe:subscribe}})),_defineProperty(this,"Provider",(({children:e})=>{const t=this.StoreContext;return _react.default.createElement(t.Provider,{value:this.handleStore()},e)})),this.Actions={},this.dispatch=dispatch,this.initialState=initialState,this.StoreContext=(0,_react.createContext)(null)}}class CreateStore extends InitializeStore{constructor(initialState,dispatch){super(initialState,dispatch),_defineProperty(this,"useSelector",((selector,fallback)=>{const store=(0,_react.useContext)(this.StoreContext);if(store){const extractData=data=>{switch(typeof selector){case"string":const role=selector.replace(/[.]/g,"?."),isCallback="function"==typeof fallback;return fallback=isCallback?fallback(data):fallback,eval(`data?.${role}`)||fallback;case"function":return selector(data);default:return data}};return(0,_react.useSyncExternalStore)(store.subscribe,(()=>extractData(store.state())),(()=>extractData(this.initialState)))}})),_defineProperty(this,"useDispatch",(()=>{const e=(0,_react.useContext)(this.StoreContext);if(e){const{update:t,state:r}=e,a=(0,_react.useCallback)((e=>e(t,r())),[]);return(e,i=null)=>{switch(typeof e){case"object":return t(e,i);case"function":return a(e);default:this.Actions[e]=e;const n={type:e,payload:i},c={thunk:a,update:t,state:r()};return this.dispatch(n,c,this.Actions)}}}}))}}var _default=CreateStore;exports.default=_default;