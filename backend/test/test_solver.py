# Copyright (c) 2025 Joseph Moramarco
# Licensed under the MIT License.
# See the LICENSE file in the project root for more details.

from word_bridge.solver import find_shortest_path, generate_neighbors


def test_generate_neighbors():
    assert "stoke" in generate_neighbors("stone")  # Valid one-letter change
    assert "stone" not in generate_neighbors("stone")  # Should not include itself
    assert "scone" in generate_neighbors("stone")  # Another valid neighbor
    assert "apple" not in generate_neighbors(
        "stone"
    )  # Random word should not be in neighbors


def test_word_bridge():
    # Test valid transformations
    assert find_shortest_path("stone", "store") == ["stone", "store"]
    assert find_shortest_path("stone", "storm") == ["stone", "store", "storm"]

    # Test when no path exists
    assert find_shortest_path("stone", "zzzzz") is None

    # Test when start and end are the same
    assert find_shortest_path("stone", "stone") == ["stone"]
