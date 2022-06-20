const RuleModel = require('../models/Rule.Model');
const axios = require("axios").default;

exports.default = (req, res, next) => {
    res.redirect("/rule/all");
};

exports.getAll = async (req, res, next) => {
    let rules = await axios.get(`http://localhost:${process.env.PORT}/api/rule/all`, {params: {level: "full"}})
    .catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    });
    rules = rules.data.rules
    // res.json(rules);
    
    if(rules) {
        for(let rule of rules) {
            if(rule.KieuDuLieu === "float") {
                rule.isFloat = true;
            } else {
                rule.isFloat = false;
            }
        }
        
        res.render("rule/default", {
            title: "Quản lý quy định",
            layout: "general",
            rules,
        })
    }
};

exports.update = async (req, res, next) => {
    const newRule = {
        "ID": req.params.id,
        "GiaTri":  (req.body.dataType == "int") ? parseInt(req.body.value) : parseFloat(req.body.value),
    }

    const existedRule = await RuleModel.selecOneRule(newRule.ID);
    if(existedRule) {
        if(existedRule.GiaTri != newRule.GiaTri) {
            await RuleModel.updateOneRule(newRule);
            return res.status(200).json({
                message: "Updated Rule successfully",
                status: 200,
            })
        }
    }

    return res.status(400).json({
        message: "Updating Rule is Failed",
        status: 400,
    })
};