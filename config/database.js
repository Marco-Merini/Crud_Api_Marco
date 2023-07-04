import { Sequelize } from "sequelize";

const db = new Sequelize('produtos', 'root', '', {
    host: 'localhost',
    password: 'hbXutdy2!',
    dialect: 'mysql'
})
export default db