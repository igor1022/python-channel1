from telethon import TelegramClient, utils
import asyncio

api_id = 25509051
api_hash = '4b1ecf7d0afe3651e1b689970af58e08'
client = TelegramClient('session_name', api_id, api_hash)

async def get_max_date():
    try:
        channel = await client.get_entity('t.me/PARCUSCARGO')
        async for message in client.iter_messages(channel):
            print(message.date)
            return message.date
    except Exception as e:
        print(f"Error: {e}")

async def periodic_task(interval):
    while True:
        await get_max_date()
        await asyncio.sleep(interval)

if __name__ == "__main__":
    with client:
        loop = asyncio.get_event_loop()
        loop.run_until_complete(periodic_task(5))