package q1.team4;

import java.util.ArrayList;
import java.util.List;

public class Picture implements Searchable {
    private final String id;
    private final String filePath;
    private final String title;
    private final String[] tags;
    private final List<String> boardIds;

    public Picture(String id, String filePath, String title, String[] tags) {
        this.id = id;
        this.filePath = filePath;
        this.title = title;
        this.tags = tags;
        this.boardIds = new ArrayList<>();
    }

    public void addToBoard(String boardId) {
        if (!boardIds.contains(boardId)) {
            boardIds.add(boardId);
        }
    }

    public void removeFromBoard(String boardId) {
        boardIds.remove(boardId);
    }

    public String getFilePath() {
        return this.filePath;
    }

    public String getTitle() {
        return this.title;
    }

    public String[] getTags() {
        return this.tags.clone();
    }

    @Override
    public String getId() {
        return this.id;
    }

    @Override
    public String getSearchableContent() {
        StringBuilder content = new StringBuilder();
        content.append(title).append(" ");
        for (String tag : tags) {
            content.append(tag).append(" ");
        }
        return content.toString();
    }
}
