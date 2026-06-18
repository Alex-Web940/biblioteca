import Author from '../models/Author.js';

const authorController = {

    getAll: async (req, res) => {
        try {
            const authors = await Author.find();
            res.json({ success: true, data: authors });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const author = await Author.findById(req.params.id);
            if (!author) return res.status(404).json({ success: false, message: 'Autor no encontrado' });
            res.json({ success: true, data: author });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const author = await Author.create(req.body);
            res.status(201).json({ success: true, data: author });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!author) return res.status(404).json({ success: false, message: 'Autor no encontrado' });
            res.json({ success: true, data: author });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },

    remove: async (req, res) => {
        try {
            const author = await Author.findByIdAndDelete(req.params.id);
            if (!author) return res.status(404).json({ success: false, message: 'Autor no encontrado' });
            res.json({ success: true, message: 'Autor eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

export default authorController;