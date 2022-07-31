import {
  elemWrapper, elemList, elemLi, getFullText, formAddTicket, formEditTicket, formDeleteTicket,
} from './utils';

export default class Inspector {
  constructor() {
    this.data = undefined;
  }

  getServer() {
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost:7070/?method=allTicket';
    xhr.open('GET', url);
    xhr.send();

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          this.data = JSON.parse(xhr.responseText);
          if (this.data.length > 0) {
            this.data.forEach((a) => {
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
        const elemFormAddTicket = document.querySelector('.form[name=add-ticket]');
        elemFormAddTicket.addEventListener('submit', (e) => {
          e.preventDefault();
          const formData = new FormData(elemFormAddTicket);

          const xhr = new XMLHttpRequest();
          const url = 'http://localhost:7070/?method=createTicket';
          xhr.open('POST', url);
          xhr.send(formData);
          elemFormAddTicket.closest('.wrapper__popup').remove();

          const xhrGetTicket = new XMLHttpRequest();
          const urlGetTicket = 'http://localhost:7070/?method=allTicket';
          xhrGetTicket.open('GET', urlGetTicket);
          xhrGetTicket.send();

          xhrGetTicket.addEventListener('load', () => {
            if (xhrGetTicket.status >= 200 && xhrGetTicket.status < 300) {
              try {
                this.data = JSON.parse(xhrGetTicket.responseText);
                let statusChecked = '';
                if (this.data[this.data.length - 1].status) statusChecked = 'checked';
                const lastIndex = this.data.length - 1;
                elemList.insertAdjacentHTML('beforeend', elemLi(this.data[lastIndex].name, this.data[lastIndex].created, statusChecked, this.data[lastIndex].id));
              } catch (err) {
                console.error(err);
              }
            }
          });
        });
      }

      if (button.classList.contains('button_edit')) {
        const idItem = button.closest('.item').querySelector('.text').dataset.id;

        const xhr = new XMLHttpRequest();
        const url = `http://localhost:7070/?method=ticketById&id=${idItem}`;
        xhr.open('GET', url);
        xhr.send();

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const data = JSON.parse(xhr.responseText);
              elemWrapper.insertAdjacentHTML('afterbegin', formEditTicket(data.name, data.description));

              const elemFormEditTicket = document.querySelector('.form[name=edit-ticket]');
              elemFormEditTicket.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(elemFormEditTicket);

                const xhrPostTicket = new XMLHttpRequest();
                const urlPostTicket = `http://localhost:7070/?method=ticketById&id=${idItem}`;
                xhrPostTicket.open('POST', urlPostTicket);
                xhrPostTicket.send(formData);
                elemFormEditTicket.closest('.wrapper__popup').remove();

                xhrPostTicket.addEventListener('load', () => {
                  if (xhrPostTicket.status >= 200 && xhrPostTicket.status < 300) {
                    try {
                      const dataPost = JSON.parse(xhrPostTicket.responseText);
                      const elemEdit = document.querySelector(`.text[data-id="${dataPost.id}"]`);
                      elemEdit.textContent = dataPost.name;
                      const elemEditFull = elemEdit.closest('.wrapper__block-content').querySelector('p.text');
                      if (elemEditFull) {
                        elemEditFull.textContent = dataPost.description;
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  }
                });
              });
            } catch (e) {
              console.error(e);
            }
          }
        });
      }

      if (button.classList.contains('button_remove')) {
        elemWrapper.insertAdjacentHTML('afterbegin', formDeleteTicket);
        const elemFormDeleteTicket = document.querySelector('.form[name=delete-ticket]');
        elemFormDeleteTicket.addEventListener('submit', (e) => {
          e.preventDefault();
          const idItem = button.closest('.item').querySelector('.text').dataset.id;
          const formData = new FormData();
          formData.append('id', idItem);
          const xhr = new XMLHttpRequest();
          const url = 'http://localhost:7070/?method=deleteTicket';
          xhr.open('POST', url);
          xhr.send(formData);
          elemFormDeleteTicket.closest('.wrapper__popup').remove();

          xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                button.closest('.item').remove();
              } catch (err) {
                console.error(err);
              }
            }
          });
        });
      }
    }

    if (buttonCancel) {
      elem.closest('.wrapper__popup').remove();
    }

    if (textTicket) {
      const elemFullContent = textTicket.closest('.wrapper__block-content').querySelector('.block-fullcontent');
      if (elemFullContent) {
        elemFullContent.classList.toggle('hidden');
      } else {
        const xhr = new XMLHttpRequest();
        const url = `http://localhost:7070/?method=ticketById&id=${textTicket.dataset.id}`;
        xhr.open('GET', url);
        xhr.send();

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const data = JSON.parse(xhr.responseText);
              textTicket.closest('.wrapper__block-content').insertAdjacentHTML('beforeend', getFullText(data.description));
            } catch (e) {
              console.error(e);
            }
          }
        });
      }
    }
  }
}
