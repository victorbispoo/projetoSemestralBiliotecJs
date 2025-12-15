import express from "express";
import {
    ListarLivros,
    ObterLivros,
    PostarLivros,
    AtualizarLivros,
    DeletarLivros,
    ListarLivrosIds
} from "../controllers/livros.controllers.js";
import { upload } from "../middlewares/uploads.js";

const router = express.Router();


router.get("/", ListarLivros);
router.get("/:id", ObterLivros);
<<<<<<< HEAD
router.get("/ids", ListarLivrosIds);
router.post("/", PostarLivros);
=======
router.post("/", upload.single("capa"),PostarLivros);
>>>>>>> 30f1e1f09128e86d7a7070e55c9dee18fd4b7050
router.put("/:id", AtualizarLivros);
router.delete("/:id", DeletarLivros);

export default router;