# API Integration Requirements

This document outlines the expected API structure for the E-commerce frontend application.

## API Endpoints

### 1. Products Endpoint

**URL:** `GET /api/products`

**Expected Response:**

```json
[
  {
    "id": 1,
    "name": "Product Name",
    "description": "Product description or unit (e.g., '1L', '500g')",
    "price": "20.00",
    "categoryId": 1,
    "isActive": true,
    "image": "https://example.com/image.jpg", // Optional, will use placeholder if not provided
    "category": {
      "id": 1,
      "name": "Category Name"
    },
    "inventory": {
      "id": 1,
      "productId": 1,
      "quantity": 100,
      "reservedQuantity": 0,
      "lowStockAlert": 10
    }
  }
]
```

### 2. Categories Endpoint

**URL:** `GET /api/categories`

**Expected Response:**

```json
[
  {
    "id": 1,
    "name": "Category Name",
    "parentId": null,
    "parent": null,
    "children": [],
    "products": [
      {
        "id": 1,
        "name": "Product Name",
        "description": "Product description",
        "price": "20.00",
        "categoryId": 1,
        "isActive": true
      }
    ]
  }
]
```

### 3. Grains Endpoint (New - Required)

**URL:** `GET /api/grains`

**Expected Response:**

```json
[
  {
    "id": 1,
    "name": "Wheat",
    "description": "High quality wheat grain",
    "price": "42.00",
    "isActive": true,
    "image": "https://example.com/wheat.jpg", // Optional
    "nutrition": {
      "Protein": "13g",
      "Fiber": "12g",
      "Carbs": "71g"
    }
  }
]
```

## Frontend Data Transformation

The frontend automatically transforms the API data to match the expected format:

### Products Transformation

- Filters out inactive products (`isActive: false`)
- Converts price from string to number
- Uses `description` field as unit if available
- Generates placeholder images if not provided
- Maps category name from nested category object

### Grains Transformation

- Filters out inactive grains (`isActive: false`)
- Converts price from string to number
- Applies predefined colors and styling based on grain name
- Uses nutrition data if provided, defaults to empty values
- Generates placeholder images if not provided

### Categories Transformation

- Maps all category data as-is
- Used for advanced filtering and organization

## API Configuration

The API base URL is configured in `/src/services/api.js`:

```javascript
const API_BASE_URL = "http://147.93.153.136/api";
```

## Error Handling

The application includes:

- Fallback data when API is unavailable
- Error boundaries for graceful error handling
- Loading states during data fetching
- Console warnings when API calls fail

## Suggested Backend Changes

To optimize for the frontend, consider adding these fields to your API:

### For Products:

- `unit` field (separate from description)
- `image` URL field
- `featured` boolean for highlighting products

### For Grains:

- `nutrition` object with protein, fiber, carbs values
- `image` URL field
- `color` field for UI theming
- `category` field if grains have categories

### For Categories:

- `icon` field for category icons
- `displayOrder` for custom sorting
- `description` field for category descriptions

## Testing the Integration

1. Ensure your backend API is running at `http://147.93.153.136`
2. The `/api/grains` endpoint needs to be implemented
3. Test with tools like Postman or curl:
   ```bash
   curl http://147.93.153.136/api/products
   curl http://147.93.153.136/api/categories
   curl http://147.93.153.136/api/grains
   ```

## CORS Configuration

Make sure your backend allows CORS requests from your frontend domain.
