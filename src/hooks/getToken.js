import React, { useEffect } from "react";
import axios from "axios";
import qs from "qs";

function Callback({ history, location }) {

  useEffect(() => {
    async function getToken() {
      const { token } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });

      try {
        const { access_token } = await axios.post(`http://localhost:3000`, {
          token,
        });
        localStorage.setItem("access_token", access_token);
        history.push("url");
      } catch (error) {
        history.push("error_url");
      }
    }
    getToken();
  }, [location, history]);
  return null; 
}

export default Callback;