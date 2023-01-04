const express = require('express');
const app = express();
const Language = require('../../../models/movies/languages')
const { success, error, validation } = require("../../../helpers/apiResponse");
const { CleanData } = require("../../../helpers/cleanEmptyData");
const Users = require('../../../models/user/user');


const getUserLanguage = async function (req, res){    
    try {
        const List = await Language.find();
        //console.log(List)
        //const{keyword}=req.body;
        const keyword=req.session.user.default_language
        const languageList = await Language.find({keyword:keyword});
        console.log(languageList)
        res.send(languageList)
    } catch (error) { 
        res.send(error)   
    }
}

const getLanguagebySession = async function (req, res){    
    try {
        if(req.session){
            const List = await Language.find();
            //console.log(List)
            //const{keyword}=req.body;
            const keyword=req.session.user.default_language
            const languageList = await Language.find({keyword:keyword});
            console.log(languageList)
            res.send(languageList)

        }
        
    } catch (error) { 
        res.send(error)   
    }
}


module.exports = {
    getUserLanguage
}