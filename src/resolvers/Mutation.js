import { v4 } from 'uuid';

export default {
    /*
        QUERY
    */
    createUser: (parent, { data }, { db: { users } }, info) => {
        const emailExists = users.some(({ email }) => email === data.email);
        if (emailExists) { throw new Error('Mail taken.') };
        const user = { id: v4(), ...data }
        users.push(user);
        return user;
    },
    createPost: (parent, { data }, { db: { posts } }, info) => {
        const userExists = users.some(({ id }) => id === data.author);
        if (!userExists) { throw new Error('no user.') };
        const post = { id: v4(), ...data }
        posts.push(post);
        return post;
    },
    createComment: (parent, { data }, { pubSub, db: { comments } }, info) => {
        const userExists = users.some(({ id }) => id === data.author);
        const published = posts.find(({ id, published }) => id === data.post && published);
        if (!userExists) { throw new Error('No User.') }
        else if (!published) { throw new Error('Not published') }
        const comment = { id: v4(), ...data }
        comments.push(comment);
        pubSub.publish(`comment ${id}`)
        return comment;
    },
    /*
        DELETE
    */
    deleteUser: (parent, { id }, { db: { users } }, info) => {
        id = parseInt(id);
        const user = users.findIndex((user) => user.id === id);
        if (user < 0) throw new Error('no User');
        const deleted = users.splice(user, 1);
        posts = posts.filter((post) => {
            const match = post.author === id;
            if (match) { comments = comments.filter(({ author }) => author !== post.id) }
            return !match;
        });
        comments = comments.filter(({ author }) => author !== id);
        return deleted[ 0 ];
    },
    deletePost: (parent, { id }, { db: { posts } }, info) => {
        id = parseInt(id);
        const postIndex = posts.findIndex((post) => post.id === id);
        if (postIndex < 0) throw new Error('no Post');
        const deleted = posts.splice(postIndex, 1);
        comments = comments.filter((comment) => comment.post !== id);
        return deleted[ 0 ];
    },
    deleteComment: (parent, { id }, { db: { comments } }, info) => {
        id = parseInt(id);
        const commentIndex = comments.findIndex((comment) => comment.id === id);
        if (commentIndex < 0) throw new Error('no Comment');
        return comments.splice(commentIndex, 1)[ 0 ];
    },

    /*
        UPDATE
    */
    updateUser: (parent, { id, data: { email, name, age } }, { db: { users } }, info) => {
        id = parseInt(id);
        const user = users.find((user) => user.id === id);
        if (!user) throw new Error('no user');

        if (email) {
            const taken = users.some((user) => user.email === email);
            if (taken) throw new Error('email taken');
            user.email = email;
        }
        if (name) user.name = name;
        if (age !== undefined) user.age = age;

        return user;
    },
    updatePost: (parent, { id, data: { title, body, published } }, { db: { posts } }, info) => {
        id = parseInt(id);
        const post = posts.find((post) => post.id === id);
        if (!post) throw new Error('no post');

        if (title) post.title = title;
        if (body) post.name = body;
        if (typeof(published) === Boolean) post.published = published;

        return post;
    },
    updateComment: (parent, { id, data: { body } }, { db: { comments } }, info) => {
        id = parseInt(id);
        const comment = comments.find((comment) => comment.id === id);
        if (!comment) throw new Error('no comment');

        if (body) comment.body = body;

        return comment;
    }
}