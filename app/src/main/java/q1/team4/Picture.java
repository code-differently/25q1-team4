package q1.team4;

import java.util.ArrayList;
import java.util.List;

public class Picture {
    private final String ID;
    private final String TITLE;
    private final String[] TAGS;
    private final List<String> BOARD_IDS;

    public Picture(String ID, String TITLE, String[] TAGS) {
        this.ID = ID;
        this.TITLE = TITLE;
        this.TAGS = TAGS;
        this.BOARD_IDS = new ArrayList<>();
    }

    public void addToBoard(String boardId) {
        if (!BOARD_IDS.contains(boardId)) {
            BOARD_IDS.add(boardId);
        }
    }

    public void removeFromBoard(String boardId) {
        BOARD_IDS.remove(boardId);
    }

    public String getId() {
        return this.ID;
    }

    public String getTitle() {
        return this.TITLE;
    }

    public String[] getTags() {
        return this.TAGS.clone();
    }
}
