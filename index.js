    import 'dotenv/config';
    import express from 'express';
    import connectDB from './src/config/db.js';

    import authRoutes    from './src/routes/auth.js';
    import authorRoutes  from './src/routes/authors.js';
    import bookRoutes    from './src/routes/books.js';
    import readerRoutes  from './src/routes/readers.js';
    import loanRoutes    from './src/routes/loans.js';

    const app = express();
    const PORT = process.env.PORT || 3000;

    // Conectar a MongoDB
    connectDB();

    // Middleware para parsear JSON
    app.use(express.json());

    // Rutas
    app.use('/api/auth',    authRoutes);
    app.use('/api/authors', authorRoutes);
    app.use('/api/books',   bookRoutes);
    app.use('/api/readers', readerRoutes);
    app.use('/api/loans',   loanRoutes);

    app.listen(PORT, () => {
        console.log(`Servidor corriendo en puerto ${PORT}`);
    });