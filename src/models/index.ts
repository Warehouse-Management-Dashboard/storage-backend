'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
import configFile from '../config/config';
const config = (configFile as any)[env];
const db: any = {};

let sequelize: any;
if (config.use_env_variable) {
	console.log(config.use_env_variable);
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	console.log(config);
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
}

fs.readdirSync(__dirname)
	.filter((file: string) => {
		return (
			file.indexOf('.') !== 0 &&
			file !== basename &&
			['.js', '.ts'].includes(file.slice(-3))
		);
	})
	.forEach((file: any) => {
		console.log('model', file);
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model;
	});

Object.keys(db).forEach(modelName => {
	console.log('modelName', modelName);
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
	if (db[modelName].hook) {
		db[modelName].hook(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;