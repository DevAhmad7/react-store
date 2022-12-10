# react-store - v1.0.1
- A library based on (ContextApi) for managing state in the application.
- Supported for (react/react-native/next)

 ### :x:normal-store:exclamation:
 - when change state all components re-render
<div>
     <img src="https://i.ibb.co/17Jwgwj/normal-store.gif" alt="normal-store" />
</div>

### :white_check_mark:react-store:white_check_mark:
- when change state just component with current selector re-render
<div>
    <img src="https://i.ibb.co/THLdmXP/react-store.gif" alt="react-store" />
 </div>
 
## Create Store
* Example
- make file (main-store.js) then call import
```js
import ReactStore from "*path*/react-store";
```
- set your state
```js
const createState = {
  first: "Ahmad",
  last: "Hassan",
  info: { age: 28 }
};
```
- set your dispatch
```js
const createDispatch = (data, tools, actions) => {
  const { type, payload } = data; // return action as type and payload
  const { update, state } = tools; // you can use thunk function from tools
  /*
    Update is a function that takes two parameters
    1- value type: object => payload. like { age: 30 } - required
    2- selector type: string => Where is the update. like "info"
    This example will only update the age in 'info' key
  */
  const setName = () => {
    const fullName = payload.value?.toUpperCase();
    update({ fullName })
  }

  switch (type) { // action type
    case actions.setName: // actions type
      return setName(); // you can write code like this to controle payload
    case actions.logout:
      return update(payload); // Or pass the payload directly
    default:
      break;
  }
};
```
- create your store and pass (state, dispatch)
```js
const reactStore = new ReactStore(createState, createDispatch);

export const MainProvider = reactStore.Provider;
export const useMainSelector = reactStore.useSelector;
export const useMainDispatch = reactStore.useDispatch;
```

## Usage
- in root file
```js
import { MainProvider } from "*path*/main-store";
// import Provider to wrap main component
...
export default function MyApp() {
  return (<MainProvider>
    {/* children */}
  </MainProvider>);
}
```
- Example useSelector
```js
import { useMainSelector } from "*path*/main-store";
...
const ExampleState = () => {
  // you can use this useMainSelector at any components
  const value = useMainSelector("first"); // return Ahmad
  // Or useMainSelector((state) => state.first); // return Ahmad
  // Or useMainSelector("full", (state) => `${state.first} ${state.last}`); // return Ahmad Hassan
  // In all cases above, it will not be re-render, Except when changing the value of first
  /*
    useMainSelector is a function that takes two parameters
    1- selector type: (string | function) - required
      :string like "info.age" return 28
      :function like (state) => state.info.age
    2- fallback type: any => if value undefined return this value from fallback
      :string like useMainSelector("status", "offline"); // return offline if status undefined
      :array like useMainSelector("nums", ["one", "two"]); // return ["one", "two"] if nums undefined
      :function like useMainSelector("full", (state) => state.first); // return Ahmad if full undefined
  */
  return (<span>{value}</span>);
};
```
- Example useDispatch
```js
import { useMainDispatch } from "*path*/main-store";
...
const ExampleDispatch = () => {
  // you can use this useMainDispatch at any components
  const dispatch = useMainDispatch(); // return a function => dispatch
  /*
    dispatch is a function that takes two parameters
    1- param1 type: (object | function | string) - required
      :string like dispatch("setName", { value: e.target.value })
      :object like dispatch({ age: e.target.value }, "info") return update function directly
      :function like dispatch(async (update) => { 
          // callback return two parameters update,state
          try {
            const res = await fetch(`https://api`);
            const data = await res.json();
            update({ last: data.last }); learn more about update => See above
          } catch (e) {...}
        })
    2- param2 type: any => payload
  */
  return (<input type="text"
     onChange={(e) => dispatch("setName", { value: e.target.value })}
  />);
};
```
goto [WhatsApp](https://api.whatsapp.com/send?phone=201112785677) to learn more
