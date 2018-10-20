import React from 'react'
import ReactDOM from 'react-dom'

import * as GQL from './schemas/gqlhub'
import Autograph from './autograph'

    
function App(){
    return <Autograph
        url={GQL.url}
        render={(Query: GQL.GraphQLHubAPI) => <div>
            <table style={{ width: '100%' }}><tbody>
            {Query.hn.topStories({ limit: 20 }).map(story => 
                <tr key={story.id}>
                    <td>{story.score}</td>
                    <td><a href={story.url} target="_blank">{story.title}</a></td>
                    <td>
                        <b>{story.by.id}</b>
                        <ul>{story.by.submitted({ limit: 3 }).map(sub => 
                            <li>{sub.title}</li>)}</ul>
                    </td>
                    <td style={{ maxWidth: 500}}>
                    ({story.descendants || 0} comments)
                    <ul>{story.kids({ limit: 2 })
                        .map(comment => <li dangerouslySetInnerHTML={{ __html: comment.text }}></li>)}</ul>
                    </td>

                </tr>)}

            </tbody></table>
        </div>} />
}


ReactDOM.render(<App />, document.getElementById('root'))