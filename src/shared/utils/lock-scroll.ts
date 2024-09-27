function preventScroll(event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
}

// Функция для блокировки скролла
function lockScroll() {
  window.addEventListener("scroll", preventScroll, { passive: false });
  window.addEventListener("wheel", preventScroll, { passive: false });
  window.addEventListener("touchmove", preventScroll, { passive: false });
  window.addEventListener("keydown", preventScrollForKeys, { passive: false });
  document.body.style.overflow = "hidden";
}

// Функция для разблокировки скролла
function unlockScroll() {
  window.removeEventListener("scroll", preventScroll);
  window.removeEventListener("wheel", preventScroll);
  window.removeEventListener("touchmove", preventScroll);
  window.removeEventListener("keydown", preventScrollForKeys);
  document.body.style.removeProperty("overflow");
}

// Дополнительная функция для предотвращения прокрутки с помощью клавиш
function preventScrollForKeys(event) {
  // Коды клавиш для стрелок вверх/вниз, пробела, home, end
  const keys = [32, 37, 38, 39, 40, 9];

  if (keys.includes(event.keyCode)) {
    preventScroll(event);
  }
}

export { unlockScroll, lockScroll };
