package q1.team4;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;

public class ArtViewerTest {

    @Test
    public void testBrowseAllReturnsArtworks() {
        ArtGalleryViewer viewer = new ArtGalleryViewer();

        List<Artwork> allArtworks = viewer.browseAll();

        // Assert: Default constructor adds 3 artworks
        assertEquals(3, allArtworks.size());
    }

    @Test
    public void testSearchByTitle() {
        ArtGalleryViewer viewer = new ArtGalleryViewer();

        List<Artwork> results = viewer.searchByTitle("Starry");

        assertEquals(1, results.size());
        assertEquals("Starry Night", results.get(0).getTitle());
    }

    @Test
    public void testSearchByArtist() {
        ArtGalleryViewer viewer = new ArtGalleryViewer();

        List<Artwork> results = viewer.searchByArtist("Da Vinci");

        assertEquals(1, results.size());
        assertEquals("Leonardo da Vinci", results.get(0).getArtist());
    }

    @Test
    public void testFilterByGenre() {
        ArtGalleryViewer viewer = new ArtGalleryViewer();

        List<Artwork> surrealArtworks = viewer.filterByGenre(Genre.SURREALISM);

        assertEquals(1, surrealArtworks.size());
        assertEquals("The Persistence of Memory", surrealArtworks.get(0).getTitle());
    }

    @Test
    public void testAddAndRemoveFavorites() {
        ArtGalleryViewer viewer = new ArtGalleryViewer();
        Artwork art = viewer.viewArtworkById(1);

        viewer.addToFavorites(art);
        assertTrue(viewer.getFavorites().contains(art));

        viewer.removeFromFavorites(art);
        assertFalse(viewer.getFavorites().contains(art));
    }

    @Test
    public void testViewArtworkById() {
        ArtGalleryViewer viewer = new ArtGalleryViewer();

        Artwork art = viewer.viewArtworkById(2);
        assertNotNull(art);
        assertEquals("Mona Lisa", art.getTitle());

        Artwork notFound = viewer.viewArtworkById(99);
        assertNull(notFound);
    }

    @Test
    public void testArtworkToString() {
        Artwork art = new Artwork(10, "The Kiss", "Gustav Klimt", Genre.MODERN);

        String expected = "The Kiss by Gustav Klimt (MODERN)";
        assertEquals(expected, art.toString());
    }
}
