const prizes = [
  { text: "Скидка 10%", color: "hsl(197 30% 43%)" },
  { text: "Дизайн в подарок", color: "hsl(173 58% 39%)" },
  { text: "Второй сайт бесплатно", color: "hsl(43 74% 66%)" },
  { text: "Мать сдохла", color: "hsl(173 58% 39%)" }
];

const spinButton = document.querySelector('.btn-spin');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const photoForm = document.getElementById('photoForm');
const fileInput = document.getElementById('fileInput');
const imageBlocks = document.getElementById('imageBlocks');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const prizeName = document.getElementById('prizeName');

let rotation = 0;
let currentSlice = 0;
let prizeNodes;
let currentImageIndex = 0; // Индекс текущего изображения для загрузки

// Обработчик для кнопки "Загрузить Фото"
const uploadButton = document.querySelector('.upload-button');
uploadButton.addEventListener('click', () => {
  fileInput.click(); // Программно вызывает диалог выбора файла
});

// Обработчик выбора файла
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0]; // Получаем первый выбранный файл
  if (file && currentImageIndex < 3) { // Проверяем, что загружаем не больше 3 изображений
    const reader = new FileReader();
    
    // Когда файл прочитан
    reader.onload = function(e) {
      const imageUrl = e.target.result;

      // Вставляем изображение в нужное место в зависимости от индекса
      if (currentImageIndex === 0) {
        image1.src = imageUrl;
      } else if (currentImageIndex === 1) {
        image2.src = imageUrl;
      } else if (currentImageIndex === 2) {
        image3.src = imageUrl;
      }

      // Показываем блок с изображениями
      imageBlocks.style.display = 'block';

      // Увеличиваем индекс для следующего изображения
      currentImageIndex++;

      // Если все три изображения загружены, можно показать кнопку для отправки формы
      if (currentImageIndex === 3) {
        photoForm.querySelector('button[type="submit"]').disabled = false;
      }
    };

    // Читаем файл как Data URL (для отображения изображения)
    reader.readAsDataURL(file);
  } else {
    alert("Вы можете загрузить только 3 изображения!");
  }
});

const createPrizeNodes = () => {
  prizes.forEach(({ text, color }, i) => {
    const rotation = ((360 / prizes.length * i) * -1) - 180 / prizes.length;
    document.querySelector('.spinner').insertAdjacentHTML(
      "beforeend",
      `<li class="prize" style="--rotate: ${rotation}deg"><span class="text">${text}</span></li>`
    );
  });
};

const createConicGradient = () => {
  document.querySelector('.spinner').setAttribute(
    "style",
    `background: conic-gradient(from -90deg, ${prizes
      .map(({ color }, i) => `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`)
      .reverse()
    });`
  );
};

const setupWheel = () => {
  createConicGradient();
  createPrizeNodes();
  prizeNodes = document.querySelectorAll('.prize');
};

const selectPrize = () => {
  const selected = Math.floor(rotation / (360 / prizes.length));
  prizeNodes[selected].classList.add('selected');
  prizeName.textContent = `Приз: ${prizes[selected].text}`; // Устанавливаем название приза
};

spinButton.addEventListener("click", () => {
  spinButton.disabled = true;
  rotation = Math.floor(Math.random() * 360 + Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000);
  prizeNodes.forEach(prize => prize.classList.remove('selected'));
  document.querySelector('.deal-wheel').classList.add('is-spinning');
  document.querySelector('.spinner').style.setProperty("--rotate", rotation);
  document.querySelector('.ticker').style.animation = "none";
});

document.querySelector('.spinner').addEventListener('transitionend', () => {
  rotation %= 360;
  selectPrize();
  document.querySelector('.deal-wheel').classList.remove('is-spinning');
  document.querySelector('.spinner').style.setProperty("--rotate", rotation);
  spinButton.disabled = false;

  // Показываем всплывающее окно только после окончания вращения
  setTimeout(() => {
    popup.style.display = 'flex'; // Показываем всплывающее окно
  }, 500); // Убедитесь, что задержка есть, чтобы окно не показывалось сразу
});

closePopup.addEventListener('click', () => {
  popup.style.display = 'none';
});

setupWheel();
