const Status = require('../models/statusModel');

class StatusController {

    static async getAllStatus(req, res) {
        try {
            const status = await Status.getStatus();
            res.json(status);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async createStatus(req, res){
        try {
            const status = await Status.create(req.body);
            res.status(201).json(status);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async updateStatus(req, res){
        try {
            const status = await Status.update(req.params.id, req.body);
            if (!status) {
                return res.status(404).json({message: "Estado no encontrado!"});
            }
            return res.json(status);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async deleteStatus(req, res){
        try {
            const status = await Status.delete(req.params.id);
            if (!status) {
                return res.status(404).json({message: "Estado no encontrado!"});
            }
            return res.json({message: "Estado eliminado!"});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

}

module.exports = StatusController;