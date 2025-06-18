const Supplies = require('../models/suppliesModel');

class SuppliesController {

    static async getAllSupplies(req, res) {
        try {
            const supply = await Supplies.getSupplies();
            res.json(supply);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async createSupplies(req, res){
        try {
            const supply = await Supplies.create(req.body);
            res.status(201).json(supply);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async updatesupplys(req, res){
        try {
            const supply = await Supplies.update(req.params.id, req.body);
            if (!supply) {
                return res.status(404).json({message: "Insumo no encontrado!"});
            }
            return res.json(supply);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async deleteSupplies(req, res){
        try {
            const supply = await Supplies.delete(req.params.id);
            if (!supply) {
                return res.status(404).json({message: "Insumo no encontrado!"});
            }
            return res.json({message: "Insumo eliminado!"});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

}

module.exports = SuppliesController;