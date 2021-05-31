export default [
    // Insert additional routes here
    {path: '/', component: () => import("@/components/Main")},
    {path: '/post/:postid', component: () => import("@/components/PostPage")},
    { name: 'default', path: '*', component: { name: 'DefaultView', render: h => h('div', 'Default view') }, props: true }
]
