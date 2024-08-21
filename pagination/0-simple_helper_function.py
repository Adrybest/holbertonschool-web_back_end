#!/usr/bin/env python3
"""Write a function named index_range that takes
two integer arguments page and page_size"""


def index_range(page: int, page_size: int) -> tuple:
    """ The function should return a tuple of size two containing a start index
    and an end index corresponding to the range of indexes to return in a list
    for those particular pagination parameters.

    :param page: The page number (1-indexed)
    :param page_size: The number of items per page
    :return: A tuple of (start_index, end_index) """
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return (start_index, end_index)
