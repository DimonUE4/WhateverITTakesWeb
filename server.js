const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

// Middleware для парсинга данных формы
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware для сессий
app.use(session({
    secret: 'secret-key', // Секретный ключ для сессий
    resave: false,
    saveUninitialized: true
}));

// Указываем папку для статических файлов (HTML, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Роуты для статических страниц
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'author.html'));
});

app.get('/buy', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'buy.html'));
});
app.get('/payment', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'payment.html'));
});
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'aboutus.html'));
});

// Для страницы профиля - динамически показываем имя пользователя
app.get('/Profile', (req, res) => {
    if (req.session.username) {
        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Профиль пользователя</title>
            <link rel="stylesheet" href="styleprofile.css">
        </head>
        <body>
            <div class="profile-header">
                <h1 class="profile-title">Профиль пользователя</h1>
                <button class="logout-button" onclick="window.location.href='/logout'">Выйти</button>
            </div>
        
            <div class="profile-content">
                <!-- Секция информации о пользователе -->
                <div class="user-info">
                    <h2 class="section-title">Информация о пользователе</h2>
                    <div class="info-item">
                        <span class="info-label">Имя пользователя:</span>
                         Добро пожаловать, ${req.session.username}!
                    </div>
                    <div class="info-item">
                        <span class="info-label">Email:</span>
                        <span class="info-value">user@example.com</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Дата регистрации:</span>
                        <span class="info-value">1 января 2024</span>
                    </div>
                </div>
        
                <!-- Секция списка игр -->
                <div class="games-list">
                    <h2 class="section-title">Мои игры</h2>
                    <div class="card-container">
                        <!-- Карточки игр -->
                        <div class="game-card">
                            <img src="game1.jpg" alt="Игра 1" class="game-img">
                            <div class="game-info">
                                <h3 class="game-title">Игра 1</h3>
                                <p class="game-description">Краткое описание игры 1...</p>
                                <button class="game-btn">Подробнее</button>
                            </div>
                        </div>
                        <div class="game-card">
                            <img src="game2.jpg" alt="Игра 2" class="game-img">
                            <div class="game-info">
                                <h3 class="game-title">Игра 2</h3>
                                <p class="game-description">Краткое описание игры 2...</p>
                                <button class="game-btn">Подробнее</button>
                            </div>
                        </div>
                        <!-- Добавьте дополнительные карточки игр по аналогии -->
                    </div>
                </div>
        
                <!-- Секция новостей -->
                <div class="news-list">
                    <h2 class="section-title">Новости</h2>
                    <div class="card-container">
                        <!-- Карточки новостей -->
                        <div class="news-card">
                            <h3 class="news-title">Новости 1</h3>
                            <p class="news-description">Краткое описание новости 1...</p>
                            <button class="news-btn">Читать далее</button>
                        </div>
                        <div class="news-card">
                            <h3 class="news-title">Новости 2</h3>
                            <p class="news-description">Краткое описание новости 2...</p>
                            <button class="news-btn">Читать далее</button>
                        </div>
                        <!-- Добавьте дополнительные карточки новостей по аналогии -->
                    </div>
                </div>
            </div>
            <a class="tomain" href="/">На главную</a>
        </body>
        </html>
        
          
        `);
    } else {
        res.redirect('/login');
    }
});

// Функция для регистрации
app.post('/register', (req, res) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    };

    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) throw err;

        const users = data ? JSON.parse(data) : [];

        // Проверка на существующего пользователя
        const existingUser = users.find(user => user.username === newUser.username);

        if (existingUser) {
            res.send('Пользователь с таким именем уже существует!');
        } else {
            users.push(newUser);
            fs.writeFile('data.json', JSON.stringify(users, null, 2), (err) => {
                if (err) throw err;
                res.redirect('/login'); // Перенаправление на авторизацию после успешной регистрации
            });
        }
    });
});

// Функция для авторизации
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Чтение данных из файла
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) throw err;

        const users = JSON.parse(data);

        // Проверка правильности логина и пароля
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            // Сохраняем имя пользователя в сессии
            req.session.username = user.username;
            res.redirect('/Profile'); // Переход на страницу профиля
        } else {
            res.send('Неверные логин или пароль!');
        }
    });
});

// Маршрут для выхода из аккаунта
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});
app.get('/check-session', (req, res) => {
    if (req.session.username) {
        res.json({ loggedIn: true });
    } else {
        res.json({ loggedIn: false });
    }
});
app.get('/public/WhateverItTakesLauncher.zip', (req, res) => {
    const file = path.join(__dirname, 'WhateverItTakesLauncher.zip');
    res.download(file);  // Это инициирует загрузку файла
});
// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
