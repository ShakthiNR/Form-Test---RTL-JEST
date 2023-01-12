import { rest } from 'msw'

export let users = [
    {
        "username": "Kamal",
        "email": "kamal@g.ni",
        "id": 1673533980337
    },
    {
        "username": "Rajini",
        "email": "rajini@gmail.com",
        "id": 1673533980338
    },
    {
        "username": "Ajith",
        "email": "ajith@gm.com",
        "id": 1673533980339
    },
    {
        "username": "Vijay",
        "email": "vj@gm.ijn",
        "id": 1673533980340
    }
]

export const usersHandlers = [
    rest.get('http://localhost:5000/api/get/users', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(users)
        )
    }),
    rest.delete(`http://localhost:5000/api/delete/user/:userId`, (req, res, ctx) => {
        const userId  = parseInt(req.params.userId.replace(/\D/g,''));  
        if (userId) {
            users = users.filter((user)=>user.id !== userId)
            return res(ctx.status(200))
          }
          return res(ctx.status(400))
      }),
      rest.post("http://localhost:5000/api/create/user",async(req,res,ctx)=>{
        const userData= await req.json();

        const userExists = users.find((user)=>user.email === userData.email )
        if(userExists){
            return res(
                ctx.status(409),
                ctx.json({error:"User Mail Already exists"})
            )
        }else{
            userData.id = users.length +1;
            users.push(userData)
            return res(
                ctx.status(201),
                ctx.json({msg: "User Created Successfully"})
            );
        }
        
      })
]