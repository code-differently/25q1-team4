package q1.team4;

// Removed unused static import

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

    Board(String boardName, String boardDescription, String boardId, ArrayList<Object> arrayList, String uploadDate, String editDate) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    void setBoardDescription(String description) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    public enum PrivacyLevel {
        PUBLIC,
        PRIVACY,
    }

    public Board() {
        this.boardUploadDate = boardUploadDate;
        this.boardEditDate = boardEditDate;
        this.boardName = boardName;
        this.boardTagList = boardTagList;
        this.boardDescription = boardDescription;
        this.boardId = UUID.randomUUID().toString();
        

    }

    // Getter and Setter //

    public String getBoardUploadDate() {
        return boardUploadDate;
    }
    public void setBoardUploadDate(String boardUploadDate) {
        this.boardUploadDate = boardUploadDate;
    }

    public String getBoardEditDate() { 
        return boardEditDate;
    }

    public void setBoardEditDate( String boardEditDate) {
        this.boardEditDate = boardEditDate;
    }

    public String getBoardName() {
        return boardName;
    }

    public void setBoardName() {
        this.boardName = boardName;
    }

    public ArrayList<String> getBoardTagList() {
        return boardTagList;
    }
    public String getBoardDescription() {
        return boardDescription;
    }

    public String getBoardId(String boardId) {
        return boardId;
    }

// Removed invalid test method from the main class

    public void setPrivacyLevel(PrivacyLevel privacyLevel) {
        this.privacyLevel = privacyLevel;
    }

   

   
    //End of Code//
}