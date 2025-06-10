const Users =  require('../models/usersModel');

class UsersController {

    static async getAllUsers(req, res) {
        try {
            const user =  await Users.getUsers();
            res.json(user);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async getUserById(req, res){
        try {
            const user = await Users.findById(req.params.id);
            if (!user) {
                return res.status(404).json({message: "Usuario no encontrado!"});
            }
            return res.json(user);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async createUser(req, res){
        try {
            const user = await Users.create(req.body);
            res.status(201).json(user);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async updateUser(req, res){
        try {
            const user = await Users.update(req.params.id, req.body);
            if (!user) {
                return res.status(404).json({message: "Usuario no encontrado!"});
            }
            return res.json(user);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async deleteUser(req, res){
        try {
            const user = await Users.delete(req.params.id);
            if (!user) {
                return res.status(404).json({message: "Usuario no encontrado!"});
            }
            return res.json({message: "Usuario eliminado!"});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async login(req, res) {
        try {

            const { correo, password } = req.body;
            if (!correo || !password) {
                return res.status(400).json({ error: 'Correo y Contraseña son obligatorios' });
            }

            const user = await Users.findByCredentials(correo,password);
            if (!user) {
                return res.status(401).json({ error: 'Credenciales incorrectas' });
            }

            const token = await Users.generateAuthToken(user);

            delete user.password;

            res.status(200).json({
                message: 'Inicio de sesión exitoso!',
                user,
                token
            });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

}

module.exports = UsersController;