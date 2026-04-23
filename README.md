# Portfolio Website - Next.js + Tailwind CSS

Портфолио веб-разработчика на Next.js 15 с Tailwind CSS.

## Особенности

- ⚡ Next.js 15 (App Router)
- 🎨 Tailwind CSS
- 🌓 Темная/светлая тема
- 📱 Адаптивный дизайн
- 💬 Форма обратной связи через Telegram Bot API
- 📄 Кнопка скачивания CV
- 🔒 Переменные окружения для безопасности

## Установка

```bash
npm install
```

## Настройка

1. Скопируйте `.env.example` в `.env.local`:
```bash
cp .env.example .env.local
```

2. Заполните переменные окружения в `.env.local`:
```env
NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=your_bot_token_here
NEXT_PUBLIC_TELEGRAM_CHAT_ID=your_chat_id_here
NEXT_PUBLIC_CV_DOWNLOAD_URL=https://example.com/path/to/your/cv.pdf
```

## Запуск

### Development
```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm start
```

## Структура проекта

```
portfolio-nextjs/
├── app/
│   ├── layout.tsx          # Главный layout
│   ├── page.tsx            # Главная страница
│   └── globals.css         # Глобальные стили
├── components/
│   ├── ThemeProvider.tsx   # Провайдер темы
│   ├── Navbar.tsx          # Навигация
│   ├── ContactWidget.tsx   # Форма обратной связи
│   └── CVDownload.tsx      # Кнопка скачивания CV
├── public/
│   └── images/             # Изображения проектов
├── .env.local              # Переменные окружения (не в git)
└── .env.example            # Пример переменных окружения
```

## Компоненты

### ContactWidget
Выплывающая форма обратной связи справа на экране (65% высоты). Отправляет сообщения через Telegram Bot API.

### CVDownload
Кнопка скачивания CV внизу справа экрана. Ссылка на CV берется из переменной окружения.

### ThemeProvider
Управление темной/светлой темой с сохранением в localStorage.

## Технологии

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Telegram Bot API

## Автор

Zaiko Eugenii - Full-Stack Developer

- GitHub: [@rahunak](https://github.com/rahunak)
- LinkedIn: [rahunak](https://www.linkedin.com/in/rahunak/)
- Telegram: [@rahunak](https://t.me/rahunak)
# portfolio-nextjs
