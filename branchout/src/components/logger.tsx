import { useState, ChangeEvent, FormEvent } from "react";

export default function TreeLoggingForm() {
  const [treeType, setTreeType] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(`Planted a ${treeType} at ${location} on ${date}`);
  };

  const treeTypes = ["Oak", "Pine", "Cedar", "Maple", "Birch", "Spruce", "Redwood", "Willow", "Ash", "Elm"];
  const locations = ["Riverfront", "Brandywine Park", "City Center", "Mountain View", "Lakeside", "Forest Edge"];

  return (
    <div style={{
      padding: "2rem",
      maxWidth: "500px",
      margin: "2rem auto",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#f9f9f9",
      fontFamily: "sans-serif"
    }}>
      <h1 style={{
        fontSize: "1.8rem",
        fontWeight: "bold",
        marginBottom: "1.5rem",
        color: "#2e7d32",
        textAlign: "center"
      }}>
        🌱 Log Your Tree Planting
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Tree Type */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label htmlFor="treeType" style={{ fontWeight: "bold" }}>Tree Type</label>
          <select
            id="treeType"
            value={treeType}
            onChange={(e) => setTreeType(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.6rem",
              marginTop: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          >
            <option value="">Select tree type</option>
            {treeTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label htmlFor="location" style={{ fontWeight: "bold" }}>Location</label>
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.6rem",
              marginTop: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          >
            <option value="">Select location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label htmlFor="date" style={{ fontWeight: "bold" }}>Planting Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.6rem",
              marginTop: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        {/* Image Upload */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label htmlFor="image" style={{ fontWeight: "bold" }}>Upload Tree Image</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginTop: "0.5rem" }}
          />
          {image && (
            <div style={{ marginTop: "1rem", textAlign: "center" }}>
              <img
                src={image}
                alt="Uploaded Tree"
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                  borderRadius: "8px"
                }}
              />
              <button
                type="button"
                onClick={() => setImage(null)}
                style={{
                  marginTop: "0.5rem",
                  padding: "0.4rem 1rem",
                  backgroundColor: "#ccc",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Remove Image
              </button>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#43a047",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer"
          }}
        >
          🌳 Plant Tree
        </button>
      </form>
    </div>
  );
}
