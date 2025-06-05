const Roles = require('../models/rolesModel');

class RolesController {

    static async getAllRoles(req, res) {
        try {
            const role = await Roles.getRoles();
            res.json(role);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async createRole(req, res){
        try {
            const role = await Roles.create(req.body);
            res.status(201).json(role);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async updateRole(req, res){
        try {
            const role = await Roles.update(req.params.id, req.body);
            if (!role) {
                return res.status(404).json({message: "Rol no encontrado!"});
            }
            return res.json(role);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async deleteRole(req, res){
        try {
            const role = await Roles.delete(req.params.id);
            if (!role) {
                return res.status(404).json({message: "Rol no encontrado!"});
            }
            return res.json({message: "Rol eliminado!"});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

}

module.exports = RolesController;