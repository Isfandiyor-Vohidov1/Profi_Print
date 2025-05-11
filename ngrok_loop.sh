#!/bin/bash

while true; do
  echo "Запускаю ngrok..."
  
  # Запускаем ngrok в фоновом режиме
  ngrok http 8080 > /dev/null &
  NGROK_PID=$!

  # Даем ngrok немного времени, чтобы подключиться
  sleep 5
  
  # Получаем URL, который ngrok предоставляет
  NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | jq -r '.tunnels[0].public_url')

  echo "ngrok доступен по адресу: $NGROK_URL"

  # Ожидаем завершения ngrok
  wait $NGROK_PID

  echo "ngrok завершил работу. Перезапускаю через 5 секунд..."
  sleep 5
done
