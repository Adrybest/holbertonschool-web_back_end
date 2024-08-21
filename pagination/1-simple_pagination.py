#!/usr/bin/env python3
"""Write a function named index_range that takes
two integer arguments page and page_size"""
import csv
import math
from typing import List


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


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """Use assert to verify that both arguments are integers greater than 0
        Use index_range to find the correct indexes
        to paginate the dataset correctly
        and return the appropriate page of the dataset
        (i.e. the correct list of rows).
        If the input arguments are out of range for
        the dataset, an empty list should be returned."""
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0
        start_index, end_index = index_range(page, page_size)
        dataset = self.dataset()
        if start_index >= len(dataset):
            return []
        return dataset[start_index:end_index]
