const express = require('express')
const router = express.Router();
const db = require('../../mysql').pool;

router.get('/', (req,res, next) =>{ 

db.getConnection((error, conn)=>{
    if(error){
     return res.status(500).send({error: error});
    }

    conn.query(
        'select idTarefas, NomeTarefas, usuario from Tarefas',
        (error, result, fields) =>{
            conn.release();

            if(error){
                return res.status(500).send({error: error});
            }

            return res.status(200).send({
                response : result
            })
        }
    )
})
})

router.post('/', (req,res, next) =>{ 
  db.getConnection((error,conn)=>{

    if(error){
        return res.status(500).send({
            error: error
        })
    }
    conn.query(
       ' insert into Tarefas(NomeTarefas, usuario) values(?,?)',
        [req.body.NomeTarefas, req.body.usuario],
        (error,result,fields) =>{
            conn.release();

            if(error){
                return res.status(500).send({
                    error: error
            })
        }
        res.status(201).send({
            mensagem : 'Tarefa inserido com sucesso',
            codigo: result.codigo
        })
    }
    )
})
})

router.get('/:idTarefas', (req,res, next) =>{ 

    db.getConnection((error, conn)=>{

      const codigoParametro = req.params.idTarefas;

        if(error){
         return res.status(500).send({error: error});
        }
    
        conn.query(
            'select idTarefas, NomeTarefas, usuario from Tarefas where idTarefas = ?',
            codigoParametro,
            (error,result, fields) =>{
                if (error){
                    return res.status(500).send({error:error});
                }

                return res.status(200).send({
                    result
                })
            }
            )
    })
    })

module.exports = router;