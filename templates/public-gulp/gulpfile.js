const { src, dest, parallel, series, watch } = require("gulp");

const del = require("del");
const browserSync = require("browser-sync");

const loadPlugins = require("gulp-load-plugins");

const plugins = loadPlugins();
const bs = browserSync.create();

const data = {
  menus: [
    {
      name: "Home",
      icon: "aperture",
      link: "index.html",
    },
    {
      name: "Features",
      link: "features.html",
    },
    {
      name: "About",
      link: "about.html",
    },
    {
      name: "Contact",
      link: "#",
      children: [
        {
          name: "Twitter",
          link: "https://twitter.com/w_zce",
        },
        {
          name: "About",
          link: "https://weibo.com/zceme",
        },
        {
          name: "divider",
        },
        {
          name: "About",
          link: "https://github.com/zce",
        },
      ],
    },
  ],
  pkg: require("./package.json"),
  date: new Date(),
};

// 清除任务
const clean = () => {
  return del(["dist", "temp"]);
};

// 样式文件处理任务
const style = () => {
  return src("src/assets/styles/*.scss", { base: "src" }) // 以src 为基准路径
    .pipe(plugins.sass({ outputStyle: "expanded" }))
    .pipe(dest("temp"))
    .pipe(bs.reload({ stream: true })); // 以流的形式往浏览器推送
};

// 脚本文件处理任务
const script = () => {
  return src("src/assets/scripts/*.js", { base: "src" })
    .pipe(plugins.babel({ presets: ["@babel/preset-env"] }))
    .pipe(dest("temp"))
    .pipe(bs.reload({ stream: true }));
};

// html文件处理
const page = () => {
  return src("src/*.html", { base: "src" })
    .pipe(plugins.swig({ data, defaults: { cache: false } })) // 防止模板缓存导致页面不能及时更新
    .pipe(dest("temp"))
    .pipe(bs.reload({ stream: true }));
};
/**
 * image font extra 在build时构建，开发时不需要
 */
// 图片文件处理
const image = () => {
  return src("src/assets/images/**", { base: "src" })
    .pipe(plugins.imagemin())
    .pipe(dest("dist"));
};
// font文件夹中图片处理
const font = () => {
  return src("src/assets/fonts/**", { base: "src" })
    .pipe(plugins.imagemin())
    .pipe(dest("dist"));
};
// 额外任务处理
const extra = () => {
  return src("public/**", { base: "public" }).pipe(dest("dist"));
};
// 自运行文件夹
const serve = () => {
  // watch 监视文件变化， (监视路径, 回调)
  watch("src/assets/styles/**/*.scss", style);
  watch("src/assets/scripts/**/*.js", script);
  watch("src/**/*.html", page);

  // 像下面这种静态资源文件改变时不用去构建，只需要重新加载页面就好了 --- 节省性能

  // watch('src/assets/images/**', image)
  // watch('src/assets/fonts/**', font)
  // watch('public/**', extra)
  watch(
    ["src/assets/images/**", "src/assets/fonts/**", "public/**"],
    bs.reload
  );

  bs.init({ 
    notify: false,
    port: 2080,
    open: true,
    // files: 'dist/**',
    server: {
      // baseDir 会去查找目录，开发时应该依赖src
      baseDir: ["temp", "src", "public"],
      // 在开发时提供对应的文件夹，localhost:2080/node_modules 就可以被访问
      routes: {
        "/node_modules": "node_modules",
      },
    },
  });
};

// 合并文件处理，压缩为最小
const useref = () => {
  return (
    src("temp/*.html", { base: "temp" }) // 开发目录temp
      .pipe(plugins.useref({ searchPath: ["temp", "."] }))
      // html js css 压缩
      .pipe(plugins.if(/\.js$/, plugins.uglify()))
      .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
      .pipe(
        plugins.if(
          /\.html$/,
          plugins.htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
          })
        )
      )
      .pipe(dest("dist")) // 最终上线目录
  );
};

const compile = parallel(style, script, page);

// 上线之前执行的任务
const build = series(
  clean,
  parallel(series(compile, useref), image, font, extra)
);
// 开发时执行
const develop = series(compile, serve);

module.exports = {
  clean,
  build,
  develop,
};
