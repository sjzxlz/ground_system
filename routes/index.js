// 引入需要的模块
var express = require('express'),
 	router = express.Router(),
 	crypto = require('crypto'),
 	User = require('../models/user.js'),
 	Post = require("../models/post.js");

var fs = require("fs");
var multer = require("multer");
var upload = multer({dest: "./uploads"});
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/images");
var conn = mongoose.connection;
var gfs;
var Grid = require("gridfs-stream");
Grid.mongo = mongoose.mongo;

// 主页路由
router.get('/', function(req, res) {
	Post.get(null, function(err, posts) {
		if (err) {
			posts = [];
		}
		res.render('index', {
			title: '首页',
			posts: posts,
			user : req.session.user,
            success : req.flash('success').toString(),
            error : req.flash('error').toString()
		});
	});
});

router.get('/show', function(req, res) {
    res.render("show",{
    	title : "元素展示"
	});
});

// 注册页路由
router.get("/reg",checkNotLogin);
router.get("/reg",function(req,res) {
	res.render("reg",{
		title : "用户注册"
	});
});

router.post("/reg",checkNotLogin);
router.post("/reg",function(req,res) {
	if (req.body['password-repeat'] != req.body['password']) {
		req.flash('error', '两次输入的口令不一致');
		return res.redirect('/reg');
	}
	console.log(req.body['password'])

	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');

	var newUser = new User({
		name: req.body.username,
		password: password,
	});
	//检查用户名是否已经存在
	User.get(newUser.name, function(err, user) {
		if (user)
			err = 'Username already exists.';
		if (err) {
			req.flash('error', err);
			return res.redirect('/reg');
		}

		newUser.save(function(err) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/reg');
			}
			req.session.user = newUser;
			req.flash('success', '注册成功');
			res.redirect('/');
		});
	});
});

// 登录页路由
router.get("/login",checkNotLogin);
router.get("/login",function(req,res) {
	res.render("login",{
		title:"用户登入",
	});
});

router.post("/login",checkNotLogin);
router.post("/login",function(req,res) {
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');

	User.get(req.body.username, function(err, user) {
		if (!user) {
			req.flash('error', '用户不存在');
			return res.redirect('/login');
		}
		if (user.password != password) {
			req.flash('error', '用户口令错误');
			return res.redirect('/login');
		}
		req.session.user = user;
		req.flash('success', '登入成功');
		res.redirect('/');
	});
});

// 登出页路由
router.get("/logout",checkLogin);
router.get("/logout",function(req,res) {
	req.session.user = null;
	req.flash('success', '登出成功');
	res.redirect('/');
});


function checkLogin(req, res, next) {
	if (!req.session.user) {
		req.flash('error', '未登入');
		return res.redirect('/login');
	}
	next();
}
function checkNotLogin(req, res, next) {
	if (req.session.user) {
		req.flash('error', '已登入');
		return res.redirect('/');
	}
	next();
}

// 发言路由
router.post("/post",checkLogin);
router.post("/post",function(req,res) {
	var currentUser = req.session.user;
	var post = new Post(currentUser.name, req.body.post);
	post.save(function(err) {
		if (err) {
			req.flash('error', err);
			return res.redirect('/');
		}
		req.flash('success', '发表成功');
		res.redirect('/u/' + currentUser.name);
	});
});

router.get("/u/:user",function(req,res) {
	User.get(req.params.user, function(err, user) {
		if (!user) {
			req.flash('error', '用户不存在');
			return res.redirect('/');
		}
		Post.get(user.name, function(err, posts) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/');
			}
			res.render('user', {
				title: user.name,
				posts: posts,
			});
		});
	});
});

//unload image
conn.once("open", function(){
    gfs = Grid(conn.db);
    router.get("/home", function(req,res){
        //renders a multipart/form-data form
        res.render("home");
    });
//second parameter is multer middleware.
    router.post("/", upload.single("avatar"), function(req, res, next){
        //create a gridfs-stream into which we pipe multer's temporary file saved in uploads. After which we delete multer's temp file.
        var writestream = gfs.createWriteStream({
            filename: req.file.originalname
        });
        //
        // //pipe multer's temp file /uploads/filename into the stream we created above. On end deletes the temporary file.
        fs.createReadStream("./uploads/" + req.file.filename)
            .on("end", function(){fs.unlink("./uploads/"+ req.file.filename, function(err){res.send("success")})})
            .on("err", function(){res.send("Error uploading image")})
            .pipe(writestream);
    });

// sends the image we saved by filename.
    router.get("/:filename", function(req, res){
        var readstream = gfs.createReadStream({filename: req.params.filename});
        readstream.on("error", function(err){
            res.send("No image found with that title");
        });
        readstream.pipe(res);
    });

//delete the image
    router.get("/delete/:filename", function(req, res){
        gfs.exist({filename: req.params.filename}, function(err, found){
            if(err) return res.send("Error occured");
            if(found){
                gfs.remove({filename: req.params.filename}, function(err){
                    if(err) return res.send("Error occured");
                    res.send("Image deleted!");
                });
            } else{
                res.send("No image found with that title");
            }
        });
    });
});

module.exports = router;
