export const wrapperButton = 'popopver_bottom';

export const wrapperTop = 'popopver_top';

export const printTopBottom = function (text) {
  return `
  <div class="popopver ${text}">
    <header class="popover__header">
      Popopver title            
    </header>
    <p class="popover__text">
      And here's some amazing content. It's very engaging. Right?
    </p>
  </div>
`;
};

export const buttons = Array.from(document.querySelectorAll('.button'));
