/**
 * Created by Rana on 15-05-09.
 */

'use strict';

var express = require('express');
var app = express();
var cn = require('clustered-node');
var planeCrashModel = require('./model/planeCrashModel');
var config     = require('./config');
var noOfWorker = config.noOfWorker;

var API_URI = 'Latest_plane_crash';

//return article
app.get('/'+API_URI, function (req, res) {
    planeCrashModel.read(function(article){
        if(article){
            res.send(article);
        }
        else{
            res.status(404).send('');
        }
    })
});

//save/update article
app.post('/'+API_URI, function(req, res){
    var edited_article = '';

    req.on('data', function(chunk){
        edited_article += chunk;
    });

    req.on('end', function(){
        planeCrashModel.write(edited_article, function(status){
            if(status){
                res.status(201).send('');
            }
            else{
                res.status(500).send('');
            }
        })
    });
});

//start server in multi-process mode
cn.listen({port:config.port, workers: noOfWorker}, app);