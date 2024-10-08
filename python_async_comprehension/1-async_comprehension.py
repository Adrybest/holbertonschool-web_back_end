#!/usr/bin/env python3
"""The coroutine will collect 10 random numbers using an async
comprehensing over async_generator, then return the 10 random numbers"""


async_gen = __import__('0-async_generator').async_generator


async def async_comprehension():
    """The coroutine will collect 10 random numbers"""
    return [i async for i in async_gen()]
