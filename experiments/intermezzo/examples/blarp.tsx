import React from "react";
import ReactDOM from "react-dom";
import { unstable_next } from "scheduler"

let dataCache = {},
  promiseMap = {};

function readCache(key) {
  if (!(key in dataCache)) {
    if (!(key in promiseMap)) {
      promiseMap[key] = new Promise(resolve => {
        // setTimeout(resolve, 0);
        requestAnimationFrame(resolve)
        // resolve()
      }).then(k => (dataCache[key] = "wumbo"));
    }
    throw promiseMap[key];
  }
  return dataCache[key];
}

function MyApp() {
  let [text, setText] = React.useState("Hello");

  readCache(text);
//{React.version}
  return (
    <div>
        
      <input
        type="text"
        value={text}
        onChange={e => {
            unstable_next(() => {
                setText(e.target.value);
            })
        }}
      />

      <button
        onClick={e => {
            unstable_next(() => {
                setText("asdf");
            })
          
        }}
      >
        Change to "asdf"
      </button>
    </div>
  );
}

let dom = (
  <React.Suspense fallback={<div>my fallback</div>}>
    <MyApp />
  </React.Suspense>
);

// ReactDOM.unstable_createSyncRoot(document.getElementById("root")).render(dom, () => {
//     console.log('rendered')
// });

ReactDOM.render(dom, document.getElementById('root'))