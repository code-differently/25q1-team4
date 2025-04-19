package q1.team4;

import java.util.ArrayList;

public class Boards {
    private final String boardUploadDate;
    private final String boardEditDate;
    private final String boardName;
    private final ArrayList<String> boardTagList;
    private final String boardDescription;
    private final String boardDeletionString;

    public Boards(String boardUploadDate, String boardEditDate, String boardName,
                  ArrayList<String> boardTagList, String boardDescription,
                  String boardDeletionString) {
        this.boardUploadDate = boardUploadDate;
        this.boardEditDate = boardEditDate;
        this.boardName = boardName;
        this.boardTagList = boardTagList;
        this.boardDescription = boardDescription;
        this.boardDeletionString = boardDeletionString;
    }


    public static void main(String[] args) {
        System.out.println("Boards class main method executed.");
    }

    public String getBoardUploadDate() {
        return boardUploadDate;
    }
    public String getBoardEditDate() {
        return boardEditDate;
    }
    public String getBoardName() {
        return boardName;
    }
    public ArrayList<String> getBoardTagList() {
        return boardTagList;
    }
    public String getBoardDescription() {
        return boardDescription;
    }
    public String getBoardDeletionString() {
        return boardDeletionString;
    }
    public String setBoardDeletionString(String boardDeletionString) {
        return this.boardDeletionString;
    }
    //End of Code//
}