var Sequelize = require('sequelize');

//connect to Heroku PostGres Database
var db = new Sequelize(process.env.DATABASE_URL || DATABASE_URL, {
  dialect: 'postgres',
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true
    }
  }
});

var Project = db.define('Project', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  owner: Sequelize.STRING,
  get_repo: Sequelize.STRING,
  name: Sequelize.STRING,
  description: Sequelize.STRING
});

var Resource = db.define('Resource', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  project_id: Sequelize.INTEGER,
  user: Sequelize.STRING,
  name: Sequelize.STRING,
  link: Sequelize.STRING
});

Resource.belongsTo(Project, {foreignKey: 'project_id'});

var Deliverable = db.define('Deliverable', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  project_id: Sequelize.INTEGER,
  owner: Sequelize.STRING,
  task: Sequelize.STRING,
  status: Sequelize.STRING,
  due_date: Sequelize.STRING,
  progress: Sequelize.STRING,
  points: Sequelize.INTEGER
});

Deliverable.belongsTo(Project, {foreignKey: 'project_id'});

var UserProjects = db.define('UserProjects', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  user: Sequelize.STRING,
  project_id: Sequelize.INTEGER
});

var Message = db.define('Message', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  user: Sequelize.STRING,
  text: Sequelize.STRING,
  room: Sequelize.STRING
});

module.exports = db;
