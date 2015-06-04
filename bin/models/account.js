
'use strict'

var db = require('../models')

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Account', {
		number: DataTypes.STRING,
		accessToken: DataTypes.STRING,
		tokenType: DataTypes.ENUM('bearer'),
		refreshToken: DataTypes.STRING,
		expiresAt: DataTypes.DATE,
		key: { type: DataTypes.STRING, unique: true },
		firstName: DataTypes.STRING,
		lastName: DataTypes.STRING,
		username: DataTypes.STRING,
		icon: DataTypes.STRING,
		icon250: DataTypes.STRING,
		icon500: DataTypes.STRING,
		baseIcon: DataTypes.STRING,
		libraryVersion: DataTypes.INTEGER,
		url: DataTypes.STRING,
		gender: DataTypes.ENUM('m', 'f', 'n'),
		type: DataTypes.ENUM('s'),
		isProtected: DataTypes.BOOLEAN,
		followingUrl: DataTypes.STRING,
		reviewCount: DataTypes.INTEGER,
		collectionUrl: DataTypes.STRING,
		isTrial: DataTypes.BOOLEAN,
		playlistsUrl: DataTypes.STRING,
		artistCount: DataTypes.INTEGER,
		lastSongPlayed: DataTypes.STRING,
		heavyRotationKey: DataTypes.STRING,
		collectionKey: DataTypes.STRING,
		followersUrl: DataTypes.STRING,
		networkHeavyRotation: DataTypes.STRING,
		tasteProfileKey: DataTypes.STRING,
		displayName: DataTypes.STRING,
		isUnlimited: DataTypes.BOOLEAN,
		streamRegion: DataTypes.STRING,
		trackCount: DataTypes.INTEGER,
		albumCount: DataTypes.INTEGER,
		lastSourcePlayed: DataTypes.STRING,
		lastSongPlayTime: DataTypes.STRING,
		isSubscriber: DataTypes.BOOLEAN,
		registrationDate: DataTypes.DATE
	})
}