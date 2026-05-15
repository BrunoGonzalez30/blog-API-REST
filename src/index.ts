import  express  from "express";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import authRouter from "./routes/auth.routes.js"
import {authMiddleware} from "./middlewares/auth.middleware.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/users', authMiddleware, userRoutes);
app.use('/posts', authMiddleware, postRoutes);
app.use('/auth', authRouter)
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
}); 

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});