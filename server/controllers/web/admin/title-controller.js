const express = require('express');
const { success, error, validation } = require("../../../helpers/apiResponse");



const addLanguageTitle = async function (req, res){
      
    try {
        res.send("this is title  controllers")
    } catch (error) { 
        res.send(error)   
    }
}


module.exports = {
    addLanguageTitle
}