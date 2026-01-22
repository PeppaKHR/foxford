# Инструкция по настройке автоматического деплоя

## Шаги для подключения к GitHub и настройки деплоя:

### 1. Подключите удаленный репозиторий

Выполните команду (замените YOUR_USERNAME на ваш GitHub username):

```bash
git remote add origin https://github.com/YOUR_USERNAME/foxford.git
git branch -M main
git push -u origin main
```

### 2. Настройте секреты в GitHub

1. Перейдите в ваш репозиторий на GitHub: https://github.com/PeppaKHR/foxford/settings/secrets/actions
2. Нажмите "New repository secret"
3. Добавьте два секрета:
   - **Имя:** `FTP_USERNAME` → **Значение:** `u3353778`
   - **Имя:** `FTP_PASSWORD` → **Значение:** `Gjkbyf01!_`

### 3. После настройки

После каждого `git push` изменения будут автоматически деплоиться на ваш сайт pkhromova.online

## Текущие настройки FTP:

- Сервер: pkhromova.online
- Username: u3353778
- Директория: /www/pkhromova.online/
- Пароль: настроен через GitHub Secrets (Gjkbyf01!_)

