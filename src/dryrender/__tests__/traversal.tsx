import React from 'react';
import renderer from 'react-test-renderer';
import dryRender from '../dryrender'
import ReactDOM from 'react-dom';
import { any } from 'prop-types';

describe('basic render traversal', () => {
    test('div', () => {
        let callRender = jest.fn()
        function Thing(props: any){
            callRender()
            return <div>thing</div>
        }
        const node = <div>
            <Thing />
        </div>
        dryRender(node, null)
        expect(callRender.mock.calls.length).toBe(1)
    })


    test('function component', () => {
        let callRender = jest.fn()
        function Thing(props: any){
            callRender()
            return <div>thing</div>
        }
        function Stuff(){
            return <Thing />
        }
        const node = <div>
            <Stuff />
        </div>
        dryRender(node, null)
        expect(callRender.mock.calls.length).toBe(1)
    })


    test('class component', () => {
        let callRender = jest.fn()
        class Stuff extends React.Component {
            render(){
                callRender()
                return "wat"
            }
        }
        const node = <div>
            <Stuff />
        </div>
        dryRender(node, null)
        expect(callRender.mock.calls.length).toBe(1)
    })



    test('fragments', () => {
        let callRender = jest.fn()
        function Thing(props: any){
            callRender()
            return <div>thing</div>
        }
        const node = <React.Fragment>
            <div>hello</div>
            <Thing />
            <div>what</div>
        </React.Fragment>
        dryRender(node, null)
        expect(callRender.mock.calls.length).toBe(1)
    })

    test('portals', () => {
        let callRender = jest.fn()

        class Modal extends React.Component<any,any> {
            el:any;
            constructor(props: any){
                super(props)
                this.el = {
                    nodeType: 1,
                    children: []
                }
            }
            render(){
                return ReactDOM.createPortal(this.props.children, this.el)
            }
        }


        function Thing(props: any){
            callRender()
            return <div>thing</div>
        }

        const node = <Modal>
            <div>
                <Thing />
            </div>
        </Modal>

        dryRender(node, null)
        expect(callRender.mock.calls.length).toBe(1)
    })

    test('memo', () => {
        let callRender = jest.fn()


        function Thing(props: any){
            callRender()
            return <div>thing</div>
        }

        const MemoThing = React.memo(Thing, (a, b) => true)

        const node = <div>
            <MemoThing />
        </div>
        
        dryRender(node, null)
        expect(callRender.mock.calls.length).toBe(1)
    })

    test('strict mode', () => {
        let callRender = jest.fn()
        function Thing(props: any){
            callRender()
            return <div>thing</div>
        }
        const node = <React.StrictMode>
            <Thing />
        </React.StrictMode>
        dryRender(node, null)
        expect(callRender.mock.calls.length).toBe(1)
    })

    // test('concurrent mode', () => {
    //     let callRender = jest.fn()
    //     function Thing(props: any){
    //         callRender()
    //         return <div>thing</div>
    //     }
    //     const node = <React.unstable_ConcurrentMode>
    //         <Thing />
    //     </React.unstable_ConcurrentMode>
    //     dryRender(node, null)
    //     expect(callRender.mock.calls.length).toBe(1)
    // })

    test('profiler', () => {
        let callRender = jest.fn()
        function Thing(props: any){
            callRender()
            return <div>thing</div>
        }
        const node = <React.unstable_Profiler onRender={() => {}} id="asdf">
            <Thing />
        </React.unstable_Profiler>
        dryRender(node, null)
        expect(callRender.mock.calls.length).toBe(1)
    })

    test('suspense', () => {
        let callRender = jest.fn()
        function Thing(props: any){
            callRender()
            return <div>thing</div>
        }
        const node = <React.Suspense fallback={<div>loading</div>}>
            <Thing />
        </React.Suspense>
        dryRender(node, null)
        expect(callRender.mock.calls.length).toBe(1)
    })

    test('forward refs', () => {
        let callRender = jest.fn()
        function Thing(props: any){
            callRender()
            return <div>thing</div>
        }
        const FancyButton: any = React.forwardRef((props, ref) => (
            <input ref={ref as any} type="button" className="FancyButton">
              {props.children}
            </input>
        ));

        const node = <FancyButton>
            <Thing />
        </FancyButton>
        dryRender(node, null)
        expect(callRender.mock.calls.length).toBe(1)
    })
})
