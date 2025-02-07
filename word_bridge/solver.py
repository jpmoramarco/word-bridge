# Copyright (c) 2025 Joseph Moramarco
# Licensed under the MIT License.
# See the LICENSE file in the project root for more details.

from collections import deque

import nltk  # type: ignore
from nltk.corpus import words  # type: ignore

nltk.data.path.append("data/")

word_set = {word.lower() for word in words.words() if len(word) == 5}


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


def word_bridge(start, end):
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
