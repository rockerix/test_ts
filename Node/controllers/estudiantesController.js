const db = require('../database/conexion.js')

class EstudiantesController{
    constructor(){

    }

    consultar(req,res){
        try{
            db.query(`select * from vimaq.finbreak ;`,(err,rs)=>{
                if(err){
                    res.status(400).send(err.message);
                }else{
                    res.status(200).json(rs.rows);
                }
                
            });
        }catch(err){
            res.status(400).send(err.message);
        }
    }
    ingresar(req,res){
        const {id} = req.body;
        try{
            db.query(`select * from vimaq.finbreak where id = $1 ;`,[id],(err,rs)=>{
                if(err){
                    res.status(400).send(err.message);
                }else{
                    res.status(200).json(rs.rows);
                }
                
            });
        }catch(err){
            res.status(400).send(err.message);
        }


    }
    actualizar(req,res){
        res.json({msg:'ingreso estudiantes'})
    }
    borrar(req,res){
        res.json({msg:'ingreso estudiantes'})
    }



}

module.exports = new EstudiantesController();