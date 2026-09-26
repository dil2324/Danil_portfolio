const projects = [
  {
    id: 'ai-api', title: 'AI Assistant API', category: 'backend', type: 'BACKEND / AI', visual: 'api',
    description: 'API для AI-ассистента: регистрация, авторизация и диалоги с сохранением истории в PostgreSQL.',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'Docker'], repo: 'Ai-Assistant-API',
    demo: 'https://ai-assistant-api-gx5a.onrender.com/docs', demoLabel: 'Swagger ↗',
    detail: 'Серверная часть AI-ассистента, которая связывает веб-интерфейс, языковую модель и базу данных.',
    features: ['REST API на FastAPI: /register, /login, /me, /chat и /clear.', 'Интеграция OpenAI API и сохранение истории диалога.', 'PostgreSQL и SQLAlchemy для работы с данными.', 'Запуск базы данных через Docker Compose.'],
    benefit: 'История в PostgreSQL позволяет продолжать диалог с сохранённым контекстом. Отдельный API можно подключать к веб-интерфейсу.',
    deployment: 'Есть инструкция деплоя на Render; нужна настройка сервисов.',
    limitations: ['Для запуска нужны PostgreSQL и ключ OpenAI API. Доступность AI-ответов зависит от внешнего провайдера и его лимитов.', 'README описывает API, frontend и базу на Render. После первого развёртывания нужно указать адреса API и frontend в переменных окружения и повторно развернуть оба сервиса.'],
    note: 'Ссылка на Swagger взята из README. Доступность внешнего сервиса зависит от хостинга.'
  },
  {
    id: 'ai-bot', title: 'AI Assistant Bot', category: 'bots', type: 'TELEGRAM / AI', visual: 'bot',
    description: 'Telegram-ассистент с памятью диалога для каждого пользователя и интеграцией языковой модели.',
    tags: ['Python', 'Aiogram 3', 'OpenAI API'], repo: 'AI-assistant-bot',
    demo: 'https://github.com/dil2324/AI-assistant-bot/blob/main/demo.gif', demoLabel: 'Запись демо ↗',
    detail: 'Бот отвечает на вопросы в Telegram и передаёт контекст предыдущих сообщений языковой модели.',
    features: ['Интеграция GPT-4o mini через OpenAI API.', 'Отдельная история диалога для каждого пользователя.', 'Команды /start и /clear для начала работы и очистки контекста.', 'Обработка ошибок и логирование.'],
    benefit: 'Пользователь общается с AI прямо в Telegram, а история помогает продолжать разговор без повторения предыдущих сообщений.',
    deployment: 'Инструкцию запуска в README нужно дополнить.',
    limitations: ['README заканчивается на клонировании репозитория: нужно описать установку зависимостей, настройку токенов и команду запуска.', 'Сохранение истории после перезапуска в README не описано. Это нужно проверить перед постоянным запуском; запись демо не подтверждает доступность работающего бота.']
  },
  {
    id: 'barber', title: 'BarberShop Bot', category: 'bots', type: 'TELEGRAM / АВТОМАТИЗАЦИЯ', visual: 'barber',
    description: 'Бот для записи в барбершоп: выбор мастера, сохранение записей и напоминания перед визитом.',
    tags: ['Python', 'Telegram Bot', 'SQLite'], repo: 'BarberShop-bot',
    detail: 'Автоматизация записи клиентов через привычный интерфейс Telegram.',
    features: ['Создание и сохранение записей клиентов.', 'Выбор мастера с помощью кнопок.', 'Информация об услугах и расположении барбершопа.', 'Напоминания за 24 часа и за 3 часа до визита.'],
    benefit: 'Выбор мастера и запись доступны в Telegram. Напоминания помогают клиенту заранее вспомнить о визите.',
    deployment: 'Нужно исправить инструкцию запуска и проверить напоминания.',
    limitations: ['В инструкции указан другой адрес репозитория, а шаги установки и запуска не завершены. Это нужно исправить в README бота.', 'Для SQLite нужно сохранять файл базы между перезапусками. Перед рабочим запуском следует проверить восстановление напоминаний и защиту от двойной записи: README не подтверждает эти сценарии.']
  },
  {
    id: 'todo', title: 'Todo API', category: 'backend', type: 'BACKEND / REST API', visual: 'todo',
    description: 'REST API для управления задачами: полный CRUD, валидация данных и документация Swagger.',
    tags: ['Python', 'FastAPI', 'Pydantic'], repo: 'Todo-APi',
    detail: 'API для создания, просмотра, изменения и удаления задач с валидацией моделей через Pydantic.',
    features: ['Получение всех задач и задачи по идентификатору.', 'Создание задач через POST /tasks.', 'Обновление и удаление через PUT и DELETE /tasks/{id}.', 'Интерактивная документация на /docs после локального запуска.'],
    benefit: 'Небольшой API показывает полный цикл работы с задачами и валидацию входных данных. Через Swagger удобно изучать и вызывать его методы.',
    deployment: 'Описан локальный запуск; готовность к рабочему деплою не подтверждена.',
    limitations: ['README не описывает постоянное хранилище и разграничение доступа пользователей. До использования для личных задач это нужно проверить в коде.', 'Команда с --reload предназначена для разработки. Для постоянной работы нужно отдельно настроить запуск сервиса и хранение данных.']
  },
  {
    id: 'coffee', title: 'Coffee Landing', category: 'frontend', type: 'FRONTEND / ВЕБ-САЙТ', visual: 'coffee',
    description: 'Лендинг кофейни с главным баннером и меню. Дополнительный проект по вёрстке на HTML и CSS.',
    tags: ['HTML5', 'CSS', 'GitHub Pages'], repo: 'coffee-landing-frontend',
    demo: 'https://dil2324.github.io/coffee-landing-frontend/', demoLabel: 'Открыть сайт ↗',
    detail: 'Небольшой сайт кофейни, опубликованный на GitHub Pages. Практика создания визуального интерфейса.',
    features: ['Главный баннер с текстом.', 'Меню кофейни.', 'Вёрстка на HTML5 и CSS.', 'Публикация на GitHub Pages.'],
    benefit: 'Статический лендинг показывает кофейню и меню, а размещение на GitHub Pages не требует отдельного backend-сервера.',
    deployment: 'В README есть ссылка на GitHub Pages.',
    limitations: ['README описывает витрину с меню. Заказ, оплата и управление меню через админку не заявлены — для них потребуется отдельная реализация.', 'Перед использованием для бизнеса нужно отдельно проверить мобильную вёрстку, контакты и актуальность меню.']
  }
];

// These are illustrative compositions, not screenshots or live API responses.
const previews = {
  api: '<div class="api-window"><div class="mini-window-title">AI Assistant API <span>REST / v1</span></div><div class="endpoint"><b>POST</b><span>/register</span><span>auth</span></div><div class="endpoint"><b>POST</b><span>/login</span><span>auth</span></div><div class="endpoint"><b>POST</b><span>/chat</span><span>AI</span></div><div class="endpoint"><b>GET</b><span>/me</span><span>user</span></div></div>',
  bot: '<div class="chat-window"><div class="chat-title"><span class="bot-icon">✳</span><div>AI Assistant<small>telegram bot</small></div></div><div class="bubble user">Что такое FastAPI?</div><div class="bubble">Фреймворк на Python для создания API. Давай разберём на примере.</div><div class="chat-input">Сообщение… <span>↗</span></div></div>',
  barber: '<div class="booking"><div class="booking-heading">Barber shop.</div><div class="booking-sub">Выберите удобное время</div><div class="booking-slots"><span>10:00</span><span>12:30</span><span>15:00</span></div><div class="booking-note">↗ Напомню о предстоящем визите</div></div>',
  todo: '<div class="todo-window"><div class="mini-window-title">~/todo-api <span>JSON</span></div><p><span>GET</span> /tasks\n\n[\n  {\n    <span>"id"</span>: 1,\n    <span>"title"</span>: "Build something useful"\n  }\n]</p></div>',
  coffee: '<div class="coffee-preview"><div class="coffee-type"><small>COFFEE & CO.</small><strong>Good coffee.<br>Good day.</strong><span>VIEW MENU ↗</span></div><div class="coffee-art"><div class="cup"></div></div></div>'
};
const projectGrid = document.querySelector('#projects');
projectGrid.innerHTML = projects.map((project, index) => `
  <article class="project" data-category="${project.category}">
    <div class="project-visual preview-${project.visual}" data-project="${project.id}" role="button" tabindex="0" aria-label="Подробнее о проекте ${project.title}">
      <span class="visual-label">${project.visual === 'api' ? 'СХЕМА API' : 'ИЛЛЮСТРАЦИЯ ПРОЕКТА'}</span><span class="visual-expand" aria-hidden="true">↗</span><div class="sr-only">Иллюстрация, не снимок работающего приложения.</div>${previews[project.visual]}
    </div>
    <div class="project-info"><div class="project-meta"><span class="project-number">0${index + 1}</span><span>${project.type}</span></div><div class="project-title-row"><h3>${project.title}</h3><button type="button" class="project-detail" data-project="${project.id}" aria-label="Описание ${project.title}">↗</button></div><p>${project.description}</p><div class="project-tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div><p class="project-readiness"><strong>Запуск:</strong> ${project.deployment}</p><button type="button" class="project-more text-link" data-project="${project.id}">Плюсы и ограничения <span aria-hidden="true">↗</span></button><div class="project-links"><a href="https://github.com/dil2324/${project.repo}" target="_blank" rel="noopener noreferrer">Код на GitHub ↗</a>${project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer">${project.demoLabel}</a>` : ''}</div></div>
  </article>`).join('');

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    let count = 0;
    document.querySelectorAll('.project').forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
      if (!card.hidden) count++;
    });
    document.querySelector('#filter-status').textContent = `Показано проектов: ${count}`;
  });
});

const dialog = document.querySelector('#project-dialog');
function openProject(id) {
  const project = projects.find(item => item.id === id);
  if (!project) return;
  document.querySelector('#dialog-content').innerHTML = `<h2 id="dialog-title">${project.title}</h2><p>${project.detail}</p><div class="project-tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div><h3>Чем полезен</h3><p>${project.benefit}</p><h3>Что реализовано</h3><ul>${project.features.map(feature => `<li>${feature}</li>`).join('')}</ul><h3>Готовность к запуску</h3><p>${project.deployment}</p><h3>Ограничения и что проверить</h3><ul>${project.limitations.map(item => `<li>${item}</li>`).join('')}</ul><div class="project-links"><a href="https://github.com/dil2324/${project.repo}" target="_blank" rel="noopener noreferrer">Репозиторий ↗</a>${project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer">${project.demoLabel}</a>` : ''}</div><p class="dialog-source">Возможности сверены с <a href="https://github.com/dil2324/${project.repo}#readme" target="_blank" rel="noopener noreferrer">README проекта</a>. Оценка запуска основана на документации; аудит кода и проверка рабочего сервиса не проводились.${project.note ? ` ${project.note}` : ''}</p>`;
  dialog.showModal();
  document.body.classList.add('modal-open');
}
document.querySelectorAll('[data-project]').forEach(trigger => {
  trigger.addEventListener('click', () => openProject(trigger.dataset.project));
  if (trigger.getAttribute('role') === 'button') trigger.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openProject(trigger.dataset.project); }
  });
});
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});

const themeToggle = document.querySelector('.theme-toggle');
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
  themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему');
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#1b201c' : '#f5f4ee';
}
try { setTheme(localStorage.getItem('portfolio-theme') === 'dark' ? 'dark' : 'light'); } catch { setTheme('light'); }
themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(theme);
  try { localStorage.setItem('portfolio-theme', theme); } catch { /* Private mode can disable storage. */ }
});
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); }
menuToggle.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!navigation.contains(event.target) && !menuToggle.contains(event.target)) closeMenu(); });

let toastTimeout;
function notify(message) {
  const toast = document.querySelector('#toast');
  clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.classList.add('visible');
  toastTimeout = setTimeout(() => toast.classList.remove('visible'), 3500);
}
document.querySelector('#copy-email').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('di0230518@gmail.com');
    notify('Email скопирован');
  } catch {
    notify('Email: di0230518@gmail.com — выделите и скопируйте адрес');
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();
