const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const db = require("./db/addresses");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/addresses", async (req, res) => {
    const newAddress = await db.insertAddress(req.body);
    res.status(201).json({ id: newAddress[0] });
})
app.get("/addresses", async (req,res)=>{
    const addresses = await db.getAllAddresses();
    res.status(200).json({ addresses });
});
app.patch("/addresses/:id", async (req, res)=>{
    const solana_address = await db.updateAddress(req.params.id, req.body);
    res.status(200).json( {solana_address} );
});
app.delete("/addresses/:id", async (req, res)=>{
    await db.deleteAddress(req.params.id);
    res.status(200).json({ success: true })
});

app.listen(8000, ()=> console.log("server is running!"));