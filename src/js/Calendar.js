import { DateTime } from 'luxon';

export default class Calendar {
  constructor(container) {
    this.container = container;
    this.forthField = null;
    this.backField = null;
  }

  init() {
    this.direction = this.container.querySelector('#direction');
    this.forthField = this.container.querySelector('#input-forth');
    this.backField = this.container.querySelector('#input-back');

    this.setMinDate();
    this.registerEvents();
  }

  registerEvents() {
    this.forthField.addEventListener('change', this.forthHandler.bind(this));
    this.direction.addEventListener('change', this.directionHandler.bind(this));
  }

  /**
   * Обработка событий на поле Туда
   * @param {*} event - event
   */
  forthHandler(event) {
    const selectedDate = DateTime.fromISO(event.target.value);
    const backDateValue = this.backField.value;
    // Если дата Туда больше установленной даты Обратно сбрасываем дату Обратно
    if (backDateValue) {
      const backDate = DateTime.fromISO(backDateValue);
      if (selectedDate > backDate) this.backField.value = '';
    }

    this.setMinBackDate(event.target.value);
  }

  /**
   * Обработка событий чекбокса
   * @param {*} event - event
   */
  directionHandler(event) {
    const status = event.target.checked;
    if (status) {
      this.backField.closest('label').classList.remove('hidden');
    } else {
      this.backField.closest('label').classList.add('hidden');
    }
  }

  /**
   * Устанавливаем минимальную дату = текущей
   */
  setMinDate() {
    const currentTime = DateTime.now().toISODate();
    this.forthField.setAttribute('min', currentTime);
    this.backField.setAttribute('min', currentTime);
  }

  /**
   * Устанавливает минимальную обратную дату
   * @param {*} date - дата 2022-05-18
   */
  setMinBackDate(date) {
    this.backField.setAttribute('min', date);
  }
}
