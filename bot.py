import discord
from discord.ext import commands
import datetime
import asyncio
import os
from aiohttp import web

intents = discord.Intents.default()
intents.messages = True
intents.message_content = True

bot = commands.Bot(command_prefix='.', intents=intents)
START_TIME = datetime.datetime.now(datetime.timezone.utc)
BOT_STATUS = os.getenv("BOT_STATUS", "online").strip().lower()


def get_uptime_seconds() -> int:
    delta = datetime.datetime.now(datetime.timezone.utc) - START_TIME
    return int(delta.total_seconds())


def get_status() -> str:
    return BOT_STATUS


async def status_handler(request: web.Request) -> web.Response:
    return web.json_response(
        {
            "status": get_status(),
            "uptime_seconds": get_uptime_seconds(),
            "server_count": len(bot.guilds),
            "member_count": sum(guild.member_count or 0 for guild in bot.guilds),
        },
        headers={"Access-Control-Allow-Origin": "*"},
    )


async def start_status_server():
    app = web.Application()
    app.router.add_get("/status", status_handler)

    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(
        runner,
        host=os.getenv("STATUS_HOST", "0.0.0.0"),
        port=int(os.getenv("STATUS_PORT", "3001")),
    )
    await site.start()


@bot.command(name="setstatus")
@commands.check(lambda ctx: ctx.author.id == 849652633261834241)
async def setstatus(ctx, status: str):
    global BOT_STATUS
    normalized = status.strip().lower()
    if normalized not in {"online", "offline", "maintenance"}:
        await ctx.send("Invalid status. Use: online | offline | maintenance")
        return
    BOT_STATUS = normalized
    await ctx.send(f"Status set to {BOT_STATUS}.")

@bot.event
async def on_ready():
    print(f'Logged in as {bot.user.name}')
    bot.loop.create_task(start_status_server())

@bot.command()
async def start(ctx, time_str: str):
    try:
        target_time = datetime.datetime.strptime(time_str, '%H:%M:%S')
        current_time = datetime.datetime.now()

        time_difference = target_time - current_time
        if time_difference.total_seconds() <= 0:
            await ctx.send("Please provide a future time.")
            return

        embed = discord.Embed(title="Countdown", color=0x00ff00)
        embed.add_field(name="Presents In:", value=str(time_difference), inline=False)
        message = await ctx.send(embed=embed)

        async def update_countdown():
            while time_difference.total_seconds() > 0:
                time_difference = target_time - datetime.datetime.now()
                embed.set_field_at(0, name="Presents In:", value=str(time_difference), inline=False)
                await message.edit(embed=embed)
                await asyncio.sleep(1)

        bot.loop.create_task(update_countdown())

    except ValueError:
        await ctx.send("Invalid time format. Please use HH:MM:SS.")

token = os.getenv("DISCORD_BOT_TOKEN", "").strip()
if not token:
    raise RuntimeError("DISCORD_BOT_TOKEN is not set.")
bot.run(token)
