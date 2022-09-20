import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
var jwt = require('jsonwebtoken');
import config from "../../../config";

const prisma = new PrismaClient();


export const findAll = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({
      ok: true,
      data: users,
    });
  } catch (error) {
    res.json({
      ok: false,
      data: error.message,
    });
  }
};


// Login
export const login = async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password

    // userFound = await prisma.user.findUnique()
    const passwordHash = await bcrypt.hash(password, 8)

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if(!user){
      res.json({
        message: "Usuario no registrado"
      })
    }

    const checkPassword = bcrypt.compareSync(password, passwordHash)

    if (!checkPassword) return res.status(401).json({token: null, message: 'Contraseña Incorrecta'})

    const token = jwt.sign({id: user.id}, config.SECRET, {
      expiresIn: 86400
    })
    res.json({token})

  } catch (error) {
    console.log(error)
  }
}

//Registrar usuario
export const create = async (req, res) => {
  try {

    const email = req.body.email
    const password = req.body.password
    const name = req.body.name
    const phone_number = req.body.phone_number

    // const password = await bcrypt.hash(passwordHash, 8)
    // const { body } = req;
    const user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password),
        name,
        phone_number,
      },
    });

    const token = jwt.sign({id: user.id}, config.SECRET, {
      expiresIn: 86400 //un día para expirar
    })

    res.status(200).json({token})
    
  } catch (error) {
    res.json({
      ok: false,
      data: error.message,
    });
  }
};

// prueba de verify
export const prueba = async (req, res) => {
  try {
    res.json({
      message: "funciona el token"
    })
  } catch (error) {
    res.json({
      message: "no funciona"
    })
  }
}
