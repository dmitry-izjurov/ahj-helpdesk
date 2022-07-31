import Inspector from './Inspector';
import { elemWrapper } from './utils';

const inspector = new Inspector();
inspector.getServer();

elemWrapper.addEventListener('click', (e) => {
  inspector.getAction(e.target);
});
