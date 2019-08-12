import React from 'react'
import ReactDOM from 'react-dom'

import {
    createRoot,
    useQuery,
    Directive,
    withQuery,
    Query,
    AutographBasicClient,
} from '../../src/autograph'
import * as GQL from './gdom.schema'

import './hackernews.css'

const AutographRoot = createRoot({
    client: 'https://cors-anywhere.herokuapp.com/http://gdom.graphene-python.org/graphql',
})

function App() {
    let query: GQL.Query = useQuery()

    if (query._loading) return <div>Loading...</div>

    // let project = query.project({ fullPath: 'inkscape/inkscape' })!;

    // return <div style={{
    //     fontFamily: 'Avenir, Helvetica, sans-serif',
    //     background: 'whiteSmoke'
    // }}>
    //     <img src={project.avatarUrl} style={{ width: 100 }} />
    //     <h1>{project.name}</h1>
    //     <div>{project.description}</div>

    //     <ul>{project.repository!.tree({ })!.blobs({ first: 100 }).edges!.map(k => <li>{k.node!.path}</li>)}</ul>
    // </div>

    let page = query.page({ url: 'http://news.ycombinator.com' })!

    return (
        <center>
            <table
                id="hnmain"
                border={0}
                cellPadding={0}
                cellSpacing={0}
                width="85%"
                bgcolor="#f6f6ef"
            >
                <tbody>
                    <tr>
                        <td bgcolor="#ff6600">
                            <table
                                border={0}
                                cellPadding={0}
                                cellSpacing={0}
                                width="100%"
                                style={{ padding: '2px' }}
                            >
                                <tbody>
                                    <tr>
                                        <td style={{ width: '18px', paddingRight: '4px' }}>
                                            <a href="https://news.ycombinator.com">
                                                <img
                                                    src="https://news.ycombinator.com/y18.gif"
                                                    width={18}
                                                    height={18}
                                                    style={{ border: '1px white solid' }}
                                                />
                                            </a>
                                        </td>
                                        <td style={{ lineHeight: '12pt', height: '10px' }}>
                                            <span className="pagetop">
                                                <b className="hnname">
                                                    <a href="news">GraphQL News</a>
                                                </b>
                                                <a href="newest">new</a> |{' '}
                                                <a href="threads?id=antimatter15">threads</a> |{' '}
                                                <a href="front">past</a> |{' '}
                                                <a href="newcomments">comments</a> |{' '}
                                                <a href="ask">ask</a> | <a href="show">show</a> |{' '}
                                                <a href="jobs">jobs</a> |{' '}
                                                <a href="submit">submit</a>{' '}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'right', paddingRight: '4px' }}>
                                            <span className="pagetop">
                                                <a id="me" href="user?id=antimatter15">
                                                    antimatter15
                                                </a>{' '}
                                                (3430) |
                                                <a
                                                    id="logout"
                                                    href="logout?auth=61b904de7fb3f4fe961534c02c8d8a965db984a3&goto=news"
                                                >
                                                    logout
                                                </a>{' '}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr id="pagespace" title style={{ height: '10px' }} />
                    <tr>
                        <td>
                            <table border={0} cellPadding={0} cellSpacing={0} className="itemlist">
                                <tbody>
                                    {page.query({ selector: 'tr.athing' })!.map((story, i) => (
                                        <React.Fragment key={i}>
                                            <tr className="athing">
                                                <td align="right" valign="top" className="title">
                                                    <span className="rank">
                                                        {story.text({ selector: 'td span.rank' })}.
                                                    </span>
                                                </td>
                                                <td valign="top" className="votelinks">
                                                    <center>
                                                        <a id="up_20185182" href="#">
                                                            <div
                                                                className="votearrow"
                                                                title="upvote"
                                                            />
                                                        </a>
                                                    </center>
                                                </td>
                                                <td className="title">
                                                    <a
                                                        href={story.attr({
                                                            selector: 'td.title a',
                                                            name: 'href',
                                                        })}
                                                        className="storylink"
                                                    >
                                                        {story.text({ selector: 'td.title a' })}
                                                    </a>
                                                    <span className="sitebit comhead">
                                                        &nbsp;(
                                                        {story.text({ selector: 'span.comhead a' })}
                                                        )
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} />
                                                <td className="subtext">
                                                    <span className="score" id="score_20185182">
                                                        {story
                                                            .next({})!
                                                            .text({ selector: 'span.score' })}{' '}
                                                        points
                                                    </span>{' '}
                                                    by{' '}
                                                    <a href="user?id=whiskers" className="hnuser">
                                                        {story
                                                            .next({})!
                                                            .text({ selector: 'a:eq(0)' })}
                                                    </a>{' '}
                                                    <span className="age">
                                                        <a href="item?id=20185182"></a>
                                                    </span>{' '}
                                                    |{' '}
                                                    <a href="item?id=20185182">
                                                        {story
                                                            .next({})!
                                                            .text({ selector: 'a:eq(3)' })}
                                                    </a>{' '}
                                                </td>
                                            </tr>
                                            <tr className="spacer" style={{ height: '5px' }} />
                                        </React.Fragment>
                                    ))}

                                    <tr className="morespace" style={{ height: '10px' }} />
                                    <tr>
                                        <td colSpan={2} />
                                        <td className="title">
                                            <a href="news?p=2" className="morelink" rel="next">
                                                More
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table width="100%" cellSpacing={0} cellPadding={1}>
                                <tbody>
                                    <tr>
                                        <td bgcolor="#ff6600" />
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                            <center>
                                <span className="yclinks">
                                    <a href="newsguidelines.html">Guidelines</a>|{' '}
                                    <a href="newsfaq.html">FAQ</a>|{' '}
                                    <a href="mailto:hn@ycombinator.com">Support</a>|{' '}
                                    <a href="https://github.com/HackerNews/API">API</a>|{' '}
                                    <a href="security.html">Security</a>| <a href="lists">Lists</a>|{' '}
                                    <a href="bookmarklet.html" rel="nofollow">
                                        Bookmarklet
                                    </a>
                                    | <a href="http://www.ycombinator.com/legal/">Legal</a>|{' '}
                                    <a href="http://www.ycombinator.com/apply/">Apply to YC</a>|{' '}
                                    <a href="mailto:hn@ycombinator.com">Contact</a>
                                </span>
                                <br />
                                <br />
                                <form method="get" action="//hn.algolia.com/">
                                    Search:
                                    <input
                                        type="text"
                                        name="q"
                                        defaultValue
                                        size={17}
                                        autoCorrect="off"
                                        spellCheck="false"
                                        autoCapitalize="off"
                                        autoComplete="false"
                                    />
                                </form>
                            </center>
                        </td>
                    </tr>
                </tbody>
            </table>
        </center>
    )
}

let dom = (
    <AutographRoot>
        <App />
    </AutographRoot>
)

ReactDOM.render(dom, document.getElementById('root'))

// global.ag = AutographRoot._root;

// ReactDOM.unstable_createRoot(document.getElementById('root')).render(dom)
