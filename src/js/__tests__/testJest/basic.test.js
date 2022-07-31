import Inspector from '../../Inspector';

test('Объект должен создаваться', () => {
  const unit = new Inspector();
  expect(unit).toEqual({ data: undefined });
});
