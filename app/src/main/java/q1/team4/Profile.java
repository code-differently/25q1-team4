package q1.team4;

import java.util.ArrayList;
import java.util.List;

public class Profile {
    private final String userName;
    private final List<String> boardIds;

    public Profile(String userName) {
        this.userName = userName;
        this.boardIds = new ArrayList<>();
    }
}
