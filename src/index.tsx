import React from 'react'
import ReactDOM from 'react-dom'

import * as GQL from './types'
import Autograph from './autograph'

    
function App(){
    return <Autograph
        url="https://graphbrainz.herokuapp.com/"
        render={(Query: GQL.Query) => <div>
            hi
        </div>} />
}




ReactDOM.render(<App />, document.getElementById('root'))