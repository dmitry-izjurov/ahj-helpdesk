import {
  elemWrapper, elemList, elemLi, getFullText, formAddTicket, formEditTicket, formDeleteTicket
} from './utils';

export default class Inspector {
  constructor() {
    this.data = undefined;
  }

  getServer() {
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost:7071/?method=allTicket';
    xhr.open('GET', url);
    xhr.send();

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
          try {
            this.data = JSON.parse(xhr.responseText);
              console.log(this.data);
              if (this.data.length > 0) {
                this.data.forEach(a => {
                  let statusChecked = '';
                  if (a.status) statusChecked = 'checked';
                  elemList.insertAdjacentHTML('beforeend', elemLi(a.name, a.created, statusChecked, a.id));
                });
              }
          } catch (e) {
              console.error(e);
          }
      }
    });
  }

  getAction(elem) {
    const button = elem.closest('.button');
    const buttonCancel = elem.closest('.form__button-reset');
    const textTicket = elem.closest('.text');
    if (button) {
      if (button.classList.contains('button_add')) {
        elemWrapper.insertAdjacentHTML('afterbegin', formAddTicket);
      }
      
      if (button.classList.contains('button_edit')) {
        elemWrapper.insertAdjacentHTML('afterbegin', formEditTicket);
      }

      if (button.classList.contains('button_remove')) {
        elemWrapper.insertAdjacentHTML('afterbegin', formDeleteTicket);
      }
    }

    if (buttonCancel) {
      elem.closest('.wrapper__popup').remove();
    }

    if (textTicket) {
      console.log(textTicket.dataset.id);
      // const xhr = new XMLHttpRequest();
      // const url = 'http://localhost:7071/?method=allTicket';
      // xhr.open('GET', url);
      // xhr.send();

      // xhr.addEventListener('load', () => {
      //   if (xhr.status >= 200 && xhr.status < 300) {
      //     try {
      //         const data = JSON.parse(xhr.responseText);
      //         if (data.length > 0) {
      //           data.forEach(a => {
      //             let statusChecked = '';
      //             if (a.status) statusChecked = 'checked';
      //             elemList.insertAdjacentHTML('beforeend', elemLi(a.name, a.created, statusChecked));
      //           });
      //         }
      //     } catch (e) {
      //         console.error(e);
      //     }
      //   }
      // });
    }
  }
}
