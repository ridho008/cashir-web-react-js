import axios from "axios";

export default axios.create({
  baseURL: "https://kedai-taylor-landing-page.vercel.app/db.json",
});
