package q1.team4;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
public class Profile {
    private final String id;
    private final String userName;
    private final List<Board> boards;
    private final Boolean isActive;
    /**
     * Creates a new  duser porfile.
     * @param userName
     */
    public Profile(String userName) {
        this.id = UUID.randomUUID().toString();
        this.userName = userName;
        this.boards = new ArrayList<>();
        this.isActive = true;
    }
    /**
     * Gets Profile id.
     * 
     * @return The Profile ID
     */
    public String getId() {
        return this.id;
    }
    /**
     * Gets Profile userName.
     * 
     * @return The Profile userName
     */
    public String getUserName() {
        return this.userName;
    }
    
    public Boolean getIsActive() {
        return isActive;
    }
}