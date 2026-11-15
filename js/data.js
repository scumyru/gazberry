/* ============================================================
   Gazberry — контент сайта.
   Ссылки и телефон меняются здесь, в одном месте.
   Строки вида ['укр', 'eng'] — переводы; обычная строка — без перевода.
   ============================================================ */

window.GB_CONFIG = {
  instagram: 'https://www.instagram.com/gazberry_/',
  instagramLabel: '@gazberry_',
  phone: '+380957651112',
  phoneLabel: '095 765 11 12',
  maps: 'https://maps.app.goo.gl/Fey2CAzdHe3yQZHA7',
  mapEmbed: 'https://www.google.com/maps?q=Gazberry,+%D0%B2%D1%83%D0%BB%D0%B8%D1%86%D1%8F+%D0%86%D0%B2%D0%B0%D0%BD%D0%B0+%D0%9C%D0%B0%D0%B7%D0%B5%D0%BF%D0%B8,+4,+%D0%A7%D0%B5%D1%80%D0%BD%D1%96%D0%B3%D1%96%D0%B2&z=17&output=embed',
  menuPdf: 'GAZ.pdf',
  openHour: 13,   // 13:00
  closeHour: 1,   // 01:00 следующего дня
  rating: 4.5,
  reviews: 95,
  // Куда отправлять заявки на бронь (URL, принимающий POST с JSON — например Formspree
  // или свой обработчик для Telegram-бота). Пока пусто: заявка копируется в буфер,
  // а гостю предлагается отправить её в Instagram или позвонить.
  bookingEndpoint: ''
};

/* Вкусы для конструктора кальяна — замените на реальные миксы заведения */
window.GB_FLAVORS = [
  ['Ягідний', 'Berry'], ['Фруктовий', 'Fruity'], ['Цитрусовий', 'Citrus'], ['Тропічний', 'Tropical'],
  ['М\'ятний', 'Minty'], ['Десертний', 'Dessert'], ['Пряний', 'Spicy'], ['На смак майстра', 'Master\'s choice']
];

/* Иконки категорий меню (внутренности SVG 48×48) */
window.GB_ICONS = {
  hookah: '<path d="M24 4v6M18 10h12M21 10c0 5 6 5 6 10s-6 5-6 10M27 10c0 5-6 5-6 10s6 5 6 10M17 34c0-3 3-4 7-4s7 1 7 4c0 5-3 8-7 8s-7-3-7-8ZM14 44h20M31 36c7 0 9-6 9-11"/>',
  cocktails: '<path d="M8 8h32L24 26ZM24 26v14M15 42h18M30 4l-5 12"/><circle cx="34" cy="6" r="2.5"/>',
  shots: '<path d="M13 8h22l-4 32H17ZM15.500 22h17M21 30h6"/>',
  alcohol: '<path d="M20 4h8v9c0 4 5 5 5 12v17a2 2 0 0 1-2 2H17a2 2 0 0 1-2-2V25c0-7 5-8 5-12ZM15 29h18M15 37h18"/>',
  soft: '<path d="M12 14h24l-3 28H15ZM28 14l4-10h7M13.500 24h21"/>',
  snacks: '<path d="M6 24h36a18 18 0 0 1-36 0ZM17 44h14M17 17c0-3 3-3 3-6M26 17c0-3 3-3 3-6"/>'
};

window.GB_MENU = [
  {
    id: 'hookah', t: ['Кальяни', 'Hookahs'],
    groups: [{
      items: [
        [['Важкий', 'Strong'], 390],
        [['Середній', 'Medium'], 390],
        [['Легкий', 'Light'], 390]
      ]
    }]
  },
  {
    id: 'cocktails', t: ['Коктейлі', 'Cocktails'],
    groups: [{
      items: [
        ['Pina Colada', 170, ['білий ром, сироп кокос, вершки, сік ананасу', 'white rum, coconut syrup, cream, pineapple juice']],
        ['Mai Tai', 190, ['ром золотий, ром білий, ром темний, тріпл сек, сироп маракуйя, сік ананасу, сік апельсину', 'gold, white and dark rum, triple sec, passion fruit syrup, pineapple and orange juice']],
        ['Pain Killer', 190, ['ром золотий, ром білий, ром темний, сироп кокос, сік ананасу, сік апельсину', 'gold, white and dark rum, coconut syrup, pineapple and orange juice']],
        ['Fiji', 170, ['ром золотий, сироп полуниця, сироп гренадін, сік ананасу, сік апельсину', 'gold rum, strawberry syrup, grenadine, pineapple and orange juice']],
        ['Miami Ice', 200, ['джин, горілка, ром білий, текіла, блю кюрасао, сік лимону, спрайт', 'gin, vodka, white rum, tequila, blue curaçao, lemon juice, Sprite']],
        ['Mojito', 150, ['білий ром, цукровий сироп, спрайт, м\'ята, лайм', 'white rum, sugar syrup, Sprite, mint, lime']],
        ['Mojito Strawberry', 160, ['білий ром, сироп полуниця, спрайт, м\'ята, лайм', 'white rum, strawberry syrup, Sprite, mint, lime']],
        ['Long Island', 200, ['джин, горілка, ром білий, тріпл сек, текіла, кола, цукровий сироп, сік лимону', 'gin, vodka, white rum, triple sec, tequila, cola, sugar syrup, lemon juice']],
        ['Apperol Spritz', 200, ['апероль, вино ігристе брют, содова, апельсин', 'Aperol, sparkling brut, soda, orange']],
        ['Hugo', 150, ['вино ігристе брют, цукровий сироп, содова, м\'ята, лайм', 'sparkling brut, sugar syrup, soda, mint, lime']],
        ['Negroni', 180, ['джин, кампарі, червоний вермут', 'gin, Campari, red vermouth']],
        ['Boulevardier', 190, ['віскі, кампарі, червоний вермут, апельсин', 'whisky, Campari, red vermouth, orange']],
        ['Monkey Gland', 180, ['джин, абсент, сироп гренадін, сік апельсину', 'gin, absinthe, grenadine, orange juice']],
        ['Gin Garden', 170, ['джин, сироп бузина, сік яблука, сік лимону, кориця', 'gin, elderflower syrup, apple juice, lemon juice, cinnamon']],
        ['Tom Collins', 150, ['джин, цукровий сироп, сік лимону, содова', 'gin, sugar syrup, lemon juice, soda']],
        ['Raffaello', 150, ['бейліс, сироп кокос, сироп ваніль, вершки', 'Baileys, coconut syrup, vanilla syrup, cream']],
        ['Camicaze', 150, ['горілка, тріпл сек, цукровий сироп, сік лайму', 'vodka, triple sec, sugar syrup, lime juice']],
        ['Dead Russian', 170, ['горілка, бейліс, вершки, зерна кави', 'vodka, Baileys, cream, coffee beans']]
      ]
    }]
  },
  {
    id: 'shots', t: ['Шоти', 'Shots'],
    groups: [{
      items: [
        [['Медуза', 'Jellyfish'], 130, ['блю кюрасао, тріпл сек, абсент, бейліс', 'blue curaçao, triple sec, absinthe, Baileys']],
        [['Зелений мексиканець', 'Green Mexican'], 130, ['текіла, сироп зеленого банану, фреш лимону', 'tequila, green banana syrup, fresh lemon juice']],
        [['Пухлина мозку', 'Brain Tumor'], 130, ['білий вермут, горілка, бейліс, гренадін', 'white vermouth, vodka, Baileys, grenadine']],
        [['Пожежа в Техасі', 'Texas Fire'], 130, ['кампарі, тріпл сек, сироп зеленого банану', 'Campari, triple sec, green banana syrup']],
        [['Б-52', 'B-52'], 130, ['кавовий лікер, бейліс, тріпл сек', 'coffee liqueur, Baileys, triple sec']],
        [['Три собаки', 'Three Dogs'], 130, ['горілка, фреш лимону, табаско', 'vodka, fresh lemon juice, Tabasco']],
        [['Дядько Іван', 'Uncle Ivan'], 130, ['горілка, гренадін, фреш лимону', 'vodka, grenadine, fresh lemon juice']]
      ]
    }]
  },
  {
    id: 'alcohol', t: ['Алкоголь', 'Spirits & Beer'],
    groups: [
      { t: ['Пиво', 'Beer'], items: [[['Львівське', 'Lvivske'], 70], ['Cronenbourg Blanc', 90], ['Corona', 120], ['Stella Artois', 80], ['Somersby', 90]] },
      { t: ['Ром', 'Rum'], items: [['Captain Morgan (Gold)', 100], ['Oakheart (Gold)', 90]] },
      { t: ['Джин', 'Gin'], items: [['Gordon`s', 90], ['Beefeater', 90]] },
      { t: ['Віскі', 'Whisky'], items: [['Jack Daniel`s', 130], ['Bushmills', 120], ['Jameson', 90], ['Bells', 70]] },
      { t: ['Лікер', 'Liqueur'], items: [['Becherovka', 75], ['Jagermeister', 100], [['Абсент', 'Absinthe'], 100]] },
      { t: ['Текіла', 'Tequila'], items: [['Silver', 90], ['Gold', 90]] },
      { t: ['Коньяк', 'Cognac'], items: [['Aznauri ***', 60], ['Metaxa', 90]] },
      { t: ['Горілка', 'Vodka'], items: [[['Козацька рада', 'Kozatska Rada'], 50], ['Finlandia', 90]] },
      { t: ['Вино', 'Wine'], items: [[['Червоне', 'Red'], 100, ['100 мл', '100 ml']], [['Біле', 'White'], 100, ['100 мл', '100 ml']]] },
      { t: ['Вино ігристе', 'Sparkling wine'], items: [['Marengo', 400], ['Latinium', 450], ['Marengo Semi-Sweet', 400]] }
    ]
  },
  {
    id: 'soft', t: ['Безалкогольні', 'Non-alcoholic'],
    groups: [
      {
        t: ['Чай і кава', 'Tea & coffee'], items: [
          [['Чай класичний', 'Classic tea'], 80, ['чорний, зелений, фруктовий, трав\'яний, каркаде', 'black, green, fruit, herbal, hibiscus']],
          [['Чай фірмовий', 'Signature tea'], 130, ['свіжі фрукти в асортименті, джем, фреш', 'assorted fresh fruit, jam, fresh juice']],
          [['Лимон', 'Lemon'], 15],
          [['Мед', 'Honey'], 20],
          [['Еспрессо', 'Espresso'], 35],
          [['Американо', 'Americano'], 40],
          [['Американо з молоком', 'Americano with milk'], 45],
          [['Капучіно', 'Cappuccino'], 55],
          [['Лате', 'Latte'], 60]
        ]
      },
      {
        t: ['Холодна кава', 'Iced coffee'], items: [
          [['Айс лате', 'Iced latte'], 70],
          ['Bumble', 80, ['лід, апельсиновий сік, еспресо, сироп карамель', 'ice, orange juice, espresso, caramel syrup']]
        ]
      },
      {
        t: ['Лимонади', 'Lemonades'], items: [
          [['Акуна Матата', 'Hakuna Matata'], 105, ['джем ківі, огірок, сік ананасу, содова', 'kiwi jam, cucumber, pineapple juice, soda']],
          [['Цитрусова помста', 'Citrus Revenge'], 105, ['лимон, лайм, сік апельсину, сік яблука, сироп маракуйя, спрайт', 'lemon, lime, orange and apple juice, passion fruit syrup, Sprite']],
          [['Каламбур', 'Calambur'], 105, ['апельсин, лимон, сік вишні, сироп гренадін, спрайт', 'orange, lemon, cherry juice, grenadine, Sprite']],
          [['Баунті', 'Bounty'], 105, ['апельсин, лимон, сік ананасу, сироп кокос, спрайт, м\'ята', 'orange, lemon, pineapple juice, coconut syrup, Sprite, mint']],
          [['Чорничний', 'Blueberry'], 105, ['джем чорниці, лайм, м\'ята, содова', 'blueberry jam, lime, mint, soda']],
          [['Кавуновий', 'Watermelon'], 105, ['джем кавуна, апельсин, сироп полуниця, спрайт', 'watermelon jam, orange, strawberry syrup, Sprite']],
          [['Манго-маракуйя', 'Mango & passion fruit'], 105, ['джем манго-маракуйя, лимон, лайм, апельсин, содова', 'mango-passion fruit jam, lemon, lime, orange, soda']]
        ]
      },
      {
        t: ['Безалкогольні коктейлі', 'Mocktails'], items: [
          ['Pina Colada', 105, ['вершки, сироп кокос, сік ананасу, коктейльна вишня', 'cream, coconut syrup, pineapple juice, cocktail cherry']],
          [['П\'яна вишня', 'Drunken Cherry'], 105, ['грейпфрут, джем вишні, содова, м\'ята', 'grapefruit, cherry jam, soda, mint']],
          ['Apperol', 105, ['джем апероль, апельсин, содова, м\'ята', 'aperol jam, orange, soda, mint']],
          ['Mojito', 105, ['лайм, цукровий сироп, спрайт, м\'ята', 'lime, sugar syrup, Sprite, mint']]
        ]
      },
      {
        t: ['Молочні коктейлі', 'Milkshakes'], items: [
          [['Полуниця', 'Strawberry'], 110], [['Банан', 'Banana'], 110], [['Банан-шоколад', 'Banana & chocolate'], 110],
          [['Ківі', 'Kiwi'], 110], [['Чорниця', 'Blueberry'], 110], [['Вишня', 'Cherry'], 110]
        ]
      },
      {
        t: ['Інша водичка', 'Other drinks'], items: [
          [['Сік', 'Juice'], 50, ['в асортименті', 'assorted']],
          ['Coca-Cola', 60], ['Fanta', 60], ['Sprite', 60],
          [['Вода негазована', 'Still water'], 40],
          ['RedBull', 90], ['Schweppes', 50],
          [['Грузинський букет', 'Georgian Bouquet'], 100, ['в асортименті', 'assorted']]
        ]
      }
    ]
  },
  {
    id: 'snacks', t: ['Снеки', 'Snacks'],
    groups: [
      {
        t: ['Снеки', 'Snacks'], items: [
          [['Чіпси', 'Chips'], 90], [['М\'ясні чіпси', 'Meat chips'], 100], [['Грінки', 'Croutons'], 50],
          [['Горішки', 'Nuts'], 60], [['Фісташки', 'Pistachios'], 90, ['50 г', '50 g']], [['Кабаноси', 'Kabanos sausages'], 80, ['50 г', '50 g']]
        ]
      },
      {
        t: ['До чаю', 'With tea'], items: [
          [['Круасан', 'Croissant'], 50],
          [['Батончик протеїновий', 'Protein bar'], 60, ['без цукру', 'sugar-free']],
          [['Батончик кокосовий', 'Coconut bar'], 55, ['без цукру', 'sugar-free']],
          [['Батончик злаковий', 'Cereal bar'], 50, ['без цукру', 'sugar-free']]
        ]
      }
    ]
  }
];

window.GB_I18N = {
  uk: {
    'nav.about': 'Про нас', 'nav.menu': 'Меню', 'nav.guests': 'Гості', 'nav.contacts': 'Контакти',
    'hero.kicker': 'Кальянна · Чернігів',
    'hero.lead': 'Густий дим, авторські коктейлі та вечори, які не хочеться закінчувати.',
    'nav.book': 'Бронь', 'card.menu': 'До меню', 'card.contacts': 'До контактів',
    'hb.title': 'Збери свій кальян', 'hb.strength': 'Міцність', 'hb.flavor': 'Смак (до трьох)',
    'hb.note': 'Точний мікс підбере кальянний майстер.', 'hb.cta': 'Забронювати з цим кальяном', 'hb.pick': 'Оберіть міцність і смак',
    'hb.wish': 'Кальян',
    'book.kicker': 'Бронювання', 'book.title': 'Забронюйте столик', 'book.text': 'Вкажіть, коли вас чекати і скільки вас буде — підготуємо місце до вашого приходу.',
    'b.name': 'Ім\'я', 'b.phone': 'Телефон', 'b.guests': 'Кількість гостей', 'b.date': 'Дата', 'b.time': 'Час',
    'b.wish': 'Побажання (необов\'язково)', 'b.wish.ph': 'Наприклад: кальян середній, ягідний', 'b.name.ph': 'Як до вас звертатися', 'b.submit': 'Забронювати',
    'b.err.name': 'Вкажіть ім\'я', 'b.err.phone': 'Вкажіть номер телефону повністю', 'b.err.date': 'Оберіть дату не раніше сьогодні', 'b.err.time': 'Ми працюємо з 13:00 до 01:00',
    'b.ok.title': 'Заявку сформовано', 'b.ok.text': 'Ми скопіювали її в буфер обміну. Надішліть заявку нам у Direct або зателефонуйте — і ми підтвердимо бронь.',
    'b.ok.sent': 'Дякуємо! Ми зв\'яжемося з вами, щоб підтвердити бронь.', 'b.ok.title.sent': 'Заявку надіслано',
    'b.ok.ig': 'Написати в Instagram', 'b.ok.call': 'Зателефонувати', 'b.ok.again': 'Нова заявка', 'b.fail': 'Не вдалося надіслати заявку. Зателефонуйте нам, будь ласка.',
    'b.msg.head': 'Бронювання столика в Gazberry', 'b.msg.guests': 'Гостей', 'b.msg.when': 'Коли',
    'hero.cta1': 'Дивитись меню', 'hero.cta2': 'Забронювати столик',
    'hero.rating': 'на Google · 95 відгуків', 'hero.scroll': 'Гортай',
    'stat.rating': 'рейтинг Google', 'stat.reviews': 'відгуків гостей', 'stat.items': 'позицій у меню', 'stat.hookah': '₴ за кальян',
    'about.kicker': 'Атмосфера', 'about.title': 'Місце, куди повертаються',
    'about.text': 'Gazberry — це камерна кальянна в Чернігові. Забиваємо під ваш настрій, змішуємо класику та власні коктейлі й не поспішаємо вас проводжати.',
    'f1.t': 'Кальяни трьох міцностей', 'f1.d': 'Легкий, середній або важкий — підберемо мікс під смак і настрій. Єдина ціна 390 ₴.',
    'f2.t': 'Коктейльна карта', 'f2.d': 'Від Negroni та Long Island до фірмових шотів із характером.',
    'f3.t': 'Чай, кава, лимонади', 'f3.d': 'Фірмовий чай зі свіжими фруктами, bumble та сім авторських лимонадів.',
    'f4.t': 'Щодня до першої ночі', 'f4.d': 'Працюємо без вихідних з 13:00 до 01:00.',
    'menu.kicker': 'Меню', 'menu.title': 'Обирай свій вечір', 'menu.pdf': 'Завантажити меню PDF', 'menu.note': 'Ціни вказані у гривнях.',
    'guests.kicker': 'Гості кажуть', 'guests.title': '4,5 з 5 на Google Maps',
    'guests.text': 'У відгуках найчастіше згадують смачні димні кальяни, великий вибір тютюну, привітний персонал і фірмові коктейлі.',
    'g1': 'Димні кальяни', 'g2': 'Великий вибір тютюну', 'g3': 'Привітний персонал', 'g4': 'Фірмові коктейлі', 'g5': 'Затишна атмосфера', 'g6': 'Доступні ціни',
    'guests.cta': 'Читати відгуки',
    'contacts.kicker': 'Контакти', 'contacts.title': 'Чекаємо на вас',
    'c.address.l': 'Адреса', 'c.address.v': 'вул. Івана Мазепи, 4, Чернігів',
    'c.hours.l': 'Графік', 'c.hours.v': 'Щодня 13:00 – 01:00',
    'c.phone.l': 'Телефон', 'c.ig.l': 'Instagram',
    'c.route': 'Прокласти маршрут', 'c.call': 'Зателефонувати',
    'open.yes': 'Зараз відчинено', 'open.no': 'Зараз зачинено',
    'fab.ig': 'Ми в Instagram', 'fab.call': 'Зателефонувати',
    'footer.note': 'Надмірне споживання алкоголю та куріння шкодять вашому здоров\'ю. 18+',
    'theme': 'Змінити тему', 'lang': 'Мова'
  },
  en: {
    'nav.about': 'About', 'nav.menu': 'Menu', 'nav.guests': 'Guests', 'nav.contacts': 'Contacts',
    'hero.kicker': 'Hookah lounge · Chernihiv',
    'hero.lead': 'Thick smoke, signature cocktails and evenings you won\'t want to end.',
    'nav.book': 'Booking', 'card.menu': 'To the menu', 'card.contacts': 'To contacts',
    'hb.title': 'Build your hookah', 'hb.strength': 'Strength', 'hb.flavor': 'Flavour (up to three)',
    'hb.note': 'Your hookah master will fine-tune the mix.', 'hb.cta': 'Book with this hookah', 'hb.pick': 'Pick a strength and a flavour',
    'hb.wish': 'Hookah',
    'book.kicker': 'Booking', 'book.title': 'Book a table', 'book.text': 'Tell us when to expect you and how many of you there will be — we will have a spot ready.',
    'b.name': 'Name', 'b.phone': 'Phone', 'b.guests': 'Number of guests', 'b.date': 'Date', 'b.time': 'Time',
    'b.wish': 'Wishes (optional)', 'b.wish.ph': 'For example: medium hookah, berry', 'b.name.ph': 'What should we call you', 'b.submit': 'Book',
    'b.err.name': 'Please enter your name', 'b.err.phone': 'Please enter your full phone number', 'b.err.date': 'Pick today or a later date', 'b.err.time': 'We are open from 13:00 to 01:00',
    'b.ok.title': 'Your request is ready', 'b.ok.text': 'We copied it to your clipboard. Send it to us in Direct or give us a call and we will confirm the booking.',
    'b.ok.sent': 'Thank you! We will contact you to confirm the booking.', 'b.ok.title.sent': 'Request sent',
    'b.ok.ig': 'Message on Instagram', 'b.ok.call': 'Call us', 'b.ok.again': 'New request', 'b.fail': 'Could not send the request. Please give us a call.',
    'b.msg.head': 'Table booking at Gazberry', 'b.msg.guests': 'Guests', 'b.msg.when': 'When',
    'hero.cta1': 'View the menu', 'hero.cta2': 'Book a table',
    'hero.rating': 'on Google · 95 reviews', 'hero.scroll': 'Scroll',
    'stat.rating': 'Google rating', 'stat.reviews': 'guest reviews', 'stat.items': 'menu items', 'stat.hookah': '₴ per hookah',
    'about.kicker': 'Atmosphere', 'about.title': 'A place people come back to',
    'about.text': 'Gazberry is an intimate hookah lounge in Chernihiv. We pack the bowl to match your mood, mix classics and our own cocktails, and never rush you out.',
    'f1.t': 'Three hookah strengths', 'f1.d': 'Light, medium or strong — we will find a mix for your taste and mood. One price: 390 ₴.',
    'f2.t': 'Cocktail list', 'f2.d': 'From Negroni and Long Island to house shots with character.',
    'f3.t': 'Tea, coffee, lemonades', 'f3.d': 'Signature tea with fresh fruit, bumble coffee and seven house lemonades.',
    'f4.t': 'Open daily till 1 am', 'f4.d': 'Every day from 13:00 to 01:00.',
    'menu.kicker': 'Menu', 'menu.title': 'Pick your evening', 'menu.pdf': 'Download menu PDF', 'menu.note': 'Prices are in Ukrainian hryvnias.',
    'guests.kicker': 'Guests say', 'guests.title': '4.5 out of 5 on Google Maps',
    'guests.text': 'Reviews most often mention tasty, smoky hookahs, a wide tobacco selection, friendly staff and signature cocktails.',
    'g1': 'Smoky hookahs', 'g2': 'Wide tobacco selection', 'g3': 'Friendly staff', 'g4': 'Signature cocktails', 'g5': 'Cosy atmosphere', 'g6': 'Fair prices',
    'guests.cta': 'Read reviews',
    'contacts.kicker': 'Contacts', 'contacts.title': 'See you soon',
    'c.address.l': 'Address', 'c.address.v': '4 Ivana Mazepy St, Chernihiv',
    'c.hours.l': 'Hours', 'c.hours.v': 'Daily 13:00 – 01:00',
    'c.phone.l': 'Phone', 'c.ig.l': 'Instagram',
    'c.route': 'Get directions', 'c.call': 'Call us',
    'open.yes': 'Open now', 'open.no': 'Closed now',
    'fab.ig': 'Our Instagram', 'fab.call': 'Call us',
    'footer.note': 'Excessive alcohol consumption and smoking are harmful to your health. 18+',
    'theme': 'Toggle theme', 'lang': 'Language'
  }
};
