var express=require("express");
var app=express();
var path=require("path");
var bodyParser=require("body-parser");
var startups=require("./app/models/startup.js");
var mentors=require("./app/models/mentor.js");
var admins=require("./app/models/admin.js");
var projects=require("./app/models/project.js");
var works=require("./app/models/work.js");
var visitors=require("./app/models/visitors.js");
var investors=require("./app/models/investor.js");
var mongoose=require("mongoose");
var multer=require("multer");
// var popup=require("popups");
var session=require("express-session");
var md5=require("md5");
var nodemailer=require("nodemailer");
// var cookieParser=require("cookie-parser");
mongoose.connect('mongodb://localhost/incubation');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
// app.use(cookieParser());
app.use(session({secret:"your secret key"}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(function(req,res,next){
	res.locals.result=null;
	res.locals.ment=null;
	next();
});
app.use(express.static(__dirname + '/public'));
// var Storage=multer.diskStorage({
// 	destination:function(req,file,callback){
// 		callback(null,__dirname + "/public/uploads/images");
// 	},
// 	 filename:function(req,file,callback){
// 		callback(null,file.fieldname+"-"+Date.now()+'.jpg');
// 	}
// })
// var upload=multer({storage:Storage}).single('file');
app.get("/getregisterStartup",function(req,res){
	res.render("registerStartup.ejs");
})
app.get("/getregisterMentor",function(req,res){
	res.render("registerMentor.ejs");
})
app.get("/getloginmentor",function(req,res){
	res.render("mentorlogin.ejs");
})
app.get("/getloginstartup",function(req,res){
	res.render("startuplogin.ejs");
})
app.get("/getloginadmin",function(req,res){
	res.render("adminlogin.ejs");
})
app.get("/getregistervisitor",function(req,res){
	res.render("visitorregister.ejs");
})
app.get("/getevents",function(req,res){
	res.render("events.ejs");
})
app.get("/getvideos",function(req,res){
	res.render("newvideo.ejs")
})
app.get("/getprojectform",function(req,res){
	res.render("project.ejs")
})
app.get("/getfaqs",function(req,res){
	res.render("faqs.ejs");
});
app.get("/getsessions",function(req,res){
	res.render("sessions.ejs");
})
var sess={lid:null};
app.get("/liststartups",function(req,res){
	var data=req.body;
	var result={result:[],errors:[],success:false};
	var sups;
	startups.find({},function(err,resp){
              if(err){
              	result.errors.push(err);
              }else{
              	result.result.push(resp);
	res.render("liststartuphome",{
		result:result.result
	})
              }
	})
})
app.get("/listmentors",function(req,res){
	var data=req.body;
	var result={result:[],errors:[],success:false};
	var sups;
	mentors.find({},function(err,resp){
              if(err){
              	result.errors.push(err);
              }else{
              	result.result.push(resp);
	res.render("liststartuphome",{
		result:result.result
	})
              }
	})
})
app.get("/listinvestors",function(req,res){
	var data=req.body;
	var result={result:[],errors:[],success:false};
	var sups;
	investors.find({},function(err,resp){
              if(err){
              	result.errors.push(err);
              }else{
              	result.result.push(resp);
	res.render("liststartuphome",{
		result:result.result
	})
              }
	})
})
app.post("/startupregister",function(req,res){
	var result={success:false,errors:[],result:[]};
	var data=req.body;
	console.log(data);
	if(!data.name){
		result.errors.push("invalid startupname");
	}
	if(!data.headName){
		result.errors.push("invalid headname");
	}
	if(!data.email){
		result.errors.push("invalid email");
	}
	if(!data.contactNumber){
		result.errors.push("invalid contactNumber");
	}
	if(!data.address){
		result.errors.push("invalid address");
	}
	if(!data.password){
		result.errors.push("invalid password");
	}else{
		data.password=md5(data.password);
	}
	if(result.errors.length){
		// console.log(result.errors);
		res.render("register");
	}else{
		startups.findOne({email:data.email},function(errr,respo){
			if(errr){
				result.errors.push(errr);
				// console.log(result.errors);

			}else{
				if(respo){
					console.log(respo);
					result.result.push("already startup exists");
					res.render("register");
					console.log(result);

				}else{
		       startups.create(data,function(err,resp){
			if(err){
				// console.log(result.errors);
				result.errors.push("error in creation");
			}else{
				console.log(result);
				result.success=true;
				var transporter=nodemailer.createTransport({
					service:'gmail',
					auth:{
						user:"kodavatianusha.19@gmail.com",
						pass:'anushanit6'
					}

				});
				var mailOptions={
					from:'kodavatianusha.19@gmail.com',
					to:data.email,
					subject:"simply",
					text:"Thank you for registering with UNO"
				};
				transporter.sendMail(mailOptions,function(errr,info){
					console.log("sending email");
					if(errr){
						console.log(errr);
					}else{
						console.log('email sent'+info.response);
					}
				});
				result.result=resp;

				 res.render("home");
			}
		})
     }
	}
		})
	}
})
app.post("/mentorregister",function(req,res){
	var data=req.body;
	console.log(data);
	var result={result:[],errors:[],success:false};
	if(!data.name){
      result.errors.push("invalid name");
	}
	if(!data.designation){
		result.errors.push("invalid designation");
	}
	if(!data.interestfield){
		result.errors.push("invalid interest fields");
	}
	if(!data.contactNumber){
		result.errors.push("invalid contact Number");
	}
	if(!data.email){
		result.errors.push("invalid email");
	}
	if(!data.password){
		result.errors.push("invalid password");
	}else{
		data.password=md5(data.password);
	}
	// upload(req,res,function(err){
	// if(err){
	// 	res.json({errdesc:err});
	// 	return;
	// }else{
	// 	// if(req.file){
	// 	// 	req.file.path = 'uploads/images/'+req.file.filename;
	// 	// 	return res.send(req.file)
	// 	// }else{
	// 	// 	return res.send(req.file)
	// 	// }
	// 	// console.log(req.file);
	// 	// console.log(req.files);
	// }
	// })
	if(result.errors.length){
		res.render("home");
		console.log(result);
	}else{
		mentors.create(data,function(errr,respo){
			if(errr){
				result.errors.push(errr);
				console.log(errr);
			}else{
				result.success=true;
				result.result=respo;
				console.log(result);
				var transporter=nodemailer.createTransport({
					service:'gmail',
					auth:{
						user:"kodavatianusha.19@gmail.com",
						pass:'anushanit6'
					}

				});
				var mailOptions={
					from:'kodavatianusha.19@gmail.com',
					to:data.email,
					subject:"Registration",
					text:"Thank you for registering with UNO mentor"
				};
				transporter.sendMail(mailOptions,function(errr,info){
					console.log("sending email");
					if(errr){
						console.log(errr);
					}else{
						console.log('email sent'+info.response);
					}
				});
			}
			res.render("home");
		})
	}
})
app.post("/mentorlogin",function(req,res){
	var result={result:[],errors:[],success:false};
	var data=req.body;
	console.log("mentorlogin");
	if(!data.email){
		result.errors.push("invalid email");
	}
	if(!data.password){
		result.result.push("invalid password");
	}else{
		data.password=md5(data.password);
	}
	if(result.errors.length){
		res.render("home");
		console.log(result);
	}else{
		mentors.find(data,function(err,resp){
			if(err){
				result.errors.push(err);
				console.log(result.errors);
			}else{
				if(resp.length){
                              sess.lid=resp[0]._id;
				               result.result=resp;
				               console.log(sess);

				               result.success=true;
				           }
			}
			console.log(result);
			res.redirect("/getprojects")
		})
	}
})
app.get("/mentorprojectsactive",function(req,res){
	var data=req.body;
	var result={results:[],errors:[],success:false};
	projects.find({mentorid:sess.lid,status:"active"},function(err,resp){
		if(err){
			result.errors.push(err);
		}else{
			result.results.push(resp);
			console.log(result.results)
		}
	})
	res.render("mentoractiveproject",{
		result:result.results
	})
})
app.get("/getprojects",function(req,res){
	var data=req.body;
	var result={result:[],success:true,errors:[]};
	projects.find({status:"inactive"},function(err,resp){
		if(err){
			result.errors.push(err);
		}else{ 
			result.result.push(resp);
			console.log(result.result);
			res.render("mentorhome",{
				result:result.result
			})
		}
	})
})
app.post("/updateprojectstatus",function(req,res){
	var data=req.body;
	console.log("data");
	var result={success:false,errors:[],result:[]};
	console.log(data);
	projects.update({_id:data},{$set:{status:"active",mentorId:sess.lid}},function(err,resp){
		if(err){
               result.errors.push(err);
		}else{
			result.result.push(resp);
			var transporter=nodemailer.createTransport({
					service:'gmail',
					auth:{
						user:"kodavatianusha.19@gmail.com",
						pass:'anushanit6'
					}

				});
				var mailOptions={
					from:'kodavatianusha.19@gmail.com',
					to:data.email,
					subject:"Registration",
					text:"Your project got selected with UNO mentor with mentor id:"
				};
				transporter.sendMail(mailOptions,function(errr,info){
					console.log("sending email");
					if(errr){
						console.log(errr);
					}else{
						console.log('email sent'+info.response);
					}
				});
			res.redirect("/getprojects");
		}
	})

})
app.post("/startupactiveprojects",function(req,res){
	var data=req.body;
	var results={results:[],errors:[],sucess:false};
	projects.find({startupid:sess.lid,status:"active"},function(err,resp){
		if(err){
			result.errors.push(err);
		}else{
			result.result.push(resp);
			result.success=true;
		}
	})
	res.render("activestartups",{
		result:result.result
	})
     
})
app.post("/adminlogin",function(req,res){
	var data=req.body;
	// console.log(req);
	console.log("in adminlogin");
	// console.log(data);
	var result={success:false,errors:[],result:[]};
	if(!data.email){
		result.errors.push("invalid email");
	}
	if(!data.password){
		result.errors.push("invalid password");
	}
	if(result.errors.length){
	 res.render("home");
	}else{
		if(data.email=="admin@gmail.com"&&data.password=="admin"){
			result.success=true;
			result.result.push("correct admin");
			console.log(result);
			
		}else{
			result.errors.push("invalid credentials");

		}
		// console.log(result);
		res.redirect("/admin/homestartups");
	}
})
app.get("/admin/homestartups",function(req,res){
	var data=req.body;
	var result={success:false,result:[],errors:[]};
	var ment={success:false,ment:[],errors:[]};
	startups.find({status:"inactive"},function(errr,resp){
		if(errr){
			result.errors.push(errr);
		}else{
			result.result.push(resp);
			// console.log(result.result
		}
		mentors.find({status:"inactive"},function(er,re){
			if(er){
				ment.errors.push(er);
			}else{
				console.log(re);
				ment.ment.push(re);

			    result.success=true;
		        console.log(ment.ment);
		        res.render("adminhome",
			     {result:result.result,
			       ment:ment.ment});
			}
		})
	})

});
app.post("/admin/homestartupactivate",function(req,res){
	var data=req.body;
	var result={result:[],errors:[],success:false};
	startups.update({startupid:data.startupid},{$set:{status:"activate"}},function(err,resp){
		if(err){
			result.errors.push(err);
		}else{
			result.success=true;
			result.result=resp;

		}return res.send(result);
	})
})
// app.post("/adminhomestartupinactivate",function(req,res){
// 	var data=req.body;;
// 	var result={result:[],errors:[],success:false};
// 	startups.remove({startupid:data.startupid},function(err,resp){
// 		if(err){
// 			result.errors.push(err);
// 		}else{
// 			result.result.push(resp);
// 			result.success=true;
// 		}
// 		return res.send(result);
// 	})
// })
// app.get("/adminhomementors",function(req,res){
// 	var data=req.body;
// 	var result={success:false,result:[],errors:[]};
// 	mentors.find({status:"inactive"},function(err,resp){
// 		if(err){
// 			result.errors.push(err);
// 		}else{
// 			result.result=resp;
// 			result.success=true;
// 		}
// 		return res.send(result);
// 	})
// })
// app.post("/adminhomementorsactivate",function(req,res){
// 	var data=req.body;
// 	var result={success:false,result:[],errors:[]};
// 	mentors.update({mentorid:data.mentorid},{$set:{status:"active"}},function(err,resp){
// 		if(err){
// 			result.errors.push(err);
// 		}else{
// 			result.result.push(result);
// 			result.success=true;
// 		}
// 		return res.send(result);
// 	})
// })
// app.post("/adminhomementorinactivate",function(req,res){
// 	var data=req.body;
// 	var result={result:[],errors:[],success:false};
// 	mentors.remove({mentorid:data.mentorid},function(err,resp){
// 		if(err){
// 			result.errors.push(err);
// 		}else{
// 			result.result.push(resp);
// 			result.success=true;
// 		}
// 		return res.json(result);
// 	})
// })
// app.get("/liststartups")
app.post("/loginstartup",function(req,res){
	var data=req.body;
	var result={success:false,result:[],errors:[]};
	// console.log(req);
	// sess.sid=MemoryStore.sessionID;
	if(!data.email){
		result.errors.push("invalid email");
	}
	if(!data.password){
		result.errors.push("invalid password");
	}else{
		data.password=md5(data.password);
	}
	if(!result.errors.length){
		startups.find({email:data.email},function(err,resp){
			if(err){
				result.errors.push(err);
			}else{
				console.log(resp[0]);
				if(resp[0].status=="active"){
					console.log(data);
					startups.find(data,function(errr,respp){
						if(errr){
							result.errors.push(errr);
							result.errors.push("invalid credentials");
							// console.log(result);
						}else{
							console.log("in repsppp");
							console.log(respp);
							result.result.push(respp);
							console.log(respp[0]);
							console.log(respp[0]._id);
							// console.log(sess);

						   // sess.lid=respp[0]._id;
						   console.log("sess");
						   console.log(sess.lid);
							result.success=true;
						}
					})
				}
			}
			res.render("project");
		})
	}
})
app.post("/postproject",function(req,res){
	var data=req.body;
	console.log("postproject");
	var result={success:true,result:[],errors:[]};
	if(!data.title){
		result.errors.push("invalid title");
	}
	if(!data.domain){
		result.errors.push("invalid domain");
	}
	if(!data.description){
		result.errors.push("invalid description");
	}
	data.startupid=sess.lid;
	projects.create(data,function(err,resp){
		if(err){
			result.errors.push(err);
		}else{
			result.result.push(resp);
			result.success=true;
			// popup.alert({
			// 	content:"Your project application is sent"
			// })
			res.render("project");
		}
	})
})
app.get("/startupprofile",function(req,res){
	var result={results:[],errros:[]};
	// var data=req.body;
	console.log("sess");
	// console.log(data);
	startups.find({_id:sess.lid},function(err,resp){
		console.log("in function");
		if(err){
             result.errors.push(err);
		}else{
			result.results.push(resp);
	console.log(resp);
	console.log(result.results[0]);
	res.render("startupprofile",{
		result:result.results[0] 

	})
		}
	})
})
app.get("/liststartupprojects",function(req,res){
	var result={results:[],success:false,errors:[]};
	console.log(sess.lid);
	console.log("list projects");
	projects.find({startupid:sess.lid},function(err,resp){
      if(err){
      	result.errors.push(err);
      }else{
      	console.log(resp);
      	result.results.push(resp);
      	res.render("liststartupprojects.ejs",{
      		result:result.results
      	})
      }
	})
})
// app.get("/getsession",function(req,res){
// 	console.log(req.query);
// 	console.log("session");
	// var result={result:[],errors:[],success:false};
	// console.log(req.session);
	// console.log(req.session.user);
	// if(req.session&&req.session.user&&req.session.user._id){
	// 	result.success=true;
	// 	result.result=req.session.user;
	// 	// console.log(result);
	// 	return res.json(result);
	// }else{   
	// 	result.errors.push("no session exists");
	// 	return res.json(result);
	// }
// })
app.get("/logout",function(req,res){
	var result={result:[],errors:[],success:false};
	sess.lid=null;
	result.success=true;
	res.render("home");
})
app.post("/visitorregister",function(req,res){
	var data=req.body;
	var result={success:false,result:[],errors:[]};
	if(!data.name){
		result.errors.push("invalid name");
	}
	if(!data.contactNumber){
		result.errors.push("invalid contactNumber");
	}
	if(!data.pom){
		result.errors.push("invalid pom");
	}
	if(!data.email){
		result.errors.push("invalid email");
	}
	if(!data.officeNumber){
		result.errors.push("invalid officeNumber");
	}
	if(result.errors.length){
		res.render("home");
	}else{
		visitors.create(data,function(err,res){
			if(err){
				result.errors.push(err);
			}else{
                 result.result.push(res);
                 result.success=true;
                 console.log(result);
			}
		})
	}res.render("home");
})
app.post("/addbook",function(req,res){
	var data=req.body;
	var result={result:[],errors:[],success:false}
	if(!data.title){
		result.errors.push("invalid title");
	}
	if(!data.authorName){
		result.errors.push("invalid authorName");
	}
	if(!data.bookCost){
		result.errors.push("invalid book Cost");
	}
	books.create(data,function(err,resp){
		if(err){
			result.errors.push(err);
		}else{
			result.result.push(resp);
			console.log(resp);
		}
		res.render("libraryhome");
	})
})
app.post("/addmember",function(req,res){
	var data=req.body;
	var result={results:[],errors:[],success:false};
	if(!data.name){
		result.errors.push("invalid name");
	}
	if(!data.contactNumber){
		result.errors.push("invalid contact Number");
	}
	if(!data.bookCost){
		result.errors.push("invalid cost");
	}
	members.create(data,function(err,resp){
		if(err){
			result.errors.push(err);
		}else{
			result.result.push(resp);
			result.success=true;
		}
			res.render("libraryhome");
			console.log(result);
	})

})
app.post("/issuebook",function(req,res){
	var data=req.body;
	var result={result:[],success:false,errors:[]};
    if(!data.bookid){
    	result.errors.push("invalid bookid");
    }
    if(!data.memberid){
    	result.errors.push("invalid memberid");
    }
    issues.create(data,function(err,resp){
    	if(err){
    		result.errors.push(err);
    	}else{
    		result.success=true;
    		result.result.push(resp);
    	}

    })
    res.render("issuebook");
})
app.get('/',function(req,res){
	res.render("home");
})
app.listen(2000,function(){
	console.log("server is working on port 2000");
});

