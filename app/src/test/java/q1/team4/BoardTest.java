package q1.team4;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

public class BoardTest {

    @Test
    public void testGetBoardUploadDate() {
        ArrayList<String> tags = new ArrayList<>();
        Board board = new Board("BoardName", "BoardDescription", "BoardId", tags, "2025-04-21", "EditDate");
        assertEquals("2025-04-21", board.getBoardUploadDate());
    }

    @Test 
    public void testGetBoardEditDate() {
        ArrayList<String> tags = new ArrayList<>();
        Board board = new Board("BoardName", "BoardDescription", "BoardId", tags, "UploadDate", "2025-04-21");
        assertEquals("2025-04-21", board.getBoardEditDate());
    }

    @Test
    public void testSetAndGetBoardName() {
        Board board = new Board();
        board.setBoardName("FrontEndBoard");
        assertEquals("FrontEndBoard", board.getBoardName());
    }

    @Test
    public void testSetAndGetBoardDescription() {
        Board board = new Board();
        board.setBoardDescription("Description");
        assertEquals("Description", board.getBoardDescription());
    }

    @Test 
    public void testGetBoardId() {
        ArrayList<String> tags = new ArrayList<>();
        Board board = new Board("BoardName", "BoardDescription", "42", tags, "UploadDate", "EditDate");
        assertEquals("42", board.getBoardId());
    }

    @Test
    public void testGetBoardTagList() {
        Board board = new Board();
        assertEquals(new ArrayList<>(), board.getBoardTagList());
    }

    @Test
    public void testSetAndGetPrivacyLevel() {
        Board board = new Board();
        board.setPrivacyLevel(Board.PrivacyLevel.PRIVACY);
        assertEquals(Board.PrivacyLevel.PRIVACY, board.getPrivacyLevel());
    }
}