const Tables = require('../models/tablesModel');

class TablesController {

    static async getAllTables(req, res) {
        try {
            const table = await Tables.getTables();
            res.json(table);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async getTableById(req, res) {
        try {
            const table = await Tables.findById(req.params.id);
            if (!table) {
                return res.status(404).json({ message: "Mesa no encontrada!" });
            }
            res.json(table);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async createTable(req, res){
        try {
            const table = await Tables.create(req.body);
            res.status(201).json(table);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async updateTable(req, res){
        try {
            const table = await Tables.update(req.params.id, req.body);
            if (!table) {
                return res.status(404).json({message: "Mesa no encontrada!"});
            }
            return res.json(table);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async deleteTable(req, res){
        try {
            const table = await Tables.delete(req.params.id);
            if (!table) {
                return res.status(404).json({message: "Mesa no encontrada!"});
            }
            return res.json({message: "Mesa eliminada!"});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

}

module.exports = TablesController;