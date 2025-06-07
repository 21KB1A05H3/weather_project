# 🌤️ Weather Info Server — Assignment

## Objective
Build a Node.js server with sql orm that fetches and stores weather data for cities using the https://openweathermap.org/.

---

## 🛠️ Requirements

1. **Create an API endpoint**
   - `GET request
   - It should take city name

2. **Use the OpenWeatherMap API**
   - When a city is requested for the **first time**, fetch weather data from the OpenWeatherMap API.
   - Store the response in a **SQL database** (PostgresSql).

3. **Use Cached Results**
   - For **subsequent requests** of the same city, **do not call the API again**.
   - Instead, **retrieve the data from your database** and return it.

4. **Create a separate branch** for your solution
   - Name it using this format: `yourname-solution`
   - Submit a **pull request** to this repository with your branch.

---

## 📝 advance

- Add a `/weather/all` route to list all cached city weather results.
- Add basic error handling and input validation.

---

