// import Turbolinks from 'turbolinks';
// Turbolinks.start();
// // Require https://github.com/rails/jquery-ujs
import 'jquery-ujs';
import renderApp from './react/ticket_panel';

const App = {
  init() {
    renderApp();
  }
};
module.exports = App;
