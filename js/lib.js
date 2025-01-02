const wheel = document.getElementById('wheel');
const spinButton = document.getElementById('spinButton');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const submitButton = document.getElementById('submitButton');
const prizeName = document.getElementById('prizeName');

spinButton.addEventListener('click', () => {
  const randomRotation = Math.floor(Math.random() * 360) + 720; // Минимум 2 оборота
  wheel.style.transform = `rotate(${randomRotation}deg)`;

  setTimeout(() => {
    const finalRotation = randomRotation % 360;
    const segmentIndex = Math.floor((360 - finalRotation) / 90) % 4; // 90° на сегмент
    const prizes = ["Amazon Gift Card", "Nike Gift Card", "Netflix Gift Card", "Spotify Gift Card"];
    prizeName.textContent = prizes[segmentIndex];

    modal.style.display = 'flex'; // Показываем модальное окно
  }, 3000);
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

submitButton.addEventListener('click', () => {
  alert('Tus fotos han sido enviadas para revisión.');
  modal.style.display = 'none';
});