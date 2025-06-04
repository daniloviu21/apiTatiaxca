const Categories = require('../models/categoriesModel');

class CategoriesController {

    static async getAllCategories(req, res) {
        try {
            const categorie = await Categories.getCategories();
            res.json(categorie);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async createCategorie(req, res){
        try {
            const categorie = await Categories.create(req.body);
            res.status(201).json(categorie);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async updateCategorie(req, res){
        try {
            const categorie = await Categories.update(req.params.id, req.body);
            if (!categorie) {
                return res.status(404).json({message: "Categoria no encontrada!"});
            }
            return res.json(categorie);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async deleteCategorie(req, res){
        try {
            const categorie = await Categories.delete(req.params.id);
            if (!categorie) {
                return res.status(404).json({message: "Categoria no encontrada!"});
            }
            return res.json({message: "Categoria eliminada!"});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

}

module.exports = CategoriesController;