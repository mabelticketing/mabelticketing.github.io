module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'assets/css/main.css': 'assets/scss/main.scss'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            jade: {
                tasks: ["jade:debug"],
                files: ["views/**/*.jade"]
            },
            scripts: {
                files: ['assets/scss/main.scss'],
                tasks: ['sass']
            }
        },
        jade: {
            debug: {
                options: {
                	pretty: true,
                    locals: {
                        livereload: true
                    }
                },
	            files: [{
	            	cwd: "views",
					src: "**/*.jade",
					expand: true,
					dest: ".",
					ext: ".html"
				}]
            },
            publish: {
                options: {
                    pretty: true,
                    locals: {
                        livereload: false
                    }
                },
	            files: [{
	            	cwd: "views",
					src: "**/*.jade",
					expand: true,
					dest: ".",
					ext: ".html"
				}]
            }
        },
        web: {
            options: {
                port: 4000
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('web', 'Starting web server...', function() {
        var options = this.options();
        var connect = require('connect');
        var app = connect();
        app.use(require('serve-static')(__dirname));
        app.listen(options.port);
        // connect.createServer(
        //     connect.static(__dirname)
        // ).listen(options.port);
        console.log('http://localhost:%s', options.port);

        grunt.task.run(["watch"]);
    });

    grunt.registerTask('default', ['sass', 'jade:debug', 'web']);
    grunt.registerTask('publish', ['jade:publish']);
    //grunt.registerTask('default', ['watch']);
}