package q1.team4;

public class Artwork {
    private int id;
    private String title;
    private String artist;
    private Genre genre;

    public Artwork(int id, String title, String artist, Genre genre) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.genre = genre;
    }

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getArtist() {
        return artist;
    }

    public Genre getGenre() {
        return genre;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Artwork)) return false;
        Artwork other = (Artwork) obj;
        return id == other.id;
    }

    @Override
    public int hashCode() {
        return id;
    }

    @Override
    public String toString() {
        return title + " by " + artist + " (" + genre + ")";
    }
}
