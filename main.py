import discord
from discord.ext import commands
import configparser
# -------------------------------------------------------------------------------------------
# 봇 객체 생성
intents = discord.Intents.default()
intents.message_content = True  # 메시지 내용 읽기 권한
bot = commands.Bot(command_prefix="!", intents=intents)
# -------------------------------------------------------------------------------------------
config = configparser.ConfigParser()
config.read('config.ini')
# ===========================================================================================

# 봇이 준비되었을 때
@bot.event
async def on_ready():
    print(f"{bot.user} has connected to Discord!")

# -------------------------------------------------------------------------------------------
@bot.command(name='hi')
async def hello(ctx):
    await ctx.send('Hello world!')

# ===========================================================================================
bot.run(config['MuteMe']['token'])
