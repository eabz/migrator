const knex = require("./knex");

function insertAddress(address){
    return knex("Addresses").insert(address);
}

function getAllAddresses(){
    return knex("Addresses").select("*");
}

function deleteAddress(solana_address){
    return knex("Addresses").where("solana_address", solana_address).del();
}

function updateAddress(solana_address, address){
    return knex("Addresses").where("solana_address", solana_address).update(address);
}

module.exports = {
    insertAddress,
    getAllAddresses,
    deleteAddress,
    updateAddress
}