# Quantum Superposition in Javascript









Autograph depends on being able to faux-symbolically execute some code to determine dataflow dependencies. This is tricky when it comes to control flow, as not all branches can be explored. For example, consider the following code:

```jsx
function Example({ item }){
    if(state.type == 'person'){
        return <div>{item.name} ({item.age})</div>
    }else{
        return <div>{item.type}</div>
    }
}
```

Here with the default value of state, we only fetch `item.type`. This is problematic when `item.type == 'person'` and we need to additionally fetch `item.name` and `item.age`. Ideally we want some way to determine that `item.name`, `item.age`, and `item.type` may all be required to display this.

We don't have access to the `state` object, nor do we know that the behavior changes based on whether or not `state.type == 'person'`, so even if we could manipulate state, it wouldn't be practical for us to trigger the branch execution. 

This is an experiment that enables some degree of tree exploration. It's not fully automatic, and the developer needs to manually mark branches:


```jsx
function Example({ item }){
    if(amb(state.type == 'person')){
        return <div>{item.name} ({item.age})</div>
    }else{
        return <div>{item.type}</div>
    }
}
```

But, by wrapping conditionals, we can then explore all the control flow possibilities. Keep in mind that the function will be executed once for every possible configuration of the branching conditions. That means that if you have `N` independent conditionals, your function may be executed `2^N` times. Fortunately most rendering code doesn't need to branch that much. 

Note that `else if` trees do not count as independent conditionals, so the number of evaluations in that case is linear with the number of clauses. 

