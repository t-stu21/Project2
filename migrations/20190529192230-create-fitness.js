'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Fitnesses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            cal_goals: {
                type: Sequelize.INTEGER
            },
            cal_autoburnt: {
                type: Sequelize.INTEGER
            },
            cal_manburnt: {
                type: Sequelize.INTEGER
            },
            cal_intake: {
                type: Sequelize.INTEGER
            },
            user_height: {
                type: Sequelize.INTEGER
            },
            user_weight: {
                type: Sequelize.INTEGER
            },
            user_age: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Fitnesses');
    }
};
