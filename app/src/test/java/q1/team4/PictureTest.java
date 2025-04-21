package q1.team4;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class PictureTest {
    private Picture picture1;
    private final String PICTURE_ID = "test-picture-id";
    private final String PICTURE_TITLE = "Test Picture";
    private final String PICTURE_DATE_ADDED = "2025-01-01";
    private final String[] PICTURE_TAGS = {"traditional", "digital", "anime"};

    @BeforeEach
    public void setUp() {
        picture1 = new Picture(PICTURE_ID, PICTURE_TITLE, PICTURE_DATE_ADDED, PICTURE_TAGS);
    }

    @Test
    public void testGetTags() {
        assertArrayEquals(PICTURE_TAGS, picture1.getTags());
    }
}
