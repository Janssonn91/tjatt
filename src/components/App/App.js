import './App.scss';
@observer
export default class App extends Component {

  @observable style = {
    opacity: 0
  };
  // @observable books = [];

  async start() {
    // Note: We don't use jQuery very much,
    // in fact only in the code below

    // avoid FOUC by waiting for styles to load
    // and then fade in the app
    while (this.style.opacity < 1) {
      await sleep(60);
      let ok = $('body').css('font-family').length > 10;
      this.style.opacity += ok ? .1 : 0;
    }

    // Find some fat German books
    // this.books = await Book.find({
    //   language: 'German',
    //   pages: {$gt: 500},
    //   populate: 'author'
    // });

    // no focusing of buttons when you click them
    $(document).on('click', 'button', function () {
      $(this).blur();
    })
  }

}