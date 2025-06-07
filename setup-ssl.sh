#!/bin/bash
# setup-ssl.sh

# Остановить nginx если запущен
docker-compose down

# Получить сертификат
sudo certbot certonly --standalone \
  --email berg.finance.box@gmail.com \
  --agree-tos \
  --no-eff-email \
  -d cryptocenter.finance \
  -d www.cryptocenter.finance

# Запустить приложение
docker-compose up -d

# Настроить автообновление сертификата
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet --deploy-hook 'docker-compose restart nginx'") | crontab -