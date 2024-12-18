import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database';

class UserCache extends Model {}

UserCache.init(
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    rol: {
      type: DataTypes.STRING,
    },
    actualizado_en: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize,
    tableName: 'usuarios_cache',
    timestamps: false,
  }
);

export const saveUserToLocalTable = async (user: { id_usuario: number; nombre: string; email: string; rol: string }) => {
  await UserCache.upsert(user); // Inserta o actualiza los datos del usuario
};

export const findUserById = async (id_usuario: number): Promise<boolean> => {
  const user = await UserCache.findByPk(id_usuario);
  return !!user; // Devuelve true si el usuario existe
};

export default UserCache;
