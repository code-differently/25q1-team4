package q1.team4;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class ProfileTest {
    private Profile profile1;

    @BeforeEach
    public void setUp() {
        profile1 = new Profile("testUser1");
    }

    @Test
    public void testGetUserName() {
        assertEquals("testUser1", profile1.getUserName());
    }
}
