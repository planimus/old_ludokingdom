{exec, spawn} 	= 	require	'child_process'
fs				=	require	'fs'
watch			=	require	'nodewatch'
crypto 			= 	require	'crypto'
paths			=	require	'path'
appWatcher 		= 	watch

nodeInstance 	=	false

projectDir 		=	"#{__dirname}"
assets 			=	"#{ projectDir }/assets"
configFile 		=	"#{ projectDir }/config.json"

jsDir			=	"#{ projectDir }/public/javascripts"
coffeeFiles		=	"#{ projectDir }/assets/coffee"

lessFiles 		=	"#{ projectDir }/assets/less"
lessIncPaths	=	["base/"]
cssDir 			=	"#{ projectDir }/public/stylesheets"

config 			= require configFile

generateHash = ->
	now = new Date().getTime().toString()
	crypto.createHash('md5').update(now).digest "hex"


updateConfigFile = (json) ->
	config.css 		= json.css if json.css
	config.js		= json.js if json.js
	
	console.log "-- --- --- updating config file"
	fs.writeFile configFile, JSON.stringify(config, null, 4), (err) ->
		if(err)
			console.log err
		else
			console.log("config file updated")

restartServerOrCreate = ->
	if nodeInstance is false
		console.log "starting app server"
		nodeInstance = spawn("node", ["#{projectDir}/app.js"])
		bindEvents nodeInstance
	else 
		restartServer()

restartServer = ->
	if nodeInstance isnt false
		console.log "restarting app server" 
		nodeInstance.kill()
		console.log "-- stoped app server"
		nodeInstance = spawn("node", ["#{projectDir}/app.js"])
		console.log "-- -- started app server"
		nodeInstance = bindEvents nodeInstance


bindEvents = (node) ->
	node.stdout.on 'data', (data) ->
		console.log "--node --out : #{data}"

	node.stderr.on 'data', (data) ->
		console.log "--node --err : #{data}" 

	node.on 'exit', (code) ->
		if (code isnt 0) 
			console.log "--node --exited : #{code}"

	console.log "binding events"
	return node
	

task 'compile:coffee', 'Compliles the coffee source code into javascript', (callback) ->
	console.log "compiling coffee"
	hash = generateHash()
	exec "coffee --join #{jsDir}/application.#{hash}.js --compile #{coffeeFiles}/", (err, stdout, stderr) ->
		if err
			console.log stderr 
			#throw err
		
		console.log "-- deleting old js file"
		paths.exists "#{jsDir}/application.#{config.js}.js",  (exists) ->
			if(exists)
				fs.unlink "#{jsDir}/application.#{config.js}.js", (err) ->
					if(err)
						console.log err
					else	
						console.log '-- -- old js file deleted'
			else
				console.log "-- -- could not find application.#{config.js}.js"

			updateConfigFile {"js" : hash}
			restartServer() if nodeInstance
			console.log "#{stdout}  #{stderr}"
			console.log("compilation coffee completed")
	
task 'compile:less', 'Compliles the less source into css', (callback) ->
	console.log "Compiling Less"
	include_paths = ""
	for path in lessIncPaths
		include_paths += "#{lessFiles}/libs/#{path}:"
	include_paths = include_paths[0..include_paths.length - 2]
	csshash = generateHash()
	exec "lessc --yui-compress --include-path=#{include_paths}  #{lessFiles}/application.less #{cssDir}/application.#{csshash}.css", (err, stdout, stderr) ->
		if err
			console.log "#{stdout}  #{stderr}"
			#throw err
		
		console.log "-- deleting old css file"
		paths.exists "#{cssDir}/application.#{config.css}.css",  (exists) ->
			if(exists)
				fs.unlink "#{cssDir}/application.#{config.css}.css", (err) ->
					if(err)
						console.log err
					else	
						console.log '-- -- old css file deleted'
			else
				console.log "-- -- could not find application.#{config.css}.css"
			
			updateConfigFile {"css" : csshash}
			restartServer()	if nodeInstance
			console.log "#{stdout}  #{stderr}"
			console.log "Compilation Less Completed"
			

task 'watch:less', 'Watches the less files and compiles them if they change', (callback) ->
	watch.add "#{lessFiles}"
	watch.onChange (file , prev, curr, action) ->
		console.log("LESS: #{file} (#{action}) ")
		invoke 'compile:less'
		
task 'watch:coffee', 'Watches the coffee files and compiles them if they change', (callback) ->
	watch.add "#{coffeeFiles}"
	watch.onChange (file , prev, curr, action) ->
		console.log("COFFEE: #{file} (#{action}) ")
		invoke 'compile:coffee'
		
task 'watch:assets', 'Watches all the assets and compiles them if they change', (callback) ->
		watch.add "#{assets}", true
		watch.onChange (file , prev, curr, action) ->
			is_less = /\.less/.test(file)
			is_coffee = /\.coffee/.test(file)
			
			console.log("#{file} (#{action})")
			
			invoke 'compile:less' if is_less
			invoke 'compile:coffee' if is_coffee 

task 'watch:build', 'Watches the app.js for changes and starts it if down', ->
	restartServerOrCreate()
	appWatcher.add "#{projectDir}/app.js"
	appWatcher.onChange (file , prev, curr, action) ->
		console.log("app.js changed")
		restartServerOrCreate()

task 'watch:build:all', 'Watches all files and complies and restart server if change', ->
	invoke 'watch:assets'
	invoke 'watch:build'			
			
			
			