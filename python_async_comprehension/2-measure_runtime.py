#!/usr/bin/env python3
"""Import async_comprehension from the previous file and write a
measure_runtime coroutinethat will execute async_comprehension four
times in parallel using asyncio.gather.
measure_runtime should measure the total runtime and return it."""

import asyncio
import time
async_com = __import__('1-async_comprehension').async_comprehension


async def measure_runtime():
    """Notice that the total runtime is roughly 10 seconds"""
    start_time = time.perf_counter()
    await asyncio.gather(*(async_com() for a in range(4)))
    end_time = time.perf_counter()
    return end_time - start_time
