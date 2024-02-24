const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const userMod = require('./Models/users');
const Conversation = require('./Models/conversation');
const Message = require('./Models/message')
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io")




app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
const server = http.createServer(app);
const io = socketIo(server);


app.use(express.static('public'));

mongoose.connect("mongodb+srv://praveen:rampal26@cluster0.lujadtu.mongodb.net/")
.then(() => console.log("DB connected"))
.catch((err) => console.log(err))

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "public/Images");
    },
    filename: function(req, file, cb) {
        return cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage});


app.post('/register' ,async (req, res) => {
    const {name, email, password} = req.body;
    console.log(name);
    const user = await userMod.findOne({email});
    if(user) {
        return res.status(400).json({error: "Email is registered"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new userMod({name, email, password: hashedPassword});
    await newUser.save();
    res.status(200).json({message: "Success created!!!"})
})

app.get('/user-profile/:email', (req, res) => {
    const email = req.params.email;
    userMod.findOne({ email })
        .then(user => {
            if (user) {
                res.status(200).json({
                    name: user.name,
                    bio: user.bio,
                    country: user.country,
                    village: user.village,
                    photo: user.profile,
                    id: user._id,
                    requests: user.friendsRequests,
                    friends: user.friends,
                });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        })
        .catch(err => {
            console.error('Error fetching user profile:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

app.get('/userRequests/:id', async (req,res) => {
    const {id} = req.params;
    try {
        const user = await userMod.findById(id);
        if(!user) res.status(401).json({message: 'User not found'});
        res.status(200).json(user);
        
    } catch(err) {
        res.status(501).json({message: 'Internal server error'});
    }
})

app.post('/acceptRequests/:userId', async (req, res) => {
    const { userId } = req.params;
    const { acceptedId } = req.body;

    try {
        const user = await userMod.findById(userId);
        const receiever = await userMod.findById(acceptedId);
        
        if (!user || !receiever) {
            return res.status(404).json({ message: 'User Not Found!!!' });
        }

        const index = user.friendsRequests.indexOf(acceptedId);
        if (index !== -1) {
            user.friendsRequests.splice(index, 1);
        }

        const newConversation = new Conversation({
            participants: [userId, acceptedId]
        })

        const savedConvo = await newConversation.save();

        user.friends.push(acceptedId);
        await user.save();

        res.status(200).json({ message: "Friend request accepted" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});



app.post('/upload',upload.single('photo'), async(req, res) => {
    // const base64Data = photo.split(';base64,').pop();
    // const filename = uuidv4();
    // const imagePath = `./public/Images/${filename}.jpeg`;
    
    // fs.writeFileSync(imagePath, base64Data, { encoding: 'base64' });
    try {
        const {name, email, bio, country, village} = req.body;
        console.log(req.file);
        
        await userMod.findOneAndUpdate({email}, {bio: bio, country: country, village: village, name: name,  profile: req.file.filename })
       
        

        res.status(200).json({message: req.file});
    } catch(er) {
        res.status(400).json({error: 'not received'});
        console.log(er);
    }
})


app.post('/login', async(req, res) => {
    const {email, password} = req.body;
       try {           
           const user = await userMod.findOne({email});
          
           if(user) {
               const compare = await bcrypt.compare(password, user.password);
               
               if(compare) {
                   res.status(200).json({success: true})
                   console.log("correct");
                } else {
                    res.status(400).json({error: "Invalid password"});

                }
            } else {
                res.status(400).json({error: "Invalid user"});
                console.log("error");
            }
       }
       catch (error) {
        res.status(500).json({error: "Internal server error"});
       }
            
})  

app.post(`/send-request/:userId`, async(req, res) => {
    
    try {
        const {userId} = req.params;
        const {senderId} = req.body;
        
        const user = await userMod.findById(userId);
        const receiver = await userMod.findById(senderId)

        if(!user || !receiver) {
            res.status(401).json({message: 'Not found!!!'})
        }
        if (user.friendsRequests.findById(senderId) != senderId) {
            user.friendsRequests.push(receiver._id);
            await user.save();
        }
         res.status(200).json()
        
    }catch(err) {
        console.log(err)
    }
})


app.get('/friends-list', async (req, res) => {
    try {
        const users = await userMod.find();
        res.json(users);
    } catch(err) {
        res.status(501).json({error: err.message})
    }
})
 
// messages

app.post('/send-message', async(req,res) => {
    const { senderID,receiverID,messageText } = req.body;

    const sender = await userMod.findById(senderID);
    const receiver = await userMod.findById(receiverID);

    if(!sender || !receiver) {
        res.status(404).json({message: "Message not found"});
    }

    const newMessage = new Message({
        senderID,
        receiverID,
        message: messageText,
    })

    const savedMessage = await newMessage.save();
    const conversations = await Conversation.findOne({
        participants: {$all: [senderID, receiverID]}
    })

    if(!conversations) {
        return res.status(404).json({message: 'Coversation not found'})
    }
    conversations.messages.push(savedMessage._id);
    await conversations.save();
    io.to(conversations._id).emit('new-message', savedMessage);
}) 

app.get('/get-messages', async (req, res) => {
    const { userID, receiverID } = req.query;
    try {
        const conversations = await Conversation.findOne({
            participants: {$all: [userID, receiverID]}
        }).populate('messages')
        if (!conversations) {
            return res.status(404).json({ message: 'Coversation not found' })
        }
        res.status(200).json(conversations._id);
    } catch (err) {
        console.log(err)
    }

})

app.listen(8000, console.log('running'))