# Metastate Prototype

The metastate prototype is an experiment into what Autograph could be in the future. 

It supports React Hooks as well as traditional class based components— so you can use whatever state management approach you prefer. It'll properly override the dispatchers so that the side effects become no-ops during the virtual render pass. 

It can even work with child components which maintain their own independent state and use that to select which fields to render. This is useful for instance, if you want to create a "more" button that expands the number of fields displayed. The "isExpanded" status can be kept locally within the component, and if it is true, it may display several additional fields. 

The metastate prototype revolves around the "Hooks" or "amb" style interface, where you simply call `withMetastate` as if it synchronously returned the appropriate data object. This means there's no need to mess around with render props or any of that convoluted logic. 

## resolved problems

no more "flash of unloaded content" which can occur when child component updates without re-rendering the parent component. 






## problems

The biggest problem with Metastate is that it requires poking around with the React internals. It does two things:

1) it injects a temporary dispatcher which overrides the behavior of the standard react hooks during a virtual rendering pass. 

2) it has a small implementation of a subset of the react reconciliation algorithm used to pull data out of the react fiber data structures and to trigger the appropriate render methods

As these are react internals, there is no real guarantee that they will remain. The temporary dispatcher system for hooks is simple enough that it will likely be available in some for or another for the foreseeable future. The internal representation of Fiber, not so much. 

the subset of the react reconciliation algorithm means that it is relatively brittle— for instance, currently fragments, portals are not supported. additionally, nested arrays of children are not supported. the algorithm for resolving refs to objects is also not correct. 



## the right way to do this

we shoudl just follow the idea behind greenkeeper and build a good test suite and try it on all of react. 

we need some way of programmatically testing the behavior of this system. 

maybe we want to factor this part out into a separate library, after all the metastate concept (amb for react) is pretty general.


key features:

- execute a dry run render pass recursively
    - render functions in the tree can have side effects, we expect all the side effects to fire
    - including fragments, portals, suspense, error boundaries, class components, functional components, memo, forward ref, context providers, context consumers, profiler components, lazy components, event components, concurrent mode declarations

- extract latest state from class components and functional components (hooks)
    - this tests the ability to interpret react fiber state objects
    - we have some components buried inside some big complciated tree
    - we mutate the state within those components
    - we run the dry run render pass, and some side effect logs the current state, we expect it to be the same
    - this must also work while an event/update is being processed (i.e. eagerly show latest state)




## features used

- suspense
- data loader cache
- concurrent mode
- react hooks
- react internals
- amb



another possibility is that we



## how does this differ from autograph

autograph uses getters to define the object, here we just have a getter method that one needs to call by string. metastate does not deal with graphql at all, and instead works with a mock data loading interface. 

