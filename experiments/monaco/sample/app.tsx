import React from "react";
import ReactDOM from "react-dom";
import * as Autograph from 'autograph'
import * as GQL from "./schema"

const agClient = Autograph.createClient("https://spotify-graphql-server.herokuapp.com/graphql")

function App(){
  let query: GQL.Query = Autograph.useAutograph();
  
  return <div>{
    query.queryArtists({})
      .map(artist => <div>{artist.name}</div>)}
  </div>
}

ReactDOM.render(<Autograph.Root client={agClient}>
    <App />
</Autograph.Root>, document.getElementById('root'))