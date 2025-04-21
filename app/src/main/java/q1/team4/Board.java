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


    public enum PrivacyLevel {
        PUBLIC,
        PRIVATE,
    }

    public Board(String boardName, String boardDescription, String boardId, ArrayList<String> boardTagList, String boardUploadDate, String boardEditDate) {
        this.boardName = boardName;
        this.boardDescription = boardDescription;
        this.boardId = boardId;
        this.boardTagList = boardTagList;
        this.boardUploadDate = boardUploadDate;
        this.boardEditDate = boardEditDate;
    }
    public Board() {
        this.boardTagList = new ArrayList<>();
        this.boardId = UUID.randomUUID().toString();
    }
    public void setBoardDescription(String desc) {
        this.boardDescription = desc;
    }
    

    // Getter and Setter //

    public String getBoardUploadDate() {
        return boardUploadDate;
    }
    

    public String getBoardEditDate() { 
        return boardEditDate;
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

    public String getBoardId() {
        return boardId;
    }

// Removed invalid test method from the main class

    public void setPrivacyLevel(PrivacyLevel privacyLevel) {
        this.privacyLevel = privacyLevel;
    }

   

   
    //End of Code//
}