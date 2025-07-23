const Ingredients = require('../models/ingredientsModel');

class IngredientsController {

    static async getAllIngredients(req, res) {
        try {
            const ingredient = await Ingredients.getIngredients();
            res.json(ingredient);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async createIngredient(req, res){
        try {
            const ingredient = await Ingredients.create(req.body);
            res.status(201).json(ingredient);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async updateIngredient(req, res){
        try {
            const ingredient = await Ingredients.update(req.params.id, req.body);
            if (!ingredient) {
                return res.status(404).json({message: "Ingrediente no encontrado!"});
            }
            return res.json(ingredient);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async deleteIngredient(req, res){
        try {
            const ingredient = await Ingredients.delete(req.params.id);
            if (!ingredient) {
                return res.status(404).json({message: "Ingrediente no encontrado!"});
            }
            return res.json({message: "Ingrediente eliminado!"});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async activateIngredient(req, res) {
        try {
            const ingredient = await Ingredients.activar(req.params.id);
            if (!ingredient) return res.status(404).json({ message: "Ingrediente no encontrado!" });
            return res.json(ingredient);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

}

module.exports = IngredientsController;