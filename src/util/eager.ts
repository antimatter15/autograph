type State = {
    index: number
    queue: Array<Array<boolean>>
    stack: Array<boolean>
}
var state_stack: Array<State> = []

export function eager(x: boolean) {
    if (state_stack.length === 0) return x

    let state = state_stack[state_stack.length - 1]
    // increment the index pointer
    state.index++
    // check if there is a known override that we should be using
    if (state.stack[state.index] !== undefined) {
        // TODO: detect when there is non-determinism and emit a warning
        return state.stack[state.index]
    } else {
        state.stack[state.index] = x
        // create a dual for the current stack where the value is different
        // and append it to the exploration queue
        let dual = state.stack.slice(0)
        dual[state.index] = !x
        state.queue.push(dual)
        return x
    }
}

export function explore(fn: () => void) {
    let state = {
        index: 0,
        queue: [[]],
        stack: [],
    }
    state_stack.push(state)
    try {
        while (state.queue.length > 0) {
            state.stack = state.queue.shift()!
            state.index = -1
            fn()
        }
    } finally {
        state_stack.pop()
    }
}
