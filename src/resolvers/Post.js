export default {
    author: ({ author }, args, { db: { users } }, info) => users.find(({ id }) => author === id),
    comments: ({ id }, args, { db: { comments } }, info) => comments.filter(({ post }) => id === post)

}
