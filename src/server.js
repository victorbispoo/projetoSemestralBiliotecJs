import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("API da Livraria funcionando!");
});
// app.use("/usuarios", usuarioRoutes);
// app.use("/livros", livrosRoutes);
// app.use("/avaliacoes", avaliacoesRoutes);
// app.use("/reservas", reservasRoutes);
// app.use("/favoritos", favoritosRoutes);

// ============================
//  Inicia o servidor
// ============================
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
