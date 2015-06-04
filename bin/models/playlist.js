
'use strict'

var db = require('../models')

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Playlist', {
		name: DataTypes.STRING,
		description: DataTypes.STRING,
		active: DataTypes.BOOLEAN
	})
}