package q1.team4;

import java.util.List;
import java.util.ArrayList;

public class ArtGalleryViewer {
    private List<Artwork> artworks;
    private List<Artwork> favorites;

    public ArtGalleryViewer() {
        artworks = new ArrayList<>();
        favorites = new ArrayList<>();

        // Sample artworks for demo
        artworks.add(new Artwork(1, "Starry Night", "Vincent van Gogh", Genre.IMPRESSIONISM));
        artworks.add(new Artwork(2, "Mona Lisa", "Leonardo da Vinci", Genre.RENAISSANCE));
        artworks.add(new Artwork(3, "The Persistence of Memory", "Salvador Dalí", Genre.SURREALISM));
    }

    public List<Artwork> browseAll() {
        return artworks;
    }

    public List<Artwork> searchByTitle(String title) {
        List<Artwork> result = new ArrayList<>();
        for (Artwork artwork : artworks) {
            if (artwork.getTitle().toLowerCase().contains(title.toLowerCase())) {
                result.add(artwork);
            }
        }
        return result;
    }

    public List<Artwork> searchByArtist(String artistName) {
        List<Artwork> result = new ArrayList<>();
        for (Artwork artwork : artworks) {
            if (artwork.getArtist().toLowerCase().contains(artistName.toLowerCase())) {
                result.add(artwork);
            }
        }
        return result;
    }

    public List<Artwork> filterByGenre(Genre genre) {
        List<Artwork> result = new ArrayList<>();
        for (Artwork artwork : artworks) {
            if (artwork.getGenre() == genre) {
                result.add(artwork);
            }
        }
        return result;
    }

    public Artwork viewArtworkById(int id) {
        for (Artwork artwork : artworks) {
            if (artwork.getId() == id) {
                return artwork;
            }
        }
        return null;
    }

    public void addToFavorites(Artwork artwork) {
        if (!favorites.contains(artwork)) {
            favorites.add(artwork);
        }
    }

    public void removeFromFavorites(Artwork artwork) {
        favorites.remove(artwork);
    }

    public List<Artwork> getFavorites() {
        return favorites;
    }
}



