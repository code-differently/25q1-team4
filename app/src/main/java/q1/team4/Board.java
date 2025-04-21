package q1.team4;

import java.util.ArrayList;
import java.util.UUID;

public class Board {
    private String boardUploadDate;
    private String boardEditDate;
    private String boardName;
    private ArrayList<String> boardTagList;
    private String boardDescription;
    private String boardId;
    private PrivacyLevel privacyLevel;

    public enum PrivacyLevel {
        PUBLIC,
        PRIVACY,
    }

    public Board() {
        this.boardId = UUID.randomUUID().toString();
        this.boardTagList = new ArrayList<>();
    }

    public Board(String boardName, String boardDescription, String boardId, ArrayList<String> tagList, String uploadDate, String editDate) {
        this.boardName = boardName;
        this.boardDescription = boardDescription;
        this.boardId = boardId;
        this.boardTagList = tagList;
        this.boardUploadDate = uploadDate;
        this.boardEditDate = editDate;
    }

    public String getBoardUploadDate() {
        return boardUploadDate;
    }

    public void setBoardUploadDate(String boardUploadDate) {
        this.boardUploadDate = boardUploadDate;
    }

    public String getBoardEditDate() {
        return boardEditDate;
    }

    public void setBoardEditDate(String boardEditDate) {
        this.boardEditDate = boardEditDate;
    }

    public String getBoardName() {
        return boardName;
    }

    public void setBoardName(String boardName) {
        this.boardName = boardName;
    }

    public ArrayList<String> getBoardTagList() {
        return boardTagList;
    }

    public String getBoardDescription() {
        return boardDescription;
    }

    public void setBoardDescription(String boardDescription) {
        this.boardDescription = boardDescription;
    }

    public String getBoardId() {
        return boardId;
    }

    public void setPrivacyLevel(PrivacyLevel privacyLevel) {
        this.privacyLevel = privacyLevel;
    }

    public PrivacyLevel getPrivacyLevel() {
        return this.privacyLevel;
    }
}
