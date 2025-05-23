// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"

// Mock the cn utility function
jest.mock("./lib/utils", () => ({
  cn: (...args) => args.filter(Boolean).join(" "),
}))

// Mock the format function from date-fns
jest.mock("date-fns", () => ({
  format: jest.fn((date, formatStr) => {
    if (formatStr === "MMMM d, yyyy") {
      return "January 1, 2023"
    }
    return formatStr
  }),
}))

// Mock the lucide-react icons
jest.mock("lucide-react", () => ({
  Leaf: () => <span data-testid="leaf-icon" />,
  MapPin: () => <span data-testid="map-pin-icon" />,
  CalendarIcon: () => <span data-testid="calendar-icon" />,
  Upload: () => <span data-testid="upload-icon" />,
  Plus: () => <span data-testid="plus-icon" />,
}))
