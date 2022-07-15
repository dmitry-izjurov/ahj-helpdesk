import { wrapperButton, wrapperTop, printTopBottom } from '../../utils';

test('Объект должен возвращать строку', () => {
  expect(wrapperButton).toBe('popopver_bottom');
});

test('Объект должен возвращать строку', () => {
  expect(wrapperTop).toBe('popopver_top');
});

test('Объект должен возвращать строку', () => {
  const str = `
  <div class="popopver popopver_bottom">
    <header class="popover__header">
      Popopver title            
    </header>
    <p class="popover__text">
      And here's some amazing content. It's very engaging. Right?
    </p>
  </div>
`;
  expect(printTopBottom(wrapperButton)).toBe(str);
});

test('Объект должен возвращать строку', () => {
  const str = `
  <div class="popopver popopver_top">
    <header class="popover__header">
      Popopver title            
    </header>
    <p class="popover__text">
      And here's some amazing content. It's very engaging. Right?
    </p>
  </div>
`;
  expect(printTopBottom(wrapperTop)).toBe(str);
});
