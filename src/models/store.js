export default {
    state: {
        posts: [
            {
                id: 0,
                "title": "asdasdasd",
                time: "5 Monaten"
            },
            {
                id: 1,
                "title": "zrfhghzrtrfg",
                time: "5 Monaten"
            },
        ]
    },

    getters: {
        get_posts: state => state.posts,
    },

    mutations: {
        add_post: (state, post) => {
            post.id = state.posts.length;
            state.posts.push(post);
            localStorage.setItem("posts", JSON.stringify(state.posts));
        },
        init_store(state) {
            if (localStorage.getItem("posts"))
                state.posts = JSON.parse(localStorage.getItem("posts"));
        },
    },
}
