package q1.team4;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Profile {
    private final String id;
    private final String userName;
    private final List<String> boardIds;
    /**
     * Creates a new  duser porfile.
     * @param userName
     */
    public Profile(String userName) {
        this.id = UUID.randomUUID().toString();
        this.userName = userName;
        this.boardIds = new ArrayList<>();
    }

    /**
     * Gets Profile id.
     */
    public String getId() {
        return this.id;
    }

    /**
     * Gets Profile userName.
     */
    public String getUserName() {
        return this.userName;
    }

    /**
     * Gets all of the Profiles boardIds.
     */
    public List<String> getBoardIds() {
        return new ArrayList<>(boardIds);
    }
}
