import { ClubUser } from '../controller/clubUsers/clubUsers';
import { sequelize } from '../db/sequelize';

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
ClubUser.getAllClubUserbyClubid({ clubid: 15 });
