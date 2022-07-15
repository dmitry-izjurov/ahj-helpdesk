import {
  wrapperButton, wrapperTop, printTopBottom, buttons,
} from './utils';

export default class Inspector {
  constructor() {
    this.topOrBottom = undefined;
    this.oldElem = undefined;
  }

  checkWindow() {
    const viewportHeight = window.innerHeight;
    window.addEventListener('scroll', () => {
      if (this.topOrBottom === 'top' && this.oldElem.getBoundingClientRect().top < 130) {
        this.oldElem.closest('.wrapper__button').querySelector('.popopver').remove();
        this.oldElem.closest('.wrapper__button').insertAdjacentHTML('beforeend', printTopBottom(wrapperButton));
        this.getOffset(document.querySelector('.popopver'), this.oldElem);
        this.topOrBottom = 'bottom';
      }

      if (this.topOrBottom === 'bottom' && viewportHeight - this.oldElem.getBoundingClientRect().bottom < 130) {
        this.oldElem.closest('.wrapper__button').querySelector('.popopver').remove();
        this.oldElem.closest('.wrapper__button').insertAdjacentHTML('afterbegin', printTopBottom(wrapperTop));
        this.getOffset(document.querySelector('.popopver'), this.oldElem);
        this.topOrBottom = 'top';
      }
    });
  }

  clickButtons() {
    buttons.forEach((a, i) => {
      a.addEventListener('click', (e) => {
        if (!this.oldElem) {
          const buttomTop = buttons[i].getBoundingClientRect().top;
          this.oldElem = e.target;
          if (buttomTop > 130) {
            buttons[i].closest('.wrapper__button').insertAdjacentHTML('afterbegin', printTopBottom(wrapperTop));
            this.getOffset(document.querySelector('.popopver'), buttons[i]);
            this.topOrBottom = 'top';
          } else {
            buttons[i].closest('.wrapper__button').insertAdjacentHTML('beforeend', printTopBottom(wrapperButton));
            this.getOffset(document.querySelector('.popopver'), buttons[i]);
            this.topOrBottom = 'bottom';
          }
        } else if (this.oldElem === e.target && this.topOrBottom) {
          this.oldElem.closest('.wrapper__button').querySelector('.popopver').remove();
          this.oldElem = undefined;
          this.topOrBottom = undefined;
        } else if (this.oldElem !== e.target && this.topOrBottom) {
          const buttomTop = buttons[i].getBoundingClientRect().top;
          this.oldElem.closest('.wrapper__button').querySelector('.popopver').remove();
          this.oldElem = e.target;
          if (buttomTop > 130) {
            buttons[i].closest('.wrapper__button').insertAdjacentHTML('afterbegin', printTopBottom(wrapperTop));
            this.getOffset(document.querySelector('.popopver'), buttons[i]);
            this.topOrBottom = 'top';
          } else {
            buttons[i].closest('.wrapper__button').insertAdjacentHTML('beforeend', printTopBottom(wrapperButton));
            this.getOffset(document.querySelector('.popopver'), buttons[i]);
            this.topOrBottom = 'bottom';
          }
        }
      });
    });
  }

  getOffset(elemPopopver, elemButton) {
    console.log(this.topOrBottom);
    // eslint-disable-next-line no-param-reassign
    elemPopopver.style.left = `${String((Number((getComputedStyle(elemButton).width).substring(0, getComputedStyle(elemButton).width.length - 2))
    - Number(getComputedStyle(elemPopopver).width.substring(0, getComputedStyle(elemPopopver).width.length - 2))) / 2)}px`;
  }
}
