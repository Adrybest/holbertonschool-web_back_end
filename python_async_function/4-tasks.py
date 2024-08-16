#!/usr/bin/env python3
"""Take the code from wait_n and alter it into a new function task_wait_n.
The code is nearly identical to wait_n
except task_wait_random is being called"""


import asyncio
from typing import List
task_wait = __import__('3-tasks').task_wait_random


async def task_wait_n(n: int, max_delay: int) -> List[float]:
    """Executes task_wait_random n times with max_delay and
    returns a list of waiting times."""
    tasks = [task_wait(max_delay) for _ in range(n)]
    delays = await asyncio.gather(*tasks)
    return sorted(delays)
