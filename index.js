const express = require('express');

const { sequelize, User } = require('./models');

const app = express();

app.use(express.json());

app.post('/users', async(req, res)=>{
    const {name, email, role} = req.body;
    try{
        const user = await User.create({name, email, role});
        return res.status(201).json(user);
    }
    catch(error){
        console.error(error);
        return res.status(500).json(error);
    }
});

async function db(){
    await sequelize.sync({
        alter: true,
        force: true
    });
}
app.listen({
    port: 5000
}, async () => {
    console.log('server up on http://127.0.0.1:5000');
    await db();
})