let gulp = require("gulp");
let sass = require("gulp-sass");
let webserver = require("gulp-webserver");
gulp.task("devsass",function(){
	return gulp.src("./src/scss/**/*.scss")
	.pipe(sass())
	.pipe(gulp.dest("./src/css"))
}) 
gulp.task("watch",function(){
	gulp.watch("./src/scss/**/*.scss",gulp.series("devsass"))
}) 
gulp.task("server",function(){
	return gulp.src("./src")
	.pipe(webserver({
		port:1314,
		proxies:[
			{
				source:"/api/getData",
				target:"http://localhost:3000/api/getData"
			},
			{
				source:"/api/getSort",
				target:"http://localhost:3000/api/getSort"
			}
		]
	}))
	
}) 
gulp.task("default",gulp.series("server","watch"))
