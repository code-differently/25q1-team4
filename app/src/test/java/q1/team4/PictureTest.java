package q1.team4;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import q1.team4.exceptions.DuplicateTagException;
import q1.team4.exceptions.TagNotFoundException;

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

    @Test
    public void testTagNotFoundException() {
        Exception exception = assertThrows(TagNotFoundException.class, () -> {
            picture1.removeTag("void");
        });

        assertEquals("Tag: void does not exist", exception.getMessage());
    }

    @Test
    public void testDuplicateTagException() {
        Exception exception = assertThrows(DuplicateTagException.class, () -> {
            picture1.addTag("anime");
        });

        assertEquals("Tag: anime already exists", exception.getMessage());
    }
}
