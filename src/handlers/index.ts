import { Request, Response } from "express";
import slugify from "slugify";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateJWT } from "../config/jsonWebToken";

export const createAccount = async (req: Request , res: Response) => {
  const { email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    const error = new Error("Un usuario con ese Email ya esta registrado.");
     res.status(409).send({ error: error.message });
     return
  }

  const handle = slugify(req.body.handle, '')
  const handleExist = await User.findOne({handle});
  if(handleExist){
    const error = new Error("El Nombre de usuario No disponible.");
     res.status(409).send({ error: error.message });
     return
  }

  const user = new User(req.body);
  user.password = await hashPassword(password);
  user.handle = handle;

  await user.save();

  res.status(201).send("Registro creado correctamente!");
};

export const login = async (req: Request , res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("El usuario no existe.");
     res.status(404).send({ error: error.message });
     return
  }

  const isPasswordCorrect = await checkPassword(password,user.password);

  if(!isPasswordCorrect) {
    const error = new Error("Password Incorrecto.");
    res.status(401).send({ error: error.message });
    return
  }


   const token = generateJWT({id: user.id});

   res.status(200).send(token);
   return;
}
