import discord
from discord.ext import commands
import configparser
import json
import random
from datetime import timedelta
import asyncio
# -------------------------------------------------------------------------------------------
# 봇 객체 생성
intents = discord.Intents.default()
intents.message_content = True  # 메시지 내용 읽기 권한
bot = commands.Bot(command_prefix="!", intents=intents)
# -------------------------------------------------------------------------------------------
config = configparser.ConfigParser()
config.read('config.ini')
# --------------------------
with open('wordbook.json', 'r', encoding='utf-8') as file:
    wordbook = json.load(file)
# ===========================================================================================

# 봇이 준비되었을 때
@bot.event
async def on_ready():
    print(f"{bot.user} has connected to Discord!")

# [echo, hi] -------------------------------------------------------------------------------------------
@bot.command()
async def echo(ctx, *, message: str):
    await ctx.send(message)
# --------------------------
@bot.command(name='hi')
async def hello(ctx):
    await ctx.send('Hello world!')

# [timeout_self] -------------------------------------------------------------------------------------------
@bot.command(name='mm')
async def timeout_self(ctx,*,mins:str= '5'):
    '''셀프채금 !mm [채금 시간(분)]'''
    try:
        duration,timeout_reason,timeout_start,timeout_exit = _get_timeout_info(ctx.author.name, mins)
        await ctx.author.timeout_for(duration, reason=timeout_reason)
        await ctx.send(timeout_start)
        await _delayed_echo(ctx, duration,timeout_exit)
    except ValueError:
        error_str = "올바른 입력이 아닙니다. 자 따라하세요 `!mm 2`"
        await ctx.send(error_str)
        return
    except discord.Forbidden:
        error_str = "관리자에게는 타임아웃을 적용할 수 없습니다." \
            if ctx.author.guild_permissions.administrator \
                else "권한이 부족하여 이 멤버를 타임아웃할 수 없습니다."
        await ctx.send(error_str)
    except discord.HTTPException as e:
        error_str = f"HTTP 오류 발생: {e}"
        await ctx.send(error_str)
# --------------------------
def _get_timeout_info(name:str,mins:str):
    '''타임아웃 관련 시간, 출력 반환'''
    duration = timedelta(minutes=int(mins))
    timeout_reason = random.choice(wordbook['script']['timeout']['reason'])
    timeout_start  = f'{random.choice(wordbook['script']['timeout']['start'])}, {name}\n사유: {timeout_reason} ({duration})'
    timeout_exit   = f'{random.choice(wordbook['script']['timeout']['exit'])} - {name} ({duration})'
    return [duration,timeout_reason,timeout_start,timeout_exit]
# --------------------------
async def _delayed_echo(ctx, duration:timedelta, echo_str:str):
    '''duration 이후 echo_str 말하기'''
    await asyncio.sleep(duration.total_seconds())
    await ctx.send(echo_str)

# ===========================================================================================
bot.run(config['MuteMe']['token'])
