# Metastate Prototype

The metastate prototype is an experiment into what Autograph could be in the future. 

It supports React Hooks as well as traditional class based components— so you can use whatever state management approach you prefer. It'll properly override the dispatchers so that the side effects become no-ops during the virtual render pass. 

It can even work with child components which maintain their own independent state and use that to select which fields to render. This is useful for instance, if you want to create a "more" button that expands the number of fields displayed. The "isExpanded" status can be kept locally within the component, and if it is true, it may display several additional fields. 

The metastate prototype revolves around the "Hooks" or "amb" style interface, where you simply call `withMetastate` as if it synchronously returned the appropriate data object. This means there's no need to mess around with render props or any of that convoluted logic. 

## problems

The biggest problem with Metastate is that it requires poking around with the React internals. It does two things:

1) it injects a temporary dispatcher which overrides the behavior of the standard react hooks during a virtual rendering pass. 

2) it has a small implementation of a subset of the react reconciliation algorithm used to pull data out of the react fiber data structures and to trigger the appropriate render methods

As these are react internals, there is no real guarantee that they will remain. The temporary dispatcher system for hooks is simple enough that it will likely be available in some for or another for the foreseeable future. The internal representation of Fiber, not so much. 

the subset of the react reconciliation algorithm means that it is relatively brittle— for instance, currently fragments, portals are not supported. additionally, nested arrays of children are not supported. the algorithm for resolving refs to objects is also not correct. 


the other problem is that there is a "flash of unloaded content" which can occur when child component updates without re-rendering the parent component. 

## how does this differ from autograph

autograph uses getters to define the object, here we just have a getter method that one needs to call by string. metastate does not deal with graphql at all, and instead works with a mock data loading interface. 