const word = $('#word');
const text = $('#text');
const scoreEl = $('#score');
const timeEl = $('#time');
const endgameEl = $('#end-game-container');
const settingsBtn = $('#settings-btn');
const settings = $('#settings');
const settingsForm = $('#settings-form');
const sahktiSelect = $('#sahkti');

const asanWords = [
  'سیب',
  'آب',
  'کتاب',
  'در',
  'قلم',
  'مداد',
  'دوچرخه',
  'چای',
  'گل',
  'درخت',
  'کفش',
  'نان',
  'دست',
  'صورت',
  'خانه',
  'ماشین',
  'مدرسه',
  'پنجره',
  'آسمان',
  'نور'
];

const motevasetWords = [
  'باران',
  'جنگل',
  'مسافرت',
  'دانش آموز',
  'صبحانه',
  'هواپیما',
  'شکلات',
  'کوهستان',
  'رستوران',
  'پرندگان',
  'نیروگاه',
  'کتری',
  'فرش',
  'چراغ',
  'راننده',
  'تلویزیون',
  'پزشک',
  'خنده دار',
  'کتابخانه',
  'دوستی'
];

const sakhtWords = [
  'فلسفه',
  'معماری',
  'بازسازی',
  'قانون گذاری',
  'مسئولیت پذیری',
  'خود آگاهی',
  'هم زیستی',
  'پیشرفتگی',
  'توسعه پذیری',
  'مصلحت اندیشی',
  'دگرگونی',
  'نظام مندی',
  'ناهمگونی',
  'ترکیب پذیری',
  'رفتار شناسی',
  'ناکار آمدی',
  'بازدارندگی',
  'انتزاعی',
  'فرهنگ سازی',
  'خود انتقادی'
];


let randomWord;

let emtyaz = 0;

let time = 10;


const estefade=[];

let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'motevaset';

sahktiSelect.val(difficulty);


text.focus();

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
  let wordList;

  if (sahktiSelect.val() == 'asan') {
    wordList = asanWords;
    time=10;
  } else if (sahktiSelect.val() == 'motevaset') {
    time=13;
    wordList = motevasetWords;
  } else if (sahktiSelect.val() == 'sakht') {
    time=15;
    wordList = sakhtWords;
  }

  const unused = wordList.filter(w => !estefade.includes(w));
  if (unused.length === 0) {

clearInterval(timeInterval);
  endgameEl.html(`
    <h1>تبریک! شما پیروز شدید!</h1>
    <p>${emtyaz +1} متیاز نهایی شما </p>
    <button onclick="location.reload()">بازی مجدد</button>
  `);
      endgameEl.css('display', 'flex');
  return'';
  }
      const randomIndex = Math.floor(Math.random() * unused.length);
  const selected = unused[randomIndex];
  estefade.push(selected);
    return selected;
}


function addWordToDOM() {
  randomWord = getRandomWord();
  word.html(randomWord);
}

function updateScore() {
  emtyaz++;
  scoreEl.html(emtyaz);
}

function updateTime() {
  time--;
  timeEl.html(time + 'ثانیه');

  if (time === 0) {
    clearInterval(timeInterval);

    gameOver();
  }
}
function gameOver() {
  endgameEl.html(`
    <h1>زمان شما تمام شد</h1>
    <p> متیاز نهایی شما ${emtyaz}</p>
    <button onclick="location.reload()">بازی مجدد</button>
  `);

  endgameEl.css('display' , 'flex');
}

addWordToDOM();


text[0].addEventListener('input', e => {
  const insertedText = e.target.value.trim();

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    e.target.value='';


    updateTime();
  }
});

settingsBtn.on('click', () => settings.toggleClass('hide'));

settingsForm.on('change', e => {
  difficulty = sahktiSelect.val();
  localStorage.setItem('difficulty', difficulty);
});
