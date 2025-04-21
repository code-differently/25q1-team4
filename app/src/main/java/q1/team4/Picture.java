package q1.team4;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Picture {
    private final String ID;
    private final String TITLE;
    private final String DATE_ADDED;
    private final String[] TAGS;
    private final List<String> BOARD_IDS;

    /**
     * Creates a new Picture
     * 
     * @param ID Unique identifier for the picture.
     * @param TITLE Title of the Picture.
     * @param DATE_ADDED Date when the Picture was added.
     * @param TAGS Array of Strings that are tags for the Picture.
     */
    public Picture(String ID, String TITLE, String DATE_ADDED, String[] TAGS) {
        this.ID = UUID.randomUUID().toString();
        this.TITLE = TITLE;
        this.DATE_ADDED = DATE_ADDED;
        this.TAGS = TAGS;
        this.BOARD_IDS = new ArrayList<>();
    }

    /**
     * Adds this Picture tot he board.
     * 
     * If the Picture is already on the board do nothing.
     * @param boardId
     */
    public void addToBoard(String boardId) {
        if (!BOARD_IDS.contains(boardId)) {
            BOARD_IDS.add(boardId);
        }
    }

    /**
     * Removes Picture from the board
     * 
     * If the Picture isn't on the Board do nothing.
     */
    public void removeFromBoard(String boardId) {
        BOARD_IDS.remove(boardId);
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
        return this.TITLE;
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
    public String[] getTags() {
        return this.TAGS.clone();
    }
}
