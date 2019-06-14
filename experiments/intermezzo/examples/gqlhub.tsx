import React from 'react'
import ReactDOM from 'react-dom'

import { createRoot, useQuery, D } from '../autograph'
import * as GQL from './gqlhub.schema'
import "./hackernews.css"

const AutographRoot = createRoot({
    client: 'https://www.graphqlhub.com/graphql'
})


function App() {
    let query: GQL.Query = useQuery();
    if (query._error) return <div>{query._error.toString()}</div>
    if (query._loading) return <div>Loading....</div>;

    return <center><table id="hnmain" border={0} cellPadding={0} cellSpacing={0} width="85%" bgcolor="#f6f6ef">
        <tbody><tr><td bgcolor="#ff6600"><table border={0} cellPadding={0} cellSpacing={0} width="100%" style={{ padding: '2px' }}><tbody><tr><td style={{ width: '18px', paddingRight: '4px' }}><a href="https://news.ycombinator.com"><img src="https://news.ycombinator.com/y18.gif" width={18} height={18} style={{ border: '1px white solid' }} /></a></td>
            <td style={{ lineHeight: '12pt', height: '10px' }}><span className="pagetop"><b className="hnname"><a href="news">GraphQL News</a></b>
                <a href="newest">new</a> | <a href="threads?id=antimatter15">threads</a> | <a href="front">past</a> | <a href="newcomments">comments</a> | <a href="ask">ask</a> | <a href="show">show</a> | <a href="jobs">jobs</a> | <a href="submit">submit</a>          </span></td><td style={{ textAlign: 'right', paddingRight: '4px' }}><span className="pagetop">
                    <a id="me" href="user?id=antimatter15">antimatter15</a>                (3430) |
                        <a id="logout" href="logout?auth=61b904de7fb3f4fe961534c02c8d8a965db984a3&goto=news">logout</a>                        </span></td>
        </tr></tbody></table></td></tr>
            <tr id="pagespace" title style={{ height: '10px' }} /><tr><td><table border={0} cellPadding={0} cellSpacing={0} className="itemlist">
                <tbody>

                    {
                        query.hn.topStories({ limit: 20 }).map((story, i) => <React.Fragment key={story.id}>
                            <tr className="athing" id={20185182}>
                                <td align="right" valign="top" className="title"><span className="rank">{i + 1}.</span></td>
                                 <td valign="top" className="votelinks"><center><a id="up_20185182"  href="#">
                                     <div className="votearrow" title="upvote" /></a></center></td>
                                     <td className="title"><a href={story.url} className="storylink">{story.title}</a>
                                     <span className="sitebit comhead"></span></td></tr><tr><td colSpan={2} /><td className="subtext">
                                    <span className="score" id="score_20185182">{story.score} points</span> by <a href="user?id=whiskers" className="hnuser">{story.by.id}</a> <span className="age"><a href="item?id=20185182">{story.time}</a></span> <span id="unv_20185182" /> | <a href="flag?id=20185182&auth=3985c528dc060f679d6d0ba1fe1492b71558bc2e&goto=news">flag</a> | <a href="hide?id=20185182&auth=3985c528dc060f679d6d0ba1fe1492b71558bc2e&goto=news" onclick="return hidestory(event, this, 20185182)">hide</a> | <a href="item?id=20185182">{story.descendants}&nbsp;comments</a>            </td></tr>
                            <tr className="spacer" style={{ height: '5px' }} />
                        </React.Fragment>)
                    }

                    <tr className="morespace" style={{ height: '10px' }} /><tr><td colSpan={2} /><td className="title"><a href="news?p=2" className="morelink" rel="next">More</a></td></tr>
                </tbody></table>
            </td></tr>
            <tr><td><table width="100%" cellSpacing={0} cellPadding={1}><tbody><tr><td bgcolor="#ff6600" /></tr></tbody></table><br /><center><span className="yclinks"><a href="newsguidelines.html">Guidelines</a>
                | <a href="newsfaq.html">FAQ</a>
                | <a href="mailto:hn@ycombinator.com">Support</a>
                | <a href="https://github.com/HackerNews/API">API</a>
                | <a href="security.html">Security</a>
                | <a href="lists">Lists</a>
                | <a href="bookmarklet.html" rel="nofollow">Bookmarklet</a>
                | <a href="http://www.ycombinator.com/legal/">Legal</a>
                | <a href="http://www.ycombinator.com/apply/">Apply to YC</a>
                | <a href="mailto:hn@ycombinator.com">Contact</a></span><br /><br /><form method="get" action="//hn.algolia.com/">Search:
                  <input type="text" name="q" defaultValue size={17} autoCorrect="off" spellCheck="false" autoCapitalize="off" autoComplete="false" /></form>
            </center></td></tr>
        </tbody></table></center>

}

let dom = <AutographRoot>
    <App />
</AutographRoot>

ReactDOM.render(dom, document.getElementById('root'))

// global.ag = AutographRoot._root;

// ReactDOM.unstable_createRoot(document.getElementById('root')).render(dom)