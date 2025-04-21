package q1.team4;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

public class BoardTest {
    @Test
    public void getBoardUploadDate() {
        Board board = new Board("BoardName", "BoardDescription", "BoardId", new ArrayList<>(), "UploadDate", "EditDate");
        board.setBoardUploadDate("2025-04-21");

        String result = board.getBoardUploadDate();
        assertEquals("2025-04-21", result);
    }

    @Test 
    public void getBoardEditDate() {
        Board board = new Board("BoardName", "BoardDescription", "BoardId", new ArrayList<>(), "UploadDate", "EditDate");
        board.setBoardEditDate("2025-04-21");
        String result = board.getBoardEditDate();
        assertEquals("2025-04-21", result);
    }

    @Test 
    public void getBoardName() {
        Board board =  new Board();
        board.setBoardEditDate("FrontEndBoard");
        String name = board.getBoardName();

        assertEquals("FrontEndBoard", name);
    }

    @Test 
    public void getBoardDescription() {
        Board board = new Board();
        board.setBoardDescription(
            "Description");
        String result = board.getBoardDescription();
        Object expected = "Description";
        assertEquals(expected, result);
    }

    @Test 
    public void getBoardId() {
        Board board = new Board();
        String result = board.getBoardId("42");
        assertEquals(42, result);
    }

    @Test
    public void getBoardTagList() {
        Board board = new Board();
        ArrayList<String> result = board.getBoardTagList();
        assertEquals(new ArrayList<>(), result);
    }
    
    
    
}