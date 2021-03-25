export default {
    count: {
        subscribe: (parent, args, { pubSub }, info) => {
            let count = 0;
            setInterval(() => {
                count++;
                pubSub.publish('count', { count });
            }, 1000)
            return pubSub.asyncIterator('count');
        }
    },

    comment: {
        subscribe: (parent, { postId }, { pubSub, db: { posts } }, info) => {
            const post = posts.find(({ id, published }) => postId === id && published);
            if(!post) throw new Error('no post');
            pubSub.asyncIterator(`comment ${postId}`);
        }
    }
}