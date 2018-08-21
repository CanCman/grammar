var gulp = require("gulp"),
		sass = require("gulp-sass"),
		browserSync = require('browser-sync'),
		notify = require("gulp-notify");

gulp.task("sass", function () {
	return gulp.src("app/sass/**/*.sass")
		.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
		.pipe(gulp.dest("app/css"))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task("watch", ['browser-sync', 'sass'], function() {
	gulp.watch("app/sass/**/*.sass", ['sass']);
	gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});