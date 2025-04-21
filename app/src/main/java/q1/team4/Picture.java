package q1.team4;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import q1.team4.exceptions.DuplicateTagException;
import q1.team4.exceptions.TagNotFoundException;

public class Picture {
    private final String ID;
    private String title;
    private final String DATE_ADDED;
    private List<String> tags;

    /**
     * Creates a new Picture
     * 
     * @param ID Unique identifier for the picture.
     * @param TITLE Title of the Picture.
     * @param DATE_ADDED Date when the Picture was added.
     * @param TAGS Array of Strings that are tags for the Picture.
     */
    public Picture(String title, String DATE_ADDED, List<String> tags) {
        this.ID = UUID.randomUUID().toString();
        this.title = title;
        this.DATE_ADDED = DATE_ADDED;
        this.tags = tags;
    }

    /**
     * Adds a new tag to the Picture.
     */
    public void addTag(String tag) {
        if (!tags.contains(tag)) {
            tags.add(tag);
        } else {
            throw new DuplicateTagException("Tag: " + tag + " already exists");
        }
    }

    /**
     * Removes tag from the Picture.
     */
    public void removeTag(String tag) {
        if (!tags.contains(tag)) {
            throw new TagNotFoundException("Tag: " + tag + " does not exist");
        }
        tags.remove(tag);
    }

    /**
     * Gets unique id of this Picture.
     * @return The Picture's ID
     */
    public String getId() {
        return this.ID;
    }

    /**
     * Gets the Title of this Picture.
     * 
     * @return The Picture's Title
     */
    public String getTitle() {
        return this.title;
    }

    /**
     * Gets the date when this Picture was added
     * 
     * @return The date the Picture was added
     */
    public String getDateAdded() {
        return this.DATE_ADDED;
    }

    /**
     * Gets the tags from this Picture
     * 
     * @return A copy of the Array of the Picture's tags
     */
    public List<String> getTags() {
        return new ArrayList<>(tags);
    }

    /**
     * Sets the Pictures new Title.
     * 
     * @param String representing new Title.
     */
    public void setTitle(String title) {
        this.title = title;
    }
}