// demo data

export default {
    users: [
        { id: 1, name: "ed", email: "ed@ex.ocm", age: 10 },
        { id: 2, name: "am", email: "am@ex.ocm", age: 20 },
        { id: 3, name: "ig", email: "ig@ex.ocm", age: 30 },
        { id: 4, name: "ol", email: "ol@ex.ocm", age: 40 }
    ],
    posts: [
        { id: 123, title: "title1", body: "body1", published: true, author: 1 },
        { id: 223, title: "title2", body: "body2", published: true, author: 2 },
        { id: 323, title: "title3", body: "body3", published: true, author: 3 },
        { id: 423, title: "title4", body: "body4", published: true, author: 4 }
    ],
    comments: [
        { id: 31, body: "Lorem ipsum dolor sit amet.", author: 1, post: 123 },
        { id: 32, body: "Lorem ipsum dolor sit amet.", author: 3, post: 223 },
        { id: 33, body: "Lorem ipsum dolor sit amet.", author: 2, post: 323 },
        { id: 34, body: "Lorem ipsum dolor sit amet.", author: 4, post: 423 }
    ]
}
