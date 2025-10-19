import gulp from "gulp";
import fileInclude from "gulp-file-include";
import browserSync from "browser-sync";
import { deleteAsync } from "del";
import ghPages from "gulp-gh-pages"; // Додаємо плагін для GitHub Pages

const paths = {
    html: {
        src: "src/html/**/*.html",
        dest: "dist/",
    },
    css: {
        src: "src/css/**/*.css",
        dest: "dist/css/",
    },
    js: {
        src: "src/js/**/*.js",
        dest: "dist/js/",
    },
    fonts: {
        src: "src/fonts/**/*",
        dest: "dist/fonts/",
    },
    images: {
        src: "src/img/**/*.{jpg,jpeg,png,gif,svg,webp,ico,mp4,avi,mov}",
        dest: "dist/img/",
    },
};

export const clean = () => {
    return deleteAsync(['dist', '.publish']);
};

export const html = () => {
    return gulp
        .src(["src/html/*.html", "!src/html/parts/*.html"])
        .pipe(
            fileInclude({
                prefix: "@@",
                basepath: "@file",
            })
        )
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream());
};

export const css = () => {
    return gulp
        .src(paths.css.src)
        .pipe(gulp.dest(paths.css.dest))
        .pipe(browserSync.stream());
};

export const js = () => {
    return gulp
        .src(paths.js.src)
        .pipe(gulp.dest(paths.js.dest))
        .pipe(browserSync.stream());
};

export const fonts = () => {
    return gulp
        .src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
        .pipe(browserSync.stream());
};

export const images = () => {
    return gulp
        .src(paths.images.src, { encoding: false })
        .pipe(gulp.dest(paths.images.dest))
        .pipe(browserSync.stream());
};

export const extraFiles = () => {
    return gulp
        .src([
            'src/**/*',
            '!src/html/**/*',
            '!src/css/**/*',
            '!src/js/**/*',
            '!src/fonts/**/*',
            '!src/img/**/*'
        ])
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
};

// Завдання для створення CNAME файлу (якщо потрібно власний домен)
export const cname = () => {
    return gulp
        .src('CNAME')
        .pipe(gulp.dest('dist'));
};

// Завдання для деплою на GitHub Pages
export const deploy = () => {
    return gulp
        .src('./dist/**/*')
        .pipe(ghPages());
};

export const serve = () => {
    browserSync.init({
        server: {
            baseDir: "dist",
        },
        notify: false,
        open: true,
    });

    gulp.watch(paths.html.src, html);
    gulp.watch(paths.css.src, css);
    gulp.watch(paths.js.src, js);
    gulp.watch(paths.fonts.src, fonts);
    gulp.watch(paths.images.src, images);
    gulp.watch('src/**/*').on('change', browserSync.reload);
};

// Збірка проекту
export const build = gulp.series(
    clean,
    gulp.parallel(html, css, js, fonts, images, extraFiles)
);

// Збірка з CNAME (якщо потрібно)
export const buildWithCname = gulp.series(
    clean,
    gulp.parallel(html, css, js, fonts, images, extraFiles, cname)
);

// Завдання розробки
export const dev = gulp.series(build, serve);

// Завдання деплою
export const deployTask = gulp.series(build, deploy);

// Завдання за замовчуванням
export default dev;