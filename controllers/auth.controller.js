import Auth from "../models/auth.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

// Register
export const register = async (req, res) => {
  try {
    const { username, password } = req.body
    const isUsed = await Auth.findOne({ username })
    if (isUsed) {
      return res.json({
        message: 'Данный username уже занят.',
      })
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const newUser = new Auth({
      username,
      password: hash,
    })

    const token = jwt.sign({
      id: newUser._id
    },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    )

    await newUser.save()

    res.json({
      token,
      newUser,
      message: 'Регистрация прошла успешно.',
    })

  } catch (error) {
    res.json({ message: "Ошибка при создания пользователья." })
  }
}

// Login user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Auth.findOne({ username })
    if (!user) {
      return res.json({
        message: "Такого юзера не существует."
      })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.json({
        message: "Неверный пароль."
      })
    }

    const token = jwt.sign({
      id: user._id,
    },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    )

    res.json({
      token, user, message: "Вы вошли в систему."
    })

  } catch (error) {
    res.json({ message: "Ошибка при авторизации." })
  }
}
