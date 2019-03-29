const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const bs = require("browser-sync");

const scss = ["library/scss/*/*.scss"];
const all = ["library/*.php", "*.php"];

//Compile scss
gulp.task("compile", () => {
  return gulp
    .src("./library/scss/*.scss")
    .pipe(plumber())
    .pipe(
      sass({
        outputStyle: "compressed"
      }).on("error", sass.logError)
    )
    .pipe(
      postcss([
        autoprefixer({
          browsers: ["last 2 versions"],
          cascade: false
        })
      ])
    )
    .pipe(gulp.dest("./library/css"))
    .pipe(bs.stream());
});

gulp.task("watch-scss", ["compile", "compile-login"], () => {
  bs.init({
    proxy: "http://localhost/stock",
    injectChanges: true,
    files: all
  });
  gulp.watch(scss, ["compile", "compile-login"]);
});

gulp.task("compile-login", () => {
  return gulp
    .src("./library/scss/modules/login.scss")
    .pipe(plumber())
    .pipe(
      sass({
        outputStyle: "compressed"
      }).on("error", sass.logError)
    )
    .pipe(
      postcss([
        autoprefixer({
          browsers: ["last 2 versions"],
          cascade: false
        })
      ])
    )
    .pipe(gulp.dest("./library/css"));
});

gulp.task("default", ["watch-scss"]);
