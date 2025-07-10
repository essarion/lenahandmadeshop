import threading
import asyncio
from django.core.mail import send_mail

import telegram
import os
from dotenv import load_dotenv

load_dotenv()
bot = (
    telegram.Bot(token=os.getenv("TELEGRAM_BOT_TOKEN"))
    if os.getenv("TELEGRAM_BOT_TOKEN")
    else None
)
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")


def run_in_thread(func, *args, **kwargs):
    """Запускает функцию в отдельном потоке, не блокируя основной поток."""
    thread = threading.Thread(target=func, args=args, kwargs=kwargs)
    thread.daemon = True
    thread.start()


def send_telegram_message_sync(chat_id, text):
    try:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(bot.send_message(chat_id=chat_id, text=text))
    except Exception as e:
        print(f"Ошибка при отправке телеграм-сообщения: {e}")
    finally:
        loop.close()


def send_telegram_message_async(text):
    if bot and TELEGRAM_CHAT_ID:
        # Запускаем в отдельном потоке, чтобы не блокировать основной поток
        run_in_thread(send_telegram_message_sync, TELEGRAM_CHAT_ID, text)


def send_mail_async(subject, message, from_email, recipient_list):
    run_in_thread(
        send_mail,
        subject,
        message,
        from_email=from_email,
        recipient_list=recipient_list,
    )
