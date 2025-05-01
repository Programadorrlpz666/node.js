import connection from "../config/database.js";

const usuariosController = {
    async criar(req, res){
        try {
            const{nome, email, idade} = req.body;
            const [result] = await connection.execute(
                'INSERT INTO usuarios (nome, email, idade) VALUES (?, ?, ?)',
                [nome,email,idade]
            );

            return res.status(201).json({
                sucess:true,
                message:'Usuário registrado com sucesso!',
                data: {nome, email, idade}
            });

        } catch (error) {
            console.log('Erro ao inserir usuário',error)
            return res.status(500).json({
                sucess: false,
                message: 'Erro ao inserir usuário',
                error: error.message
            })
        }
    },
    
    async ListarUsuarios(req, res) {
        try {

        } catch (error) {

        }
    },

    async BuscarPorId(req, res){
        try {
            const { id } = req.params;
            const [usuario] = await connection.execute(
                'SELECT * FROM usuarios WHERE id = ?',
                [id]
            )

            if (usuario.length === 0){
                return res.status(404).json({
                    sucess: false,
                    message: "Usuário não encontrado"
                })
            }

            return res.status(201).json({
                sucess: true,
                data: usuario[0]
            })
        } catch (error) {
            console.error("Erro ao buscar usuário", error)
            return res.status(500).json({
                sucess: false,
                message: "Erro ao buscar usuário",
                error: error.message
            })

        }
    },
    async alterarDados(req, res){
        try {
            const {id} = req.params;
            const {nome, email, idade} = req.body;

            const camposAtualizar = []
            const valores = []

            if(nome){
                camposAtualizar.push('nome = ?'),
                valores.push(nome)
            }

            if(email){
                camposAtualizar.push('email = ?'),
                valores.push(email)
            }

            if(idade){
                camposAtualizar.push('idade = ?'),
                valores.push(idade)
            }

            valores.push(id)

            const [result] = await connection.execute(
                `UPDATE usuarios SET ${camposAtualizar.join(', ')} WHERE id = ?` ,
                valores

            );

            if(result.affectedRows === 0) {
                return res.status(404).json({
                    sucess: false,
                    message: "Usuário não encontrado"
                })
            }

            return res.status(200).json({
                sucess: true,
                message: `Usuário ${id} atualizado com sucesso` ,
                registrosAfetados: result.affectedRows
            })

        } catch (error) {
            console.error("Erro ao alterar usuario", error)
            return res.status(500).json({
                sucess: false,
                message: "Erro ao alterar usuário",
                error: error.message
            })
        }
    }
}

export default usuariosController;