export default {
    comments: (parent, args, { db: { comments } }, info) => comments.filter((comment) => parent.id === comment.author),
    posts: (parent, args, { db: { posts } }, info) => posts.filter((post) => parent.id === post.author)
}