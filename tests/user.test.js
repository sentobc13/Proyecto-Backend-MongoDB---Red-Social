const request = require('supertest');
const app = require('../index.js'); 
const User = require('../models/User.js'); 
const Post = require ('../models/Post.js');
const Comment = require('../models/Comment.js');
require("dotenv").config();
let token
let postId 
let userId
let commentIds



describe("testing", () => {
    afterAll(async () => {
        await User.deleteMany({});
        await Post.deleteMany({});
        await Comment.deleteMany({});
    });
    const user = {
        name: "agustin",
        email: "agus@gmail.com",
        password: "123456",
        birthday: "1997-08-26"
        
    };
    const post = {
        title: "holaaa",
        body: "holaaa",
        userId: userId
    };
    const comment = {
        comment: "Holaaa"
    };
    test("Crear usuario",async()=>{
        const res = await request (app)
        .post("/users")
        .send(user)
        .expect(201);
    expect(res.body.message).toBeDefined();
    })
    test("Login de Usuario", async()=>{
        const res = await request (app)
        .post("/users/login")
        .send(user)
        .expect(200);
        token = res.body.token
        userId = res.body._id
    })

    test("Crear Post",async()=>{
        const res = await request (app)
        .post("/posts")
        .send(post)
        .set({authorization: token})
        .expect(201)
        expect(res.body.message).toBe("Post creado con exito");
        postId = res.body.post._id
    })
    test("Crear Comentario",async()=>{
        const res = await request (app)
        .post("/comments/postId/" + postId)
        .send(comment)
        .set({authorization: token})
        .expect(201);

        expect(res.body.message).toBe("Comentario creado con exito");
        commentIds = res.body.comment._id
    })
    test("Post like", async () => {
        setTimeout(async()=>{
        const res = await request(app)
            .put("/posts/like/" + postId)
            .send(post,user)
            .set({ Authorization: token })
            .expect(200)
            expect(res.body.message).toBe("Like dado con éxito")
    },3000)
    })
    test("Post dislike", async () => {
        setTimeout(async()=>{
        const res = await request(app)
            .put("/posts/dislike/" + postId)
            .send(post,user)
            .set({ Authorization: token })
            .expect(200)
            expect(res.body.message).toBe("Dislike dado con éxito")
    },3000)
    })
    test("Post not Like", async () => {
        setTimeout(async()=>{
        const res = await request(app)
            .put("/posts/notlike/" + postId)
            .send(post,user)
            .set({ Authorization: token })
            .expect(200)
            expect(res.body.message).toBe("Like quitado con éxito")
    },3000)
    })
    test("Post not Dislike", async () => {
        setTimeout(async()=>{
        const res = await request(app)
            .put("/posts/notdislike/" + postId)
            .send(post,user)
            .set({ Authorization: token })
            .expect(200)
            expect(res.body.message).toBe("Dislike quitado con éxito")
    },3000)
    })
    test("Logout de Usuario", async()=>{
        console.log(token);
        const res = await request (app)
        .delete("/users/logout")
        .send(user)
        .set({authorization: token})
        expect(res.body.message).toBe("Desconectado con éxito")
    })
    


    

    

})    