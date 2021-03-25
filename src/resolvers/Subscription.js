export default {
    comment: {
        subscribe: (parent, { postId }, { pubSub, db: { posts } }, info) => {
            const post = posts.find(({ id, published }) => parseInt(postId) === parseInt(id) && published);
            if(!post) throw new Error('no post');
            return pubSub.asyncIterator(`comment ${postId}`);
        }
    },

    post: {
        subscribe: (parent, {}, {pubSub}, info) => {
            return pubSub.asyncIterator(`post`);
        }
    }
}