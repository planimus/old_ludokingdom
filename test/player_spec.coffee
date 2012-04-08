Player = require '../common/player'

describe "Player", ->
	it "should have a player", (done) ->
		player = new Player("kenrick")
		done()

	it "should have a name", (done) ->
		player = new Player("kenrick")
		player.name.should.equal("kenrick")
		done()