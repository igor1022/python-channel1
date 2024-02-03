from telethon import TelegramClient, events
import asyncio

api_id = 25509051
api_hash = '4b1ecf7d0afe3651e1b689970af58e08'
phone_number = '+380956430549'

source_channel = 't.me/PARCUSCARGO'
destination_channel = 'https://t.me/+FIN1CuU5lBNjMzUy'

client = TelegramClient('session_name', api_id, api_hash)

async def forward_messages(event):
    try:
        print(f"Forwarding message from {source_channel} to {destination_channel}")
                
        # Пересылка сообщения в целевой канал
        destination_entity = await client.get_entity(destination_channel)
        if (event.message.photo and event.message.text):
            await client.send_file(destination_entity, file=event.message.photo, caption=event.message.text)
                
    except Exception as e:
        print(f"Error: {e}")

async def main():
    try:
        # Авторизация пользователя
        await client.start(phone_number)
        
        # Получение сущности исходного канала
        source_entity = await client.get_entity(source_channel)

        # Ожидание новых сообщений
        @client.on(events.NewMessage(chats=source_entity))
        async def handler(event):
            await forward_messages(event)

        print("Слушаем новые сообщения...")
        await client.run_until_disconnected()

    except Exception as e:
        print(f"Error: {e}")

    finally:
        await client.disconnect()

if __name__ == "__main__":
    client.loop.create_task(main())
    client.loop.run_forever()