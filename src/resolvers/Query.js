export default {
    add: (parent, { numbers }, ctx, info) => numbers.reduce((acc, cur) => acc + cur),
    comments: (parent, args, { db: { comments } }, info) => comments,
    grades: (parent, { }, ctx, info) => [ 99, 52, 36, 3, 69, 99, 100 ],
    greet: (parent, { name }, ctx, info) => `Hello ${name}`,
    me: () => ({ id: "123", name: "ed", email: "mail" }),
    posts: (parent, args, { db: { posts } }, info) => posts,
    users: (parent, { query }, { db: { users } }, info) => query ? users.filter((item) => item.name.includes(query)) : users,
}