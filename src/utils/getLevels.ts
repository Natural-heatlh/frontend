
export const getLevelName = (levelNumber: number) => {
  switch (levelNumber) {
    case 0: return 'Для начинающих';
    case 2: return 'Бизнес лидер';
    case 3: return 'Бронзовый бизнес лидер';
    case 4: return 'Серебряный бизнес лидер';
    case 5: return 'Золотой бизнес лидер';
    case 6: return 'Платиновый бизнес лидер';
    case 7: return 'Рубиновый бизнес лидер';
    case 8: return 'Самфировый бизнес лидер';
    case 9: return 'Бриллиантовый бизнес лидер';
  }
};
