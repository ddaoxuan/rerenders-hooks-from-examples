## What is this one about

It can be checked here [https://codesandbox.io/s/github/ddaoxuan/rerenders-hooks-from-examples](https://codesandbox.io/s/github/ddaoxuan/rerenders-hooks-from-examples)

This one is clone from an offical example from algolia repo on `hooks-next`, shows off that calling every hook, makes component to rerender twice, just as detached version from the first example based on dhyab proposal where we're actually able to have control over routing

To see the bug happening (disappering `useBreadcrumb` and `useHierarchicalMenu`) - Comment in and out `DynamicWidgets`

## Based on

Official example under `examples/hooks-next` [https://github.com/algolia/react-instantsearch/tree/master/examples/hooks-next](https://github.com/algolia/react-instantsearch/tree/master/examples/hooks-next)

## Questions

- Why those components rerendered twice? Is it hydration?
- Why calling `DynamicWidgets` component, makes the standalone components using hooks disappear?
- Why breadcrumbs disappear when calling `DynamicWidgets`?

- Does that mean that we can either and only call `DynamicWidgets` or standalone components?
- How do we debug algolia in order to better understand the problems we're facing?
