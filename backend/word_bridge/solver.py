# Copyright (c) 2025 Joseph Moramarco
# Licensed under the MIT License.
# See the LICENSE file in the project root for more details.
import random
from collections import deque
from typing import List, Optional

with open("data/all_words.txt") as f:
    word_set = {line.strip().lower() for line in f if len(line.strip()) == 5}


def generate_neighbors(word):
    """Generate valid words that are one letter different from the given word."""
    neighbors = set()
    alphabet = "abcdefghijklmnopqrstuvwxyz"

    for i in range(len(word)):
        for letter in alphabet:
            if letter != word[i]:
                new_word = word[:i] + letter + word[i + 1 :]
                if new_word in word_set:
                    neighbors.add(new_word)
    return neighbors


def find_shortest_path(start, end) -> Optional[List[str]]:
    """Find the shortest path from start word to end word using a word ladder approach."""
    if start not in word_set or end not in word_set:
        return None

    queue = deque([(start, [start])])  # (current_word, path_so_far)
    visited = set()

    while queue:
        current_word, path = queue.popleft()

        if current_word == end:
            return path

        if current_word in visited:
            continue

        visited.add(current_word)

        for neighbor in generate_neighbors(current_word):
            if neighbor not in visited:
                queue.append((neighbor, path + [neighbor]))

    return None  # No path found


def get_random_word_pair():
    """Generate two random words that have a valid word bridge path between them."""
    valid_words = list(word_set)
    random.shuffle(valid_words)

    for start in valid_words:
        for end in valid_words:
            if start != end:
                path = find_shortest_path(start, end)
                if path:
                    return start, end, path
    return None, None, None  # If no valid pair is found
