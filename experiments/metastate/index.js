import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import useMetastate from './metastate'
const ReactInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;


const sampleData = {
    first_name: 'Richard',
    middle_name: 'Phillips',
    last_name: 'Feynman',
    alma_mater: 'MIT',
    born: 'May 11, 1918, Queens, New York, NY',
    died: 'February 15, 1988, Los Angeles, CA',
    bio: "Richard Phillips Feynman (/ˈfaɪnmən/; May 11, 1918 – February 15, 1988) was an American theoretical physicist, known for his work in the path integral formulation of quantum mechanics, the theory of quantum electrodynamics, and the physics of the superfluidity of supercooled liquid helium, as well as in particle physics for which he proposed the parton model. For his contributions to the development of quantum electrodynamics, Feynman, jointly with Julian Schwinger and Shin'ichirō Tomonaga, received the Nobel Prize in Physics in 1965."
}


let cache = {}
function cachedFetcher(fields){
    if(fields.every(k => k in cache)) return cache
    
    console.warn("Cache miss— fetching", fields)
    throw new Promise((resolve, reject) => {
        setTimeout(() => {
            for(let field of fields){
                cache[field] = sampleData[field]
            }
            resolve()
        }, 1300)
    })
}


function Profile({ data }){
    let [ isExpanded, setExpanded ] = useState(false);
    return <fieldset>
        <legend>Profile</legend>

        <h1>{data.get('first_name')} {isExpanded && data.get('middle_name')} {data.get('last_name')}</h1>

        <div><strong>Born: </strong>{data.get('born')}</div>
        {isExpanded && <div><strong>Died: </strong>{data.get('died')}</div>}
        <div><strong>Alma Mater: </strong>{data.get('alma_mater')}</div>
        {isExpanded && <p>{data.get('bio')}</p>}

        {isExpanded ? 
            <a href="javascript:void(0)" onClick={e => setExpanded(false)}>less...</a> :
            <a href="javascript:void(0)" onClick={e => setExpanded(true)}>more...</a>}
    </fieldset>
}


function Counter({ data }){
    let [ count, setCount ] = useState(0)
    let [ x, setX ] = useState(42)
    
    data.get(count)
    data.get(x)

    return <fieldset>
        <legend>Counter (Hooks)</legend>

        {count}
        <button onClick={e => setCount(count + 1)}>
            + Increment
        </button>
        <button onClick={e => setCount(count - 1)}>
            - Decrement
        </button>
    </fieldset>
}



class ChildCounter extends React.Component {
    constructor(){
        super()
        this.state = {
            count: 1000
        }
    }
    render(){
        this.props.data.get(this.state.count)

        return <fieldset>
            <legend>Counter (Class)</legend>
            <button onClick={e => {
                this.setState({ count: this.state.count + 1 })
            }}>This button was clicked { this.state.count } times</button>
        </fieldset>
    }
}



function Subpanel({ data }){
    return <div>
        <React.Suspense fallback={<div>Loading profile info...</div>}>
            <Profile data={data} /> 
        </React.Suspense>
        <Counter data={data} />
        <ChildCounter data={data} />
    </div>
}


function Widget(){
    let data = useMetastate(cachedFetcher);

    return <div>
          
        <fieldset style={{ float: 'right' }}>
            <legend>Requested bits of data</legend>
            {data.requestedFields.map((k, i) => <li key={i}>{k}</li>)}
        </fieldset>

        <Subpanel data={data} /> 
    </div>
}


function App(){
    let [ count, setCount ] = useState(0)
    let [ x, setX ] = useState(42)
    return <div>
        <button onClick={e => setCount(count + 1)}>
            Re-render app
        </button>
        <hr />
        <Widget />
    </div>
}

ReactDOM.render(<React.unstable_ConcurrentMode><React.Suspense fallback={<div>Loading...</div>}>
    <App />
</React.Suspense></React.unstable_ConcurrentMode>, document.getElementById('root'))

