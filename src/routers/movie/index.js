export default {
    path: '/movie',
    component: () => import('@/views/Movie'),
    children: [
        {
            path: 'city',
            component: () => import("@/components/City")
        },
        {
            path: 'search',
            component: () => import("@/components/Search")
        },
        {
            path: 'comingSoon',
            component: () => import("@/components/ComingSoon")
        },
        {

            path: 'nowPlaying',
            component: () => import("@/components/NowPlaying")
        },
        {
            name: 'detail1',
            path: 'detail/1/:movieId',
            components: {
                default: () => import("@/components/NowPlaying"),
                detail: () => import('../../views/Movie/detail')
            },
            props: {
                detail: true
            }
        },
        {
            name: 'detail2',
            path: 'detail/2/:movieId',
            components: {
                default: () => import("@/components/ComingSoon"),
                detail: () => import('../../views/Movie/detail')
            },
            props: {
                detail: true
            }
        },
        {
            path: '/movie',
            redirect: '/movie/nowPlaying'
        }

    ]
}