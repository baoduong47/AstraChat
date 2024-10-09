export const playMenuSelectSound = () => {
  const audio = new Audio("/sounds/sao_menu.mp3");
  audio.play();
};

export const playButtonClickedSound = () => {
  const audio = new Audio("/sounds/ff_select.mp3");
  audio.play();
};

export const playMenuOpenSound = () => {
  const audio = new Audio("/sounds/sao_menu_select.mp3");
  audio.play();
};
