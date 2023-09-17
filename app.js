const express = require('express'); // on importe le module Express.js de node js
const bodyParser = require('body-parser');
const { getUniqueID } = require('./helper.js')
let members = require('./members');

const app = express(); // on crée l'application Express
port = 3006; // on défini un port d'écoute pour le serveur

//MIDDLEWARE
app.use(bodyParser.json())

// POINTS DE TERMINAISONS 
app.get('/', (req, res) => { res.send('Salut')}) // requête test

// Lecture de tous les nombres
app.get('/api/members', (req, res) => {
    const message = `Voici la liste des ${members.length} membres :`;
    res.json({message, members});
    //ameliorer le code en utilisant forEach sur le tableau
})

// Lecture d'un membre par ID
app.get('/api/members/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const member = members.find( member => member.id === id );
    const message = `Le membre demandé a été retrouvé.`;
    res.json({message, member});
    //console.log(member)
})

// Lecture d'un membre par son NAME
app.get('/api/members/name/:name', (req,res) => {
    const name = req.params.name;
    const membersFilterByName = members.filter(member => member.name == name );
    const message = "Ce membre a été retrouvé"
    res.json({message, membersFilterByName});    
})

// Creation d'un membre
app.post('/api/members', (req, res) => {
    const id = getUniqueID(members);
    const newMember = {...req.body,...{id: id, created : new Date()}};
    members.push(newMember);
    res.json({message : `Un nouveau membre a été ajouté.`, newMember})
})

// Mise à jour d'un membre par ID
app.put('/api/members/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const memberUpdated = {...req.body, id : id };
    members = members.map(member => { // mise à jour 
        return member.id === id ? memberUpdated : member
    })
    res.json({message : `Le membre ${memberUpdated.id} a été modifié.`, memberUpdated })
})

// Suppression d'un membre par ID
app.delete('/api/members/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const memberDeleted = members.find(member => member.id === id );
    members = members.filter(member => member.id !== id);
    res.json({message : `Le membre ${memberDeleted.id} a été supprimé.`, memberDeleted })
})

app.listen(port, () => { //on démarre le serveur
    console.log('Port du serveur :'+ port)
})