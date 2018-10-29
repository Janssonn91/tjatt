import { stores } from './store/';
import { Provider } from 'mobx-react';

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
