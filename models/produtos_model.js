import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Categorias = db.define('categorias', {
  id_categoria: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nome_categoria: {
    type: DataTypes.STRING(100)
  }
}, {
  timestamps: false,
  freezeTableName: true
});

const Produtos = db.define('produto', {
  cod_produto: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nome_produto: {
    type: DataTypes.STRING(100)
  },
  qtde_produto: {
    type: DataTypes.INTEGER
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
});

const Pedidos = db.define('pedidos', {
  num_pedido: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  qtde_pedido: {
    type: DataTypes.INTEGER
  },
  cod_produto: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
});

Produtos.hasMany(Pedidos, { foreignKey: 'cod_produto' });
Pedidos.belongsTo(Produtos, { foreignKey: 'cod_produto' });

export { Categorias, Produtos, Pedidos };
