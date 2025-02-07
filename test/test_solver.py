from word_bridge.solver import generate_neighbors, word_bridge


def test_generate_neighbors():
    assert "stoke" in generate_neighbors("stone")  # Valid one-letter change
    assert "stone" not in generate_neighbors("stone")  # Should not include itself
    assert "scone" in generate_neighbors("stone")  # Another valid neighbor
    assert "apple" not in generate_neighbors(
        "stone"
    )  # Random word should not be in neighbors


def test_word_bridge():
    # Test valid transformations
    assert word_bridge("stone", "store") == ["stone", "store"]
    assert word_bridge("stone", "storm") == ["stone", "store", "storm"]

    # Test when no path exists
    assert word_bridge("stone", "zzzzz") is None

    # Test when start and end are the same
    assert word_bridge("stone", "stone") == ["stone"]
