package q1.team4;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class PictureTest {
    private Picture picture1;
    private String title = "Test Picture";
    private final String PICTURE_DATE_ADDED = "2025-01-01";
    private List<String> tags = new ArrayList<String>();

    @BeforeEach
    public void setUp() {
        picture1 = new Picture(title, PICTURE_DATE_ADDED, tags);
        tags.add("traditional");
        tags.add("digital");
        tags.add("anime");
    }

    @Test
    public void testAddTag() {
        picture1.addTag("illustration");

        List<String> updatedTags = picture1.getTags();
        assertTrue(updatedTags.contains("illustration"));
        assertEquals(4, updatedTags.size());
    }

    @Test
    public void testRemoveTag() {
        picture1.removeTag("anime");

        List<String> updatedTags = picture1.getTags();
        assertFalse(updatedTags.contains("anime"));
        assertEquals(2, updatedTags.size());
    }

    @Test
    public void testGetTitle() {
        assertEquals(title, picture1.getTitle());
    }

    @Test
    public void testSetTitle() {
        String newTitle = "Updated Title";
        picture1.setTitle(newTitle);
        assertEquals(newTitle, picture1.getTitle());
    }

    @Test
    public void testGetTags() {
        assertEquals(tags, picture1.getTags());
    }
}
