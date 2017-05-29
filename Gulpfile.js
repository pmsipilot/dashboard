//dependencies
const gulp = require('gulp');
const sass = require('gulp-sass');
const notify = require("gulp-notify");
const concat = require('gulp-concat');
const scsslint = require('gulp-scss-lint');
const eslint = require('gulp-eslint');
const gutil = require('gulp-util');

const path = {
    'sass' : {
        'watch': 'src/scss/**/*.scss',
        'src': 'src/scss/app.scss',
        'dest': 'dist/css/',
        'name': 'app.css',
        'cs': [
            'src/scss/app.scss',
            'src/scss/_variables.scss',
            'src/scss/components/*.scss',
            'src/scss/layout/*.scss'
        ]
    },
    'jsx' : {
        'cs' : [
            'src/js/components/*.jsx',
            'src/js/helper/*.jsx',
            'src/js/layout/*.jsx',
            'src/js/serializer/*.jsx'
        ]
    }
};

gulp.task('lint_scss', function() {
    return gulp.src(path.sass.cs)
        .pipe(scsslint({
            //'customReport': myCustomReporter,
            'config': 'eslint.yml'
        }));
});


gulp.task('lint_js', () => {
    return gulp.src(path.jsx.cs)
        .pipe(eslint({
            "parserOptions": {
                "ecmaVersion": 7,
                "sourceType": "module",
                "ecmaFeatures": {
                    "jsx": true,
                }
            },
            "plugins": [
                "react",
                "react-native"
            ],
            "extends": ["eslint:recommended", "plugin:react/recommended"],
            "settings": {
                "react": {
                    "pragma": "React",
                    "version": "0.14.8"
                }
            }
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// task
gulp.task('sass', ['lint_scss'], function() {
    gulp.src(path.sass.src)
        .pipe(sass({
            outputStyle: 'compressed',
            onError: function (err) {
                console.log(err);
                notify().write({
                    title: 'Gulp: Error SASS',
                    message: sass.logError
                });
            }
        }).on('error', sass.logError))
        .pipe(concat(path.sass.name))
        .pipe(gulp.dest(path.sass.dest))
        .pipe(notify("sass ok"));
});

gulp.task('watch_sass',function() {
    gulp.watch(path.sass.watch,['sass']);
});

gulp.task('watch_js',function() {
    gulp.watch(path.jsx.cs,['lint_js']);
});

gulp.task('cs', [
    'lint_js',
    'lint_scss'
]);

gulp.task('build', [
    'sass'
]);

gulp.task('default', [
    'sass',
    'watch_sass',
    'watch_js'
]);

