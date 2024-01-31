'''from xmlrpc.client import DateTime
from telethon.sync import TelegramClient
 
from telethon.tl.functions.messages import GetDialogsRequest
from telethon.tl.types import InputPeerEmpty
from telethon.tl.functions.messages import GetHistoryRequest
from telethon.tl.types import PeerChannel
from telethon.tl.types import InputMessagesFilterPhotos, InputMessagesFilterVideo
import time
import csv
 
api_id = 25509051
api_hash = "4b1ecf7d0afe3651e1b689970af58e08"
phone = "+380956430549"
 
client = TelegramClient(phone, api_id, api_hash)
 
client.start()
 
chats = []
last_date = None
chunk_size = 200
groups=[]
result = client(GetDialogsRequest(
            offset_date=last_date,
            offset_id=0,
            offset_peer=InputPeerEmpty(),
            limit=chunk_size,
            hash = 0
        ))
chats.extend(result.chats)
for chat in chats:
   try:
       if True== True:
           groups.append(chat)
   except:
       continue
print("Выберите группу для парсинга сообщений и членов группы:")
i=0
for g in groups:
   print(str(i) + "- " + g.title)
   i+=1
g_index = input("Введите нужную цифру: ")
target_group=groups[int(g_index)]
""" print("Узнаём пользователей...") 
all_participants = []
all_participants = client.get_participants(target_group)
print("Сохраняем данные в файл...")
with open("members.csv", "w", encoding="UTF-8") as f:
   writer = csv.writer(f,delimiter=",",lineterminator="\n")
   writer.writerow(["username", "name","group"])
   for user in all_participants:
       if user.username:
           username= user.username
       else:
           username= ""
       if user.first_name:
           first_name= user.first_name
       else:
           first_name= ""
       if user.last_name:
           last_name= user.last_name
       else:
           last_name= ""
       name= (first_name + ' ' + last_name).strip()
       writer.writerow([username,name,target_group.title])     
print("Парсинг участников группы успешно выполнен.") """
 
offset_id = 0
limit = 100
all_messages = []
total_messages = 0
total_count_limit = 0
programming_languages = ["Python"]

for languege in programming_languages:
   history = client(GetHistoryRequest(
       peer=target_group,
       offset_id=offset_id,
       offset_date=None,
       add_offset=0,
       limit=limit,
       max_id=0,
       min_id=0,
       hash=0
   ))
   if not history.messages:
       break
   messages = history.messages
   for message in messages:
       all_messages.append(message.message)
   offset_id = messages[len(messages) - 1].id
   if total_count_limit != 0 and total_messages >= total_count_limit:
       break

destination_group_invite_link='https://t.me/+FIN1CuU5lBNjMzUy'
entity=client.get_entity(destination_group_invite_link)
print("Сохраняем данные в файл...")
with open("chats.csv", "w", encoding="UTF-8") as f:
   writer = csv.writer(f, delimiter=",", lineterminator="\n")
   for message in all_messages:
       writer.writerow([message])
       print('message:', message)

print('Парсинг сообщений группы успешно выполнен.')

history = client(GetHistoryRequest(
       peer=target_group,
       offset_id=offset_id,
       offset_date=None,
       add_offset=0,
       limit=limit,
       max_id=0,
       min_id=0,
       hash=0
   ))
async def main():
    channel = await client.get_entity('t.me/PARCUSCARGO')
    photos = await client.get_messages(channel, filter=InputMessagesFilterPhotos)
    videos = await client.get_messages(channel, filter=InputMessagesFilterVideo)
    await client.download_media(photos)
    await client.download_media(videos)

with client:
    client.loop.run_until_complete(main())


async def main():
    for message in all_messages:
        if message:
            await client.send_message(entity=entity,message=message)
            print('Успешно')
while True:
        client.loop.run_until_complete(main()) 
        time.sleep(30*60)'''

from telethon import TelegramClient, sync
from telethon.tl.types import InputMessagesFilterPhotos, InputMessagesFilterVideo
import time

api_id = 25509051
api_hash = '4b1ecf7d0afe3651e1b689970af58e08'
client = TelegramClient('session_name', api_id, api_hash)

async def main():
    channel = await client.get_entity('t.me/PARCUSCARGO')
    messages = client.iter_messages(channel)
    async for message in messages:
        '''print(message.id, message.text)'''
        if message.photo and message.text:
            await client.send_message('https://t.me/+FIN1CuU5lBNjMzUy', file=message.photo, message=message.text)
            time.sleep(5 * 60)
            '''await message.download_media()'''
            

with client:
    client.loop.run_until_complete(main())
