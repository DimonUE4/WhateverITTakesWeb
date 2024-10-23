// Set the release date (example: December 31, 2024)
const releaseDate = new Date("Dec 31, 2024 00:00:00").getTime();


// Update the countdown every second
setInterval(function() {
    const now = new Date().getTime();
    const distance = releaseDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

    if (distance < 0) {
        clearInterval(interval);
        document.getElementById("timer").innerHTML = "EXPIRED";
    }
}, 1000);

document.querySelector('.getgame').addEventListener('click', function() {
    console.log("Кнопка нажата");

    const targetElement = document.querySelector('.main7');
    
    // Прокрутка к элементу на всю страницу, используя offsetTop
    window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
    });
});



// Функция для изменения текста
function changeText(element) {
    const originalText = element.getAttribute('data-text');
    const hoverText = element.getAttribute('data-hover-text');
    
    // Меняем текст на новый при наведении
    element.innerHTML = hoverText;
    
    // При уходе мыши восстанавливаем текст с <br> из data-text
    element.onmouseleave = function() {
        // Восстанавливаем текст с <br> теги
        element.innerHTML = originalText;
    };
}

// Получаем все части лица
const leftPart = document.querySelector('.left-part');
const rightPart = document.querySelector('.right-part');
const container = document.querySelector('.face-container');

// Функция при наведении на левую часть
leftPart.addEventListener('mouseenter', () => {
    leftPart.style.width = '100%';  // Левая часть заполняет блок
    rightPart.style.width = '0%';  // Правая часть скрывается
});

// Функция при наведении на правую часть
rightPart.addEventListener('mouseenter', () => {
    rightPart.style.width = '100%';  // Правая часть заполняет блок
    leftPart.style.width = '0%';  // Левая часть скрывается
});

// Функция при убирании мыши
container.addEventListener('mouseleave', () => {
    leftPart.style.width = '50%';  // Восстанавливаем исходный размер левой части
    rightPart.style.width = '50%';  // Восстанавливаем исходный размер правой части
});



document.querySelector('.left-part').addEventListener('mouseenter', function() {
    document.querySelector('.right-part').style.flex = '0.5';
    document.querySelector('.left-part').style.flex = '1';
});

document.querySelector('.right-part').addEventListener('mouseenter', function() {
    document.querySelector('.left-part').style.flex = '0.5';
    document.querySelector('.right-part').style.flex = '1';
});

document.querySelector('.left-part').addEventListener('mouseleave', function() {
    document.querySelector('.right-part').style.flex = '1';
    document.querySelector('.left-part').style.flex = '1';
});

document.querySelector('.right-part').addEventListener('mouseleave', function() {
    document.querySelector('.left-part').style.flex = '1';
    document.querySelector('.right-part').style.flex = '1';
});


const points = document.querySelectorAll('.point');
    const popup = document.getElementById('popup');
    const closePopupBtn = document.getElementById('close-popup');

    // Функция для открытия всплывающего окна
    function openPopup(event) {
        const title = event.target.dataset.title;
        const image = event.target.dataset.image;
        const description = event.target.dataset.description;

        document.getElementById('popup-title').innerText = title;
        document.getElementById('popup-image').src = image;
        document.getElementById('popup-description').innerText = description;

        popup.style.display = 'block';
    }

    // Функция для закрытия всплывающего окна
    closePopupBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Назначаем обработчик на каждую точку
    points.forEach(point => {
        point.addEventListener('click', openPopup);
    });

// Получаем все элементы lore-item
const loreItems = document.querySelectorAll('.lore-item');

// Функция для показа дополнительного контента
function showContent(e) {
    const id = e.id;
    const expandedContent = document.getElementById(`${id}-expanded`);

    // Плавно показываем блок с дополнительной информацией
    expandedContent.style.opacity = '1';
    expandedContent.style.transform = 'translateY(0)';
}

// Функция для скрытия дополнительного контента
function hideContent(e) {
    const id = e.id;
    const expandedContent = document.getElementById(`${id}-expanded`);

    // Плавно скрываем блок с дополнительной информацией
    expandedContent.style.opacity = '0';
    expandedContent.style.transform = 'translateY(20px)';
}

// Добавляем обработчики событий для наведения и убирания мыши
loreItems.forEach(item => {
    item.addEventListener('mouseenter', () => showContent(item));
    item.addEventListener('mouseleave', () => hideContent(item));
});

// Track mouse position and update the pointer position
const mapContainer = document.querySelector('.world-map');
const pointerContainer = document.querySelector('.pointer-container');
const pointer = document.querySelector('.pointer');

mapContainer.addEventListener('mousemove', (e) => {
    const mapRect = mapContainer.getBoundingClientRect();
    const mouseX = e.clientX - mapRect.left;
    const mouseY = e.clientY - mapRect.top;

    // Set the position of the pointer to the mouse position
    pointerContainer.style.left = `${mouseX}px`; // Center pointer horizontally
    pointerContainer.style.top = `${mouseY}px`;  // Center pointer vertically
});

// Optionally, you can implement additional functionality, such as automatically scrolling to a specific section
document.querySelector('.dynamic-content').addEventListener('click', function() {
    document.querySelector('.dynamic-content').scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add event listener to each character block to load the appropriate image and video
document.querySelectorAll('.character-block').forEach(block => {
    const image = block.getAttribute('data-image');
    const video = block.getAttribute('data-video');

    const videoElement = block.querySelector('.charvideo');
    const videoContainer = block.querySelector('.video-container');

    // Set the background image of the video container
    videoContainer.style.backgroundImage = `url('${image}')`;

    // Set the video source
    videoElement.src = video;

    // Play the video when hovered
    videoContainer.addEventListener('mouseenter', () => {
        videoElement.play(); // Start playing the video
    });

    // Pause the video and reset when mouse leaves
    videoContainer.addEventListener('mouseleave', () => {
        videoElement.pause(); // Stop playing the video
        videoElement.currentTime = 0; // Reset the video to the start
    });
});



const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('click', function() {
        // Закрываем все карточки
        cards.forEach(c => {
            if (c !== card) {
                c.classList.remove('expanded');
                c.querySelector('.expansion-div').style.width = '0'; // Скрываем расширение
                c.querySelector('.content').style.opacity = '0'; // Скрываем контент
            }
        });

        // Открываем текущую карточку
        card.classList.toggle('expanded');
        const expansionDiv = card.querySelector('.expansion-div');
        const content = card.querySelector('.content');

        // Если карточка открыта, расширяем её
        if (card.classList.contains('expanded')) {
            expansionDiv.style.width = '70%'; // Заполнение карточки на 70%
            content.style.opacity = '1'; // Появление контента
        } else {
            expansionDiv.style.width = '0'; // Скрыть расширение
            content.style.opacity = '0'; // Скрыть контент
        }
    });
});

document.querySelectorAll('.timeline-event').forEach(event => {
    event.addEventListener('click', () => {
        event.classList.toggle('active');
    });
});


const timelineItems = document.querySelectorAll('.timeline-item');
const infoBlock = document.querySelector('.info-block');

// Loop through each timeline item
timelineItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        // Get the unique content from the item's data attributes
        const year = item.getAttribute('data-year');
        const title = item.getAttribute('data-title');
        const description = item.getAttribute('data-description');

        // Update the content of the info-block with the unique content
        infoBlock.innerHTML = `
            <h4>${title}</h4>
            <p>Year: ${year}</p>
            <p>${description}</p>
        `;
    });
});

let currentScroll = window.scrollY;  // Текущая позиция скролла
        let targetScroll = window.scrollY;   // Целевая позиция скролла
        const scrollSpeed = 0.5;  // Увеличим скорость инерции, чтобы она была быстрее

        // Обработчик для обновления целевой позиции скролла
        window.addEventListener('scroll', () => {
            targetScroll = window.scrollY;
        });

        // Функция плавного скроллинга
        function smoothScroll() {
            currentScroll += (targetScroll - currentScroll) * scrollSpeed; 
            window.scrollTo(0, currentScroll);
            requestAnimationFrame(smoothScroll);
        }

        smoothScroll(); // Запуск плавного скроллинга

        // Плавный курсор
        const cursor = document.querySelector('.smooth-cursor');

        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.pageX - 10}px, ${e.pageY - 10}px)`;
        });


  // Smooth scrolling with mouse wheel
  document.querySelector('.timeline').addEventListener('wheel', function(e) {
    e.preventDefault();
    this.scrollBy({
        top: e.deltaY, 
        behavior: 'smooth'
    });
});

const targetDate = new Date('2029-01-01T00:00:00'); // Set target date for countdown
const timerCubes = document.querySelectorAll('.timer-cube');
const originalValues = {};
let isHovered = false; // Global variable to track hover state

// Function to save original values
timerCubes.forEach(cube => {
    originalValues[cube.id] = cube.textContent; // Save the original timer value

    const word = cube.getAttribute('data-word');
    
    cube.addEventListener('mouseenter', () => {
        cube.textContent = word; // Change to word on hover
        isHovered = true; // Set hover state to true
    });

    cube.addEventListener('mouseleave', () => {
        cube.textContent = originalValues[cube.id]; // Return to the updated timer value
        isHovered = false; // Set hover state back to false
    });
});

// Function to calculate the remaining time
function getTimeRemaining(endTime) {
    const total = Date.parse(endTime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24) % 30); // Approximate for months
    const months = Math.floor(total / (1000 * 60 * 60 * 24 * 30) % 12);
    const years = Math.floor(total / (1000 * 60 * 60 * 24 * 365));

    return {
        total,
        years: String(years).padStart(2, '0'),
        months: String(months).padStart(2, '0'),
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
    };
}

// Timer update logic
function updateTimer() {
    if (!isHovered) { // Only update when no cubes are hovered
        const timeRemaining = getTimeRemaining(targetDate);

        document.getElementById('years').textContent = timeRemaining.years;
        document.getElementById('months').textContent = timeRemaining.months;
        document.getElementById('days').textContent = timeRemaining.days;
        document.getElementById('hours').textContent = timeRemaining.hours;
        document.getElementById('minutes').textContent = timeRemaining.minutes;
        document.getElementById('seconds').textContent = timeRemaining.seconds;

        // Store the updated values so they can be restored after hover
        originalValues['years'] = timeRemaining.years;
        originalValues['months'] = timeRemaining.months;
        originalValues['days'] = timeRemaining.days;
        originalValues['hours'] = timeRemaining.hours;
        originalValues['minutes'] = timeRemaining.minutes;
        originalValues['seconds'] = timeRemaining.seconds;
    }

    // If the countdown is over, stop the timer
    if (getTimeRemaining(targetDate).total <= 0) {
        clearInterval(timerInterval);
    }
}

// Run the updateTimer function every second
const timerInterval = setInterval(updateTimer, 1000);


// Function to switch between numbers and words
timerCubes.forEach(cube => {
    const originalText = cube.textContent;
    const word = cube.getAttribute('data-word');
    
    cube.addEventListener('mouseenter', () => {
        cube.textContent = word;
    });

    cube.addEventListener('mouseleave', () => {
        cube.textContent = originalText;
    });
});


document.getElementById('enter-btn').addEventListener('click', function() {
    // Анимация исчезновения приветственной страницы
    const welcomePage = document.getElementById('welcome-page');
    welcomePage.classList.add('hidden');

    // Показываем основной контент после небольшой задержки
    setTimeout(function() {
        welcomePage.style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }, 1500); // Задержка соответствует времени анимации
});


const mains = document.querySelectorAll('.main'); // Получаем все блоки с классом "main"
let currentBlock = 0; // Индекс текущего блока
let scrollThreshold = 100; // Порог для прокрутки (чем больше, тем больше нужно прокрутить колесико)
let scrollDelta = 0; // Накопитель изменений от колесика
let isScrolling = false; // Флаг, чтобы предотвратить быстрое переключение между блоками

// Функция для плавной прокрутки к нужному блоку
function smoothScrollToBlock(index) {
    isScrolling = true;
    mains[index].scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => isScrolling = false, 1000); // Разблокируем через 1 сек
}

// Функция для смены блока
function changeBlock(direction) {
    if (isScrolling) return; // Если уже идет прокрутка, выходим

    // Рассчитываем новый индекс блока
    currentBlock += direction;

    // Ограничиваем переключение между блоками
    if (currentBlock < 0) currentBlock = 0;
    if (currentBlock >= mains.length) currentBlock = mains.length - 1;

    smoothScrollToBlock(currentBlock); // Прокручиваем к нужному блоку
    scrollDelta = 0; // Сбрасываем накопитель
}


// Обрабатываем события колесика мыши
document.addEventListener('wheel', function(event) {
    scrollDelta += event.deltaY; // Накопление изменений прокрутки

    // Если накопилось больше порогового значения, то меняем блок
    if (scrollDelta > scrollThreshold) {
        changeBlock(1); // Прокручиваем вниз
    } else if (scrollDelta < -scrollThreshold) {
        changeBlock(-1); // Прокручиваем вверх
    }
});



const line = document.querySelector('.line');
    const welcomePage = document.getElementById('welcome-page');

    // Обработка движения мыши
    welcomePage.addEventListener('mousemove', function(event) {
        const pageWidth = welcomePage.offsetWidth; // Ширина страницы
        const mouseX = event.clientX; // Позиция мыши по горизонтали

        // Рассчитываем процентное положение мыши по горизонтали
        const mousePercentage = (mouseX / pageWidth) * 100;

        // Устанавливаем ширину полосы в зависимости от положения мыши
        line.style.width = `${mousePercentage}%`;
    });

    // Обнуляем полосу при убирании мыши с элемента
    welcomePage.addEventListener('mouseleave', function() {
        line.style.width = '0';
    });

    const mongoose = require('mongoose');





// Подключение к базе данных MongoDB Atlas
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB Atlas');
});




function Register(){
   
        // Проверяем, авторизован ли пользователь
        fetch('/check-session', { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                if (data.loggedIn) {
                    // Если пользователь авторизован, перенаправляем на профиль
                    window.location.href = '/Profile';
                } else {
                    // Если не авторизован, перенаправляем на страницу регистрации
                    window.location.href = '/Register';
                }
            });
  
}
    
   // Обработчик клика на элемент с id "Register"


function openAboutUs() {
    window.location.href = 'aboutus.html';
}